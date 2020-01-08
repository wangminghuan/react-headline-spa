import React, {Component} from 'react';
// import {Link } from 'react-router-dom'
import logo from '@/assets/logo.svg';
import "./Home.less"
import { Button } from 'antd-mobile';
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    handleJump(path){
      this.props.history.push(path)
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
          <Button type="primary" style={ {marginRight:'20px'}} inline onClick={()=>this.handleJump('/patent/4') }>进入专栏页面</Button>
          <Button type="primary" inline onClick={()=>this.handleJump('/subject/2') }>进入专题页面</Button>
          {/* <Link to={`/patent/4`} >进入专栏页面</Link>
          <Link to={`/subject/2`}>进入专题页面</Link> */}
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