import React,{Component} from "react";
import http from "@/http"
import '@/views/Detail.less';
class Detail extends Component{
  constructor(props){
    super(props);
    let _query = {};
    this.props.location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v)=> _query[k] = v);
    this.state={
      _query:_query,
      loading:true,
      renderData:{
          commentList: [],
          commentNum: 0,
          detail: {},
          recommendList: [],
          title: "",
      }
    }
  }
  componentWillReceiveProps(nextProps){
    let key = nextProps.match.params.id;
    this.getDetail(key)
 }
  handleJump(item){
    this.props.history.push('/detail/'+item.ha_id)
  }
  getDetail(id){
    this.setState({
      loading:true
    })
    http.get(`/api/head/head/detail`, {
      params: {
        ha_id: id
      }
      }).then((res)=>{
      const _data=res.data;
      this.setState({
        loading:false
      })
      if(_data.code===0){
        const renderData=_data.data||{};
        if(!renderData.commentList)renderData.commentList=[];
        if(!renderData.detail)renderData.detail={};
        if(!renderData.recommendList)renderData.recommendList=[];
        this.setState({
          renderData:renderData,
       })
      }else{
  
      }
      
    })
  }
  componentDidMount(){
    this.getDetail(this.props.match.params.id)
  }
  render(){
    return (
      <div className="detail-outer-wrap" style={ {'display':this.state.loading?'none':'block' }}>
    <div className="detail-inner-wrap">
      <div className="article-wrap">
        <h2>{this.state.renderData.title}</h2>
        <p className="article-info"><span className="time">{this.state.renderData.detail.time}</span> <span>阅读<i>{this.state.renderData.detail.ha_readNum}</i></span> <span>赞<i>{this.state.renderData.detail.ha_upNum}</i></span></p>
        <div className="content-wrap">
          <div className="content ql-editor" dangerouslySetInnerHTML = {{ __html:this.state.renderData.detail.ha_content }}></div>
        </div>
        <p className="article-info"><span>小编：<i>{this.state.renderData.detail.ha_author}</i></span> <span>文章来源：<i>{this.state.renderData.detail.ha_source}</i></span></p>
      </div>
      <div className="recom-more">
        <h4 className="detail-com-title"><em>相关推荐</em></h4>
        <ul className="article-list-wrap">
          {this.state.renderData.recommendList.map((item,index)=>
             <li className="article-list-item"
             key={index}
             onClick={()=>this.handleJump(item)}>
           <div className="cont">
             <p>{item.ha_title}</p>
             <ul className="tag-btm">
               <div className="nums"><b><em className="tag">{item.ha_tags}</em><em className="read">阅读 {item.ha_readNum}</em></b> <em className="time">{item.time}
                 </em></div>
             </ul>
           </div>
           <div className="pic"><img src={item.ha_image} alt="pic" /></div>
         </li> 
          )}
          
        </ul>
      </div>
    </div>
    <div style={{height:'20px'} }></div>
  </div>
    )
  }
}
export default Detail;