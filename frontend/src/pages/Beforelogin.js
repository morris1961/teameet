
import React from 'react'
import 'antd/dist/antd.css';
import '../style/Beforelogin.css'
import {Button, Layout} from 'antd';
import {useHistory} from "react-router-dom";
import logo from '../image/logo.png';
const { Header, Content, Footer } = Layout;
const Login = () =>{
  const history = useHistory();
  return( 
    <React.Fragment>
    
    <Layout style={{backgroundImage:'url(https://cdn.pixabay.com/photo/2015/01/08/18/27/startup-593341__340.jpg)', backgroundSize: "cover"}}>
      <Header style={{backgroundColor:"rgba(0, 0, 0, 0.3)", height: "100px"}} />
      
      <Content style={{height:"40vw",
                      backgroundSize:'cover',
                      backgroundColor:"rgba(0, 0, 0, 0.3)",
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "10%",
                    }}>
        <div data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine" className="beforelogin_opacity" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <h1 className="beforelogin_account-welcome">
              Welcome to TEAMEET!
          </h1>
          <a
              data-aos='zoom-in'
              className="beforelogin_login-a"
              style={{color: "#FCFCFC"}}
              onClick = {()=>{history.push("/login")}}>
            點此登入 →
          </a>
        </div>
        
      </Content>
    <Footer className="footer" style={{backgroundColor:"rgba(0, 0, 0, 0.7)", height: "10%"}}>Created by NTUIM | TEAMEET team @2021</Footer>

    </Layout>
    </React.Fragment>
    


  );
}


export default Login;
