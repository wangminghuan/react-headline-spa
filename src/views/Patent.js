
import React,{Component} from "react"
import http from "@/utils/http"
import "@/views/Patent.less"
class Patent extends Component{
 constructor(props){
   super(props);
   let _query = {};
    this.props.location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v)=> _query[k] = v);
    this.state={
      _query:_query,
    patentinfo:{},
    articlelist:[]
   }
 }
 handleJump(item){
  this.props.history.push('/detail?id='+item.ha_id)
}
 componentDidMount(){
  http.get(`/api/head/head/patentDetail`, {params: {
    hp_id:this.state._query.id||2,
    page: 1
  }}).then((res)=>{
    const _data=res.data;
    if(_data.code===0){
      this.setState({
        patentinfo:_data.data.patentinfo||{},
        articlelist:_data.data.articlelist||[],
     })
    }else{

    }
    
  })
}
 render(){
   return(<div className="column-wrap">
   <div className="head">
     <div className="head-bg"><img alt="pic"
            src={this.state.patentinfo?this.state.patentinfo.hp_bgurl:''}
            className="column-bg" />
     </div>
     <section className="content-wrap">
       <div className="inner-wrap">
         <div className="avatar"><img alt="pic"
                src={this.state.patentinfo?this.state.patentinfo.hp_headurl:''} /></div>
         <div className="content">
           <h1>{this.state.patentinfo?this.state.patentinfo.hp_name:''}</h1>
           <p>{this.state.patentinfo?this.state.patentinfo.hp_describe:''}</p>
         </div>
       </div>
     </section>
   </div>
   <div className="art-list">
     <h4><span>相关文章</span></h4>
     <ul className="article-list-wrap">
       { this.state.articlelist.map((item,index)=>
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
         <div className="pic"><img src={item.ha_image} alt="img" /></div>
       </li> )}
       
     </ul>
   </div>
 </div>
 )}
}
export default Patent;