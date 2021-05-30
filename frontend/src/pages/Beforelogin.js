
import React from 'react'
import 'antd/dist/antd.css';
import '../style/Beforelogin.css'
import {Button, Layout} from 'antd';
import {useHistory} from "react-router-dom";
const { Header, Content } = Layout;
const Login = () =>{
  const history = useHistory();
  return( 
    <React.Fragment>
    
    <Layout>
      <Header style={{backgroundColor:"white"}}>
          <div style={{marginLeft:"-2vw", fontSize:"3vw", color:"#000099"}}>
            TEAMEET
          </div>
      </Header>

      <Content style={{backgroundColor:"white"}}>
      <div className="beforelogin_account-welcome">
              Welcome to TEAMEET!
      </div>
      <div className="beforelogin_login">
        <Button
            className="beforelogin_login-button"
            onClick = {()=>{history.push("/login")}}>
          點此進入
        </Button>
      </div>
      </Content>

    </Layout>


      

    </React.Fragment>
    


  );
}


export default Login;
