import { Route, BrowserRouter, Switch } from "react-router-dom";
import Beforelogin from "./pages/Beforelogin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage"
import GroupPage from "./pages/GroupPage"
import DiscussionPage from "./pages/DiscussionPage"
import useData from "./useData"
import { message } from 'antd'
import 'antd/dist/antd.css';
import './App.css';

const App = () => {

  const {
    sendData,
    discussions,
    time_options,
    isDue,
    time_voted,
    place_voted,
    place_options,
    isSelectTime,
    isSelectPlace,
    time_result,
    place_result,
    mess,
  }
    = useData()

  const displayStatus = (payload) => {
    if (payload) {
      const { type, msg } = payload
      const content = {
        content: msg,
        duration: 1.5,
      }
      switch (type) {
        case "success":
          message.success(content)
          break
        case "error":
          message.error(content)
          break
        default:
          break
      }
    }
  }


  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Beforelogin} />
        <Route exact path="/login" render={() => (<Login sendData={sendData} mess={mess} />)} />
        <Route exact path="/register" render={() => (<Register sendData={sendData} mess={mess} />)} />
        <Route exact path="/index" render={() => (<HomePage sendData={sendData} mess={mess} displayStatus={displayStatus} />)} />
        <Route exact path="/:UID/:GID"
          render={() =>
          (<GroupPage
            discussions={discussions}
            sendData={sendData}
            displayStatus={displayStatus}
            message={mess}
          />)} />

        <Route exact path="/:UID/:GID/:DID"
          render={() =>
          (<DiscussionPage
            sendData={sendData}
            time_options={time_options}
            isDue={isDue}
            time_voted={time_voted}
            place_voted={place_voted}
            place_options={place_options}
            isSelectTime={isSelectTime}
            isSelectPlace={isSelectPlace}
            time_result={time_result}
            place_result={place_result}
            displayStatus={displayStatus}
            message={mess}
          />)} />
      </Switch>
    </BrowserRouter>


  );
}

export default App;
