import React, {Component} from 'react';
import "./Error.less"
class Error extends Component {
   constructor(props){
     super(props);
     this.state={};
   }
   render(){
     return (
       <div className="error-wrap">您访问的网页被外星人抓走了~</div>
     )
   }
}
export default Error;