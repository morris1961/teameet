import HomePage from "./Containers/HomePage"
// import GroupPage from "./Containers/GroupPage"
// import DiscussionPage from "./Containers/DiscussionPage"
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <>
      <Router>
          <Switch>
            <Route exact path="/:UID" component={HomePage} />
            {/* <Route exact path="/:UID/:GID" component={GroupPage} />
            <Route exact path="/:UID/:GID/:DID" component={DiscussionPage} /> */}
          </Switch>
      </Router>
    </>
  );
}
export default App;
