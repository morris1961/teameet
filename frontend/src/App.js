import HomePage from "./Containers/HomePage"
import GroupPage from "./Containers/GroupPage"
import DiscussionPage from "./Containers/DiscussionPage"
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
            <Route exact path="/:user" component={HomePage} />
            <Route exact path="/:user/:GID" component={GroupPage} />
            <Route exact path="/:user/:GID/:DID" component={DiscussionPage} />
          </Switch>
      </Router>
    </>
  );
}
export default App;
