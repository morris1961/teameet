
import './App.css';
import {Route,BrowserRouter,Switch} from "react-router-dom";

import Beforelogin from "./pages/Beforelogin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RenewProfile from "./pages/RenewProfile";
import HomePage from "./pages/HomePage"
import GroupPage from "./pages/GroupPage"
import DiscussionPage from "./pages/DiscussionPage"
import useData from "./useData"
import { message } from 'antd'
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
    place_options,
    isSelectTime,
    isSelectPlace,
    time_result,
    place_result,
    status,
    error_msg,
    UID,
    recent, 
    voting,
    GID,
    message,
    isonmessage,
  }
  = useData()

  const displayStatus = (payload) =>{
    if(payload){
      const {type, msg} = payload
      const content = {
        content: msg,
        duration: 1.5,
      }
      switch(type){
        case "success":
          message.success(content)
          break
        case "error":
          message.error(content)
          break
      }
    }
  }


  return( 
    
    <BrowserRouter>
      <Switch>
      <Route exact path="/" component={Beforelogin} />
        <Route exact path="/login" render={()=>(<Login status = {status} error_msg={error_msg} UID={UID} sendData={sendData} isonmessage={isonmessage}/>)} />
        <Route exact path="/register" render={()=>(<Register status = {status} sendData={sendData} isonmessage={isonmessage}/>)} />
        <Route exact path="/index" render={()=>(<HomePage UName={UName}  recent = {recent} voting={voting} group={group} sendData={sendData} isonmessage={isonmessage}/>)} />
        <Route exact path="/renewProfile" render={()=>(<RenewProfile status = {status} sendData={sendData} isonmessage={isonmessage}/>)} />
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
            sendData={sendData}
            displayStatus={displayStatus}
            message={message}
            />)} />

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
              isAdmin={isAdmin}
              isSelectTime={isSelectTime}
              isSelectPlace={isSelectPlace}
              time_result={time_result}
              place_result={place_result}
              displayStatus={displayStatus}
              message={message}
              />)} />
      </Switch>
    </BrowserRouter>
    
    
  );
}

export default App;
