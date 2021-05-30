import './App.css';
import {HashRouter,Route,BrowserRouter,Switch,Link, Router} from "react-router-dom";


import Beforelogin from "./pages/Beforelogin"
import Login from "./pages/Login"
import Register from "./pages/Register"

const App = () =>{

  return( 
    
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Beforelogin} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        
      </Switch>
    </BrowserRouter>
  
    
  );
}


export default App;
