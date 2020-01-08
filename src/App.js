import React, {Component} from 'react';
import AppRoutes from './router';
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
