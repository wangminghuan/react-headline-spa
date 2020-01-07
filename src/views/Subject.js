
import React,{Component} from "react";
import http from "@/utils/http"
import "@/views/Subject.less";
class Subject extends Component{
  constructor(props){
    super(props);
    let _query = {};
    this.props.location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v)=> _query[k] = v);
    this.state={
      _query:_query,
      subjectinfo:{},
      articlelist:[],
      loading:true
    }
  }
  handleJump(item){
    this.props.history.push('/detail?id='+item.ha_id)
  }
  componentDidMount(){
    console.log("组件已装载，执行ajax")
    http.get(`/api/head/head/subjectDetail`, {
      params: {
        hs_id: this.state._query.id,
        page:1
      }
      }).then((res)=>{
      const _data=res.data;
        this.setState({
          loading:false
        })
      if(_data.code===0){
        this.setState({
          subjectinfo:_data.data.subjectinfo||{},
          articlelist:_data.data.articlelist||[],
       })
      }else{
  
      }
      
    })
  }
  render(){
    return (<div className="subject-wrap" style={ {'display':this.state.loading?'none':'block' }}>
    <div className="head">
      <div className="img-wrap"><img alt="pic"
             src={this.state.subjectinfo.hs_bgurl}
             className="column-bg" /></div>
      <section className="content">
        <h1>{this.state.subjectinfo.hs_name}</h1>
        <p>{this.state.subjectinfo.hs_describe}</p>
      </section>
    </div>
    <div className="art-list">
      <h4><span>相关文章</span></h4>
      <ul className="article-list-wrap">
        {this.state.articlelist.map((item,index)=> <li className="article-list-item"
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
        </li>)}
        
      </ul>
    </div>
  </div>)
  }
}
export default Subject