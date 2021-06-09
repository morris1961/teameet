
import './App.css';
import {Route,BrowserRouter,Switch} from "react-router-dom";

import Beforelogin from "./pages/Beforelogin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RenewProfile from "./pages/RenewProfile";
import Index from "./pages/Index";
import HomePage from "./pages/HomePage"
import GroupPage from "./pages/GroupPage"
import DiscussionPage from "./pages/DiscussionPage"
import useData from "./useData"
import 'antd/dist/antd.css';

const App = () =>{

  const {
    sendData,
    code,
    group,
    isAdmin,
    discussions,
    file,
    UName,
    GName,
    discuss_content,
    subject,
    time_options,
    isDue,
    time_voted,
    place_voted,
    place_options, }
  = useData()

  return( 
    
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Beforelogin} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/index" component={Index} />
        <Route exact path="/renewProfile" component={RenewProfile} />
        <Route exact path="/:UID" render={()=>(<HomePage UName={UName} group={group} sendData={sendData}/>)} />
            <Route exact path="/:UID/:GID" 
            render={()=>
            (<GroupPage 
            UName={UName} 
            code={code} 
            GName={GName} 
            isAdmin={isAdmin} 
            file={file}
            discussions={discussions} 
            group={group} 
            sendData={sendData}/>)} />

            <Route exact path="/:UID/:GID/:DID" 
            render={()=>
              (<DiscussionPage 
              UName={UName}
              GName={GName}
              isAdmin={isAdmin} 
              subject={subject}
              content={discuss_content}
              sendData={sendData}
              time_options={time_options}
              isDue={isDue}
              time_voted={time_voted}
              place_voted={place_voted}
              place_options={place_options}
              />)} />
      </Switch>
    </BrowserRouter>
    
    
  );
}

export default App;
