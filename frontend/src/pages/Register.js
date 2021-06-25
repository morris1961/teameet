
import React, { useEffect, useState } from 'react'
import { Button, notification, Input, Layout } from 'antd';
import { useHistory } from "react-router-dom";
import { If, Then, Else } from 'react-if-elseif-else-render';
import 'antd/dist/antd.css';
import '../style/Register.css'
const { Header, Content } = Layout;
const Register = ({sendData, mess}) =>{
  const history = useHistory();
  const [UName, setUName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pass2, setPass2] = useState("");
  const [isregistersuccess,setIsregistersuccess] = useState(false);
  const validemail= /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 

  useEffect(()=>{
    if(mess.api === "register"){
      if(mess.data.status === true){
        setIsregistersuccess(true);
      }else if(mess.data.status === false){
        notification['error']({
        message: '錯誤',
        description:
          '這個信箱已經註冊過了',
        });
      }else{
        notification['error']({
          message: '錯誤',
          description:
            '請稍後再試一次',
          });
      }
  } 
},[mess]);
 
  const handleregister = ()=>{
        if(email.length===0){
          notification['error']({
            message: '錯誤',
            description:
              '請輸入你的帳號(不可為空)',
          });
        }else if(UName.length===0){
          notification['error']({
            message: '錯誤',
            description:
              '請輸入你的暱稱(不可為空)',
          });
        }else if(password.length===0){
          notification['error']({
            message: '錯誤',
            description:
              '請輸入你的密碼(不可為空)',
          });
        }else if(pass2.length===0){
          notification['error']({
            message: '錯誤',
            description:
              '請再次輸入你的密碼(不可為空)',
          });
        }else if(password !== pass2){
          notification['error']({
            message: '錯誤',
            description:
              '密碼不一致，請重新輸入',
          });
          setPassword('');
          setPass2('');
        }else if(!validemail.test(email)){
          notification['error']({
            message: '錯誤',
            description:
              '帳號須為合理mail'});
        }else{
          var data = {email:email, UName: UName, password:password};
          sendData('register', data);
          console.log("register.js in frontend send:", data);
          }

      };
  return( 
    <React.Fragment>
    <Layout>
      <If condition={isregistersuccess}>
        <Then>
          <Header style={{backgroundColor:"white"}}>
            <div style={{float:"left",marginLeft:"-2vw", fontSize:"3vw", color:"#000099"}}>
              TEAMEET
            </div>
            <span style = {{float:"left", fontSize:"2vw", marginTop:"0.3vw", marginLeft:"0.8vw"}}>
              註冊成功
            </span>

          </Header>

          <Content style={{height:"40vw",
                      backgroundSize:'cover',
                      backgroundImage:'url(https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960_960_720.jpg)',
                      }}>
          <div className="register_opacity">
          <div className="registersuccess_txt">
            Hi! {UName} 謝謝你決定加入 TEAMEET，
          </div>
          <div className="registersuccess_midtxt">
            希望你可以在這裡有良好的體驗，
          </div>
          <div className="registersuccess_midtxt">
            有甚麼想說的也歡迎回饋給我們。
          </div>
          <div className="registersuccess_nametxt">
          -- TEAMEET  團隊
          </div>
        
          <div className="registersuccess_login">
            <Button
                className="registersuccess_login-button"
                onClick = {()=>{history.push("/login")}}>
              點此登入
            </Button>
          </div>
          </div>
          </Content>
        </Then>
        <Else>
          <Header style={{backgroundColor:"white"}}>
              <div style={{marginLeft:"-2vw", fontSize:"3vw", color:"#000099"}}>
                TEAMEET
              </div>
              <span style = {{float:"left", fontSize:"2vw", marginTop:"0.3vw", marginLeft:"0.8vw"}}>
                註冊
              </span>
          </Header>

          <Content style={{height:"40vw",
                      backgroundSize:'cover',
                      backgroundImage:'url(https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960_960_720.jpg)',
                      }}
                      >
            <div className="register_opacity">
            <div className="register_account">
                <div className="register_account-title">帳號: </div>
                <div className="register_account-input">
                <Input 
                className="register_searchbox"
                placeholder="                                          @gmail.com"
                onChange={(event)=>setEmail(()=>event.target.value)}
                value={email}/>
                </div>
            </div>

            <div className="register_name">
                <div className="register_mid-title">暱稱: </div>
                <div className="register_mid-input">
                <Input 
                className="register_searchbox"
                onChange={(event)=>setUName(()=>event.target.value)}
                value={UName}/>
                </div>
            </div>

            <div className="register_mid">
                <div className="register_mid-title">密碼: </div>
                <div className="register_mid-input">
                    <Input.Password 
                    className="register_searchbox"
                    onChange={(event)=>setPassword(()=>event.target.value)} 
                    value={password} />
                </div>
            </div>

            <div className="register_pass">
                <div className="register_pass-title">再次輸入密碼: </div>
                <div className="register_pass-input">
                <Input.Password 
                    className="register_searchbox"
                    onChange={(event)=>setPass2(()=>event.target.value)} 
                    value={pass2} />
                </div>
            </div>

            <div className="register_button">
            <Button 
                className="register_button-button"
                onClick = {handleregister}>
                註冊
            </Button>
            </div>
            </div>
          </Content>
        </Else>
      </If>
      
    </Layout>
    </React.Fragment>
    


  );
}


export default Register;
