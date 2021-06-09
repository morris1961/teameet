
import './App.css';
import {Route,BrowserRouter,Switch} from "react-router-dom";


import Beforelogin from "./pages/Beforelogin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RenewProfile from "./pages/RenewProfile";
import Index from "./pages/Index";

const App = () =>{

  return( 
    
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Beforelogin} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/index" component={Index} />
        <Route exact path="/renewProfile" component={RenewProfile} />
      </Switch>
    </BrowserRouter>
  
    
  
    
  );
}

export default App;
