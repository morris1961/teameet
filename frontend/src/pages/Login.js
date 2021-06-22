import React, { useCallback, useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import '../style/Login.css'
import {Button, Input, Layout, notification} from 'antd';
import {useHistory} from "react-router-dom";
const { Header, Footer, Content } = Layout;
const Login = ({sendData, isonmessage}) =>{
  useEffect(()=>{

    if(click === true){
      if(isonmessage.status === true){
        var data = {UID: isonmessage.UID, password: password, email:email};
        var path = {
          pathname:"/index",
          state:{data},
        }
        history.push(path);
        setClick(false);
      }else if(isonmessage.status === false){
        notification['error']({
          message: '錯誤',
          description:
          '使用者錯誤 或是 密碼錯誤，請確認是否已經註冊！',
          duration: 3,
        });
        setClick(false);
      }else{
        notification['error']({
          message: '錯誤',
          description:
            '請稍後再試一次',
          });
          setClick(false);
      }
    }
  },[isonmessage]);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [click, setClick] = useState(false);
  const validemail= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 

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
    }else if(!validemail.test(email)){
      notification['error']({
        message: '錯誤',
        description:
          '帳號須為合理mail',
      });
    }else{
      var data = {email:email, password:password};
      sendData('login', data)
      console.log("login.js in frontend send:", data)
      setClick(true);
    }
  }
  
    
    
  
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
