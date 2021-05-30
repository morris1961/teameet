import {useState} from 'react'
import HomePage from "./Containers/HomePage"
import GroupPage from "./Containers/GroupPage"
import 'antd/dist/antd.css';
// import './App.css';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <GroupPage user={"morris"}/>
        {/* <homePage user={"alice"}/> */}
      </header>
    </div>
  );
}
export default App;
