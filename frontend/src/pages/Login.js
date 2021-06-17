import React, { useCallback, useState } from 'react'
import 'antd/dist/antd.css';
import '../style/Login.css'
import {Button, Input, Layout, notification} from 'antd';
import {useHistory} from "react-router-dom";
import useCallbackState from '../hooks/useCallbackState';
import {login_req, client_ws } from "../Client"; 
const { Header, Footer, Content } = Layout;
const Login = () =>{
  
  const history = useHistory();
  const [email, setEmail] = useState("winniew0824@gmail.com");
  const [password, setPassword] = useState("12");
  const [UID, setUID] = useCallbackState("");

  const handlelogin = () =>{
    if(email.length===0){
        notification['error']({
          message: '錯誤',
          description:
            '請輸入你的帳號(不可為空)',
        });
    }else if(password.length===0){
      notification['error']({
        message: '錯誤',
        description:
          '請輸入你的密碼(不可為空)',
      });
    }else if(email.search("@gmail.com")  === -1){
      notification['error']({
        message: '錯誤',
        description:
          '帳號須為合理mail(@gmail.com)',
      });
    }else
    {
      login_req({api:'login',
                  data: {email:email, password:password}});

      client_ws.onmessage = function(e){
        var msg = JSON.parse(e.data);
        console.log(msg);

        if(msg.data.status === false){
          notification['error']({
              message: '錯誤',
              description:
              '使用者錯誤 或是 密碼錯誤，請確認是否已經註冊！'+msg.data.error_msg,
            });
        }else if(msg.data.status === true){
          setUID(msg.data.UID);
          console.log(msg.data.UID);
          var data = {UID: msg.data.UID, password: password, email:email};
          var path = {
            pathname:"/index",
            state:{data},
          }
          history.push(path);
        }
        console.log(UID);
      }
     
    }
    

    // history.push(path);
    

  };
  
  return( 
    <React.Fragment>
    
    <Layout>
      <Header style={{backgroundColor:"white"}}>
          <div style={{marginLeft:"-2vw", fontSize:"3vw", color:"#000099"}}>
            TEAMEET
          </div>

        </Header>

      <Content style={{backgroundColor:"white"}}>
      <div className="login_account-welcome">
              Welcome to TEAMEET!
      </div>
      <div className="login_account" >
          <div className="login_account-title" > 帳號: </div>
          <div className="login_account-input" >
              <Input 
              className="login_searchbox"
              placeholder="                                                @gmail.com"
              onChange={(event)=>setEmail(()=>event.target.value)}
              value={email}
            />
          </div>
      </div>
            
      <div className="login_password" >
        <div className="login_password-title" >密碼: </div>
        <div className="login_password-input" >
            <Input.Password 
                  className="login_searchbox"
                  onChange={(event)=>setPassword(()=>event.target.value)} 
                  value={password} />

            {/* <Button
                type="link"
                className="forgetpass-button"
                onClick = {useCallback(()=>history.push('/account/reset'), [history])}>
              忘記密碼?
            </Button> */}
        </div>
      </div>
    
      <div className="login_login">
        <Button
            className="login_login-button"
            onClick = {handlelogin}>
          登入
        </Button>
      </div>
      </Content>

      <Footer style={{backgroundColor:"white"}}>
      <div className="login_bottom-register">
        <Button
            className= "login_bottom-register-button"
            onClick = {useCallback(()=>history.push('/register'), [history])}>
          還沒有帳號？點此註冊
        </Button>
      </div>
      </Footer>
    </Layout>


      

    </React.Fragment>
    


  );
}


export default Login;