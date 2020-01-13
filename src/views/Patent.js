
import React,{Component} from "react"
import http from "@/http"
import "@/views/Patent.less"
import { Toast, ListView } from 'antd-mobile';

class Patent extends Component{
 constructor(props){
   super(props);
    this.state={
    isLoading:false,
    patentinfo:{},
    articlelist:[],
    loading:true,
    page:1,
    hasMore:true,
    height:document.documentElement.clientHeight,
    dataSource:new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
   }
 }
 handleJump(item){
  this.props.history.push('/detail/'+item.ha_id)
}
onEndReached (){
  if (this.state.isLoading || !this.state.hasMore) {
    return;
  }
  this.setState({ isLoading: true ,page: this.state.page+1});
  this.getData()
}

getData(){
  http.get(`/api/head/head/patentDetail`, {params: {
    hp_id:this.props.match.params.id,
    page: this.state.page
  }}).then((res)=>{
    const _data=res.data;
    if(_data.code===0){
      const arr=[...this.state.articlelist,..._data.data.articlelist||[]];
      if(this.state.page===1){
        this.setState({
          height:this.state.height-this.refs.headBg.clientHeight-10-this.refs.headTil.clientHeight,
          patentinfo:_data.data.patentinfo||{},
          loading:false
        })
        
      }
      this.setState({
        hasMore:_data.data.articlelist.length>0,
        isLoading:false,
        articlelist:arr,
        dataSource: this.state.dataSource.cloneWithRows(arr)
      })
    }else{
      Toast.info(_data.message)
    }
  })
}
 componentDidMount(){
   this.getData();
}
 render(){
   const row=(item,index)=>{
     return (
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
      </li>
     )
   };
   return(<div className="column-wrap" style={ {'visibility':this.state.loading?'hidden':'visible' }}>
   <div className="head" ref="headBg">
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
     <h4 ref="headTil"><span>相关文章</span></h4>
     <ListView
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 0, textAlign: 'center',fontSize:12 }}>
          {this.state.isLoading ? '正在加载...' : this.state.hasMore?'加载完毕...':'-- 已经到底了 --'}
        </div>)}
        renderBodyComponent={() => <ul className="article-list-wrap"></ul>}
        renderRow={row}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        pageSize={10}
        scrollRenderAheadDistance={500}
        onEndReached={()=>this.onEndReached()}
        onEndReachedThreshold={10}
      />
   </div>
 </div>
 )}
}
export default Patent;