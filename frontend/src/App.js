import HomePage from "./Containers/HomePage"
import GroupPage from "./Containers/GroupPage"
import DiscussionPage from "./Containers/DiscussionPage"
import useData from "./client"
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  
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
    DName,
    time_options,
    isDue,
    voted,
    place_options, }
  = useData()

  return (
    <>
      <Router>
          <Switch>
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
              DName={DName} 
              isAdmin={isAdmin} 
              subject={subject}
              content={discuss_content}
              sendData={sendData}
              time_options={time_options}
              isDue={isDue}
              voted={voted}
              place_options={place_options}
              />)} />
  
          </Switch>
      </Router>
    </>
  );
}
export default App;
