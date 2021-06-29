
import React, { useEffect, useState, useRef } from 'react'
import { Button, notification, Input, Layout } from 'antd';
import { useHistory } from "react-router-dom";
import 'antd/dist/antd.css';
import '../style/Register.css'
const { Header, Content, Footer } = Layout;
const Register = ({sendData, mess}) =>{
  const history = useHistory();
  const [UName, setUName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pass2, setPass2] = useState("");
  const [isregistersuccess,setIsregistersuccess] = useState(false);
  const validemail= /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
  const nameRef = useRef(null);
  const passRef = useRef(null);
  const pass2Ref = useRef(null);
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
    <Layout style={{backgroundImage:'url(https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960_960_720.jpg)',  backgroundSize: "cover"}}>
    {isregistersuccess?(<>
        {/* <Header style={{backgroundColor:"white"}}>
          <div style={{float:"left",marginLeft:"-2vw", fontSize:"3vw", color:"#000099"}}>
            TEAMEET
          </div>
          <span style = {{float:"left", fontSize:"2vw", marginTop:"0.3vw", marginLeft:"0.8vw"}}>
            註冊成功
          </span>
        </Header> */}
        <Header style={{backgroundColor:"rgba(0, 0, 0, 0.3)", height: "100px"}} />

        <Content style={{height:"40vw",
                      backgroundSize:'cover',
                      backgroundColor:"rgba(0, 0, 0, 0.3)",
                      // display: "flex",
                      // justifyContent: "center",
                      textAlign: "center",
                      }}>
        <div 
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="1200"
        className="register_opacity">
          <div className="text">
            {/* <div className="registersuccess_txt">
                Hi! {UName} 謝謝你決定加入 TEAMEET，
              </div>
              <div className="registersuccess_midtxt">
                希望你可以在這裡有良好的體驗，
              </div>
              <div className="registersuccess_midtxt">
                有什麼想說的也歡迎回饋給我們。
              </div>
              <div className="registersuccess_nametxt">
              -- TEAMEET  團隊
              </div> */}
             Hi! {UName} 謝謝你決定加入 TEAMEET，<br />
             希望你可以在這裡有良好的體驗， <br />
             有什麼想說的也歡迎回饋給我們。 <br />
             &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
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
        </>):(<>
          
          <Header style={{backgroundColor:"rgba(0, 0, 0, 0.3)", height: "100px"}} />

          <Content style={{height:"40vw",
                      backgroundSize:'cover',
                      backgroundColor:"rgba(0, 0, 0, 0.3)",
                      display: "flex",
                      justifyContent: "center",
                      }}>
            <div data-aos='zoom-in' className="register_opacity">
                <h1 className="register">
                  註冊帳號
                </h1>
                <div className="register_account register_input">
                    <div className="register_account-title register_title">帳號： </div>
                    <div className="register_account-input">
                    <Input 
                    className="register_searchbox"
                    placeholder="                                                             @gmail.com"
                    onChange={(event)=>setEmail(()=>event.target.value)}
                    onKeyDown={(e)=>{if(e.key === 'Enter'){nameRef.current.focus()}}}
                    value={email}/>
                    </div>
                </div>

                <div className="register_mid register_input">
                    <div className="register_mid-title register_title">暱稱： </div>
                    <div className="register_mid-input">
                    <Input 
                    className="register_searchbox"
                    onChange={(event)=>setUName(()=>event.target.value)}
                    onKeyDown={(e)=>{if(e.key === 'Enter'){passRef.current.focus()}}}
                    ref={nameRef}
                    value={UName}/>
                    </div>
                </div>

                <div className="register_mid register_input">
                    <div className="register_mid-title register_title">密碼： </div>
                    <div className="register_mid-input">
                        <Input.Password 
                        className="register_searchbox"
                        onChange={(event)=>setPassword(()=>event.target.value)} 
                        onKeyDown={(e)=>{if(e.key === 'Enter'){pass2Ref.current.focus()}}}
                        ref={passRef}
                        value={password} />
                    </div>
                </div>

                <div className="register_pass register_input">
                    <div className="register_pass-title register_title">再次輸入密碼： </div>
                    <div className="register_pass-input">
                    <Input.Password 
                        className="register_searchbox"
                        onChange={(event)=>setPass2(()=>event.target.value)} 
                        onPressEnter={handleregister}
                        ref={pass2Ref}
                        value={pass2} />
                    </div>
                </div>

                <Button 
                    className="register_button-button"
                    onClick = {handleregister}
                    type = 'primary'
                    style={{marginRight: "1%"}}>
                    註冊
                </Button>
                <Button 
                    className="register_button-button"
                    onClick = {()=>{history.push("/login")}}
                    type = 'primary'>
                    返回
                </Button>
            </div>
          </Content></>)}
    <Footer className="footer" style={{backgroundColor:"rgba(0, 0, 0, 0.7)", height: "10%"}}>Created by NTUIM | TEAMEET team @2021</Footer>
    </Layout>
    </React.Fragment>
    


  );
}


export default Register;
