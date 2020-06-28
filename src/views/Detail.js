import React,{Component} from "react";
import http from "@/http"
import '@/views/Detail.less';
import loadSVG from '@/assets/loading.svg';
class Detail extends Component{
  constructor(props){
    super(props);
    let _query = {};
    this.props.location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v)=> _query[k] = v);
    this.state={
      _query:_query,
      loading:true,
      renderData:{
          media_user: {},
          commentNum: 0,
          detail: {},
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
  $formatTime(data,type){
    var _data = data;
    //如果是13位正常，如果是10位则需要转化为毫秒
    if (String(data).length == 13) {
      _data = data
    } else {
      _data = data*1000
    }
    const time = new Date(_data);    
    const Y = time.getFullYear();
    const Mon = time.getMonth() + 1;
    const Day = time.getDate();
    const H = time.getHours();
    const Min = time.getMinutes();
    const S = time.getSeconds();
    //自定义选择想要返回的类型
    if(type==="Y"){
      return `${Y}-${Mon}-${Day}`
    }else if(type==="H"){
      return `${H}:${Min}:${S}`
    }else{
      return `${Y}-${Mon}-${Day} ${H}:${Min}:${S}`
    }
  }
  getDetail(id){
    this.setState({
      loading:true
    })
    http.get(`/testapi/i${id}/info/`, {params: {
      _signature:'HLIIRxARQk77xfBBg2LRhxyyCF',
      i:id
    }}).then((res)=>{
      const _data=res.data;
      this.setState({
        loading:false
      })
      if(_data.success){
        const renderData=_data.data||{};
        this.setState({
          renderData:renderData,
       })
      }
    })
  }
  componentDidMount(){
    this.getDetail(this.props.match.params.id)
  }
  render(){
    return  this.state.loading?(<div className="loading-svg"><img src={loadSVG} alt="img" /></div>):(
      <div className="detail-outer-wrap" style={ {'display':this.state.loading?'none':'block' }}>
    <div className="detail-inner-wrap">
      <div className="article-wrap">
        <h2>{this.state.renderData.title}</h2>
        <div className="article-info">
        <div className="left">
         <img style={{width:'20px',marginRight:'10px'}} src={this.state.renderData.media_user.avatar_url} alt="img" /><span>{this.state.renderData.source}</span>
        </div>
        <div className="right"><span>{this.state.renderData.comment_count}评论 </span><em v-if="renderData.publish_time">{this.$formatTime(this.state.renderData.publish_time)}</em></div>
        </div>
        <div className="content-wrap">
          <div className="content ql-editor" dangerouslySetInnerHTML = {{ __html:this.state.renderData.content}}></div>
        </div>
      </div>
    </div>
    <div style={{height:'20px'} }></div>
  </div>
    )
  }
}
export default Detail;