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
import AOS from 'aos';
import "aos/dist/aos.css";
import { useEffect } from "react";



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

  useEffect(()=>{
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
      initClassName: 'aos-init', // class applied after initialization
      animatedClassName: 'aos-animate', // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // disables automatic mutations' detections (advanced)
      debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
      throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
      
    
      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 1000, // values from 0 to 3000, with step 50ms
      easing: 'ease', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    
    });
  }, [])


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
