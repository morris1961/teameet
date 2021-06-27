import React, { useCallback, useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import '../style/Login.css'
import {Button, Input, Layout, notification} from 'antd';
import {useHistory} from "react-router-dom";
const { Header, Content, Footer } = Layout;
const Login = ({sendData, mess}) =>{
  const history = useHistory();
  const [UID, setUID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const validemail= /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 

  useEffect(()=>{
    if(mess.api === "login"){
      if(mess.data.status === true){
        var data ={UID: mess.data.UID}
        sendData('index', data);
        setUID(mess.data.UID)
      }else if(mess.data.status === false){
        notification['error']({
          message: '錯誤',
          description:
          '使用者錯誤 或是 密碼錯誤，請確認是否已經註冊！',
          duration: 3,
        });
      }else{
        notification['error']({
          message: '錯誤',
          description:
            '請稍後再試一次',
          });
      }
    }else if(mess.api === "index"){
      var data = mess.data;
      data.UID=UID;
      data.email=email;
      data.password=password;
      console.log("data in index push", data)
        var path = {
          pathname:"/index",
          state:{data},
        }
        history.push(path);
    }
  },[mess]);
  
  

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
      setLoading(true);
    }
  }    
  
  return( 
    <React.Fragment>
    
    <Layout style={{backgroundImage:'url(https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960_960_720.jpg)',  backgroundSize: "cover"}}>
      <Header style={{backgroundColor:"rgba(0, 0, 0, 0.3)", height: "100px"}} />

      <Content style={{height:"40vw",
                      backgroundSize:'cover',
                      backgroundColor:"rgba(0, 0, 0, 0.3)",
                      display: "flex",
                      justifyContent: "center",
                      }}>
      <div data-aos='zoom-in' className="login_opacity">
        <h1 className="login_account-welcome">
          Let's TEAMEET together!
        </h1>
        <div className="login_account login_input">
          <div className="login_title" > 帳號： </div>
          <div className="login_account-input" >
            <Input 
                className="login_searchbox"
                placeholder="                                      @gmail.com"
                onChange={(event)=>setEmail(()=>event.target.value)}
                value={email}
              />
          </div>
        </div>
            
        <div className="login_password login_input" >
          <div className="login_title" >密碼： </div>
          <div className="login_password-input" >
              <Input.Password 
                    className="login_searchbox"
                    onChange={(event)=>setPassword(()=>event.target.value)} 
                    value={password} />
          </div>
        </div>
    
      <Button
          className="login_login-button"
          onClick = {handlelogin}
          loading={loading} 
          type='primary'
          >
        登入
      </Button>
      <div className="login_bottom-register">
        <a
            className= "login_bottom-register-button"
            onClick = {useCallback(()=>history.push('/register'), [history])}>
          還沒有帳號？點此註冊
        </a>
      </div>
      </div>
     
      </Content>
      <Footer className="footer" style={{backgroundColor:"rgba(0, 0, 0, 0.7)", height: "10%"}}>Created by NTUIM | TEAMEET team @2021</Footer>

    </Layout>


      

    </React.Fragment>
    


  );
}


export default Login;
