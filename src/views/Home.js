import React, {Component} from 'react';
import {Link } from 'react-router-dom'
import "./Home.css"
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
          value:"Hello Runoob!",
          num:1
        }
    }
    handleChange(event){
      this.setState({value: event.target.value});
    }
    handleClick(){
      this.setState({num:this.state.num + 1})
    }
    componentWillMount(){
      //在render之前，在这方法里的代码调用setState方法不会触发重渲染

    }
    render(){
      return (
        <section class="container">
          <div>
          <h1 class="title">
            react-app-project
          </h1>
          <h2 class="subtitle">
            基于react创建的SPA项目
          </h2>
          <div class="links">
          <Link to={`/patent?id=3`}><button class="mint-button mint-button--primary mint-button--normal"><label class="mint-button-text">进入专栏页面</label></button></Link>
          <Link to={`/subject?id=2`}><button class="mint-button mint-button--primary mint-button--normal"><label class="mint-button-text">进入专题页面</label></button></Link>
          </div>
          </div>
      </section>
      )
    }
    componentDidMount(){
      console.log("组件已装载，执行ajax")
    }
    componentWillUnmount(){
      console.log("组件已卸载")
    }
  }
export default Home;