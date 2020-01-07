
import React, { lazy ,Suspense} from 'react'; //在一条语句中，同时输入默认方法和其他接口
import { HashRouter as Router, Route,Switch} from 'react-router-dom';
const  Home =lazy(() => import('../views/Home'));
const  Patent =lazy(() => import('../views/Patent'));
const ErrorRoute=lazy(() => import('../views/Error'));
// 有<Switch>标签，则其中的<Route>在路径相同的情况下，只匹配第一个，这个可以避免重复匹配
// Suspense 标签将要进行 lazy（懒加载）的组件进行包裹，然后在 callback 函数中给出加载过程中处理方式，也就是加载过程中的行为
const AppRoutes=()=>{
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>  
          <Switch> 
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/patent" component={Patent} />
            {/* <Route path="/subject" component={Subject} />
            <Route path="/detail" component={Detail} /> */}
            <Route component={ErrorRoute} />
          </Switch>
       </Suspense>
		</Router>
  )
}
export default AppRoutes