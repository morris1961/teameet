
import React, { useEffect, useState } from 'react'
import { Button, notification, Input, Layout } from 'antd';
import { useHistory } from "react-router-dom";
import { If, Then, Else } from 'react-if-elseif-else-render';
import 'antd/dist/antd.css';
import '../style/Register.css'
const { Header, Content } = Layout;
const Register = ({sendData, status}) =>{
  useEffect(()=>{
    // console.log("useEffect ststus:", status)
    if(click === true){
      if(status === undefined){
      console.log("undefined....")
      setClick(false);
      return
    }else if(status === true){
      setIsregistersuccess(true);
      setClick(false);
    }else if(status === false){
      notification['error']({
      message: '錯誤',
      description:
        '這個信箱已經註冊過了',
      });
      setClick(false);
    } }
});
  const history = useHistory();
  const [UName, setUName] = useState("winnie");
  const [email, setEmail] = useState("winniew0824@gmail.com");
  const [password, setPassword] = useState("123");
  const [pass2, setPass2] = useState("123");
  const [click, setClick] = useState(false);
  const [isregistersuccess,setIsregistersuccess] = useState(false);
  const handleregister = async()=>{
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
        }else{
          var data = {email:email, UName: UName, password:password};
          sendData('register', data);
          console.log("register.js in frontend send:", data);
          setClick(true);
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

          <Content style={{backgroundColor:"white"}}>
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

          <Content style={{backgroundColor:"white"}}>
            <div className="register_account">
                <div className="register_account-title">帳號: </div>
                <div className="register_account-input">
                <Input 
                className="register_searchbox"
                placeholder="                                                @gmail.com"
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
          </Content>
        </Else>
      </If>
      
    </Layout>
    </React.Fragment>
    


  );
}


export default Register;
