
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
    
    <Layout style={{backgroundImage:'url(https://cdn.pixabay.com/photo/2015/01/08/18/27/startup-593341__340.jpg)'}}>
      <Header style={{backgroundColor:"white"}}>
          <div style={{marginLeft:"-2vw", fontSize:"3vw", color:"#000099"}}>
            TEAMEET
          </div>
      </Header>

      <Content style={{height:"40vw",
                      backgroundSize:'cover',
                      backgroundImage:'url(https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960_960_720.jpg)'}}>
      <div className="beforelogin_opacity">
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
      </div>
      </Content>

    </Layout>
    </React.Fragment>
    


  );
}


export default Login;
