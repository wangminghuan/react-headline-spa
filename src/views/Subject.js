
import React,{Component} from "react";
import http from "@/utils/http"
import "@/views/Subject.less";
import { Toast ,ListView} from 'antd-mobile';
class Subject extends Component{
  constructor(props){
    super(props);
    this.state={
      subjectinfo:{},
      isLoading:false,
      patentinfo:{},
      articlelist:[],
      loading:true,
      page:1,
      hasMore:true,
      // height:document.documentElement.clientHeight,
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
    http.get(`/api/head/head/subjectDetail`, {
      params: {
        hs_id: this.props.match.params.id,
        page:this.state.page
      }
      }).then((res)=>{
      const _data=res.data;
      if(_data.code===0){
        const arr=[...this.state.articlelist,..._data.data.articlelist||[]];
        if(this.state.page===1){
          this.setState({
            // height:this.state.height-this.refs.headBg.clientHeight-10-this.refs.headTil.clientHeight,
            subjectinfo:_data.data.subjectinfo||{},
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
    return (<div className="subject-wrap" style={ {'visibility':this.state.loading?'hidden':'visible' } }>
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
      <h4 ><span>相关文章</span></h4>
      <ListView
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 0, textAlign: 'center',fontSize:12 }}>
          {this.state.isLoading ? '正在加载...' : this.state.hasMore?'加载完毕...':'-- 已经到底了 --'}
        </div>)}
        useBodyScroll
        renderBodyComponent={() => <ul className="article-list-wrap"></ul>}
        renderRow={row}
        pageSize={10}
        scrollRenderAheadDistance={500}
        onEndReached={()=>this.onEndReached()}
        onEndReachedThreshold={10}
      />
    </div>
  </div>)
  }
}
export default Subject