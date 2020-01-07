import React, {Component} from 'react';
import {Link } from 'react-router-dom'
import logo from '@/assets/logo.svg';
import "./Home.less"
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render(){
      return (
        <section className="container">
          <div>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="title">
            react-app-project
          </h1>
          <h2 className="subtitle">
            基于react创建的SPA项目
          </h2>
          <div className="links">
          <Link to={`/patent?id=4`} ><button className="mint-button mint-button--primary mint-button--normal"><label className="mint-button-text">进入专栏页面</label></button></Link>
          <Link to={`/subject?id=2`}><button className="mint-button mint-button--primary mint-button--normal"><label className="mint-button-text">进入专题页面</label></button></Link>
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