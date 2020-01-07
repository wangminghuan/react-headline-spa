import React, {Component} from 'react';
import AppRoutes from './router';
import './App.less';
class App extends Component {
   constructor(props){
     super(props);
     this.state={};
   }
   render(){
     return (
       <AppRoutes/>
     )
   }
}
export default App;
