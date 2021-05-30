
import React, { useState } from 'react'
import 'antd/dist/antd.css';
import '../style/Register.css'
import { Button, Input, Checkbox, Layout } from 'antd';
import {useHistory} from "react-router-dom";
const { Header, Content } = Layout;
const Register = () =>{
  const history = useHistory();
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [ischeck, setIscheck] = useState(false);
  const handlecheck = (e) => {setIscheck(e.target.checked)};
  
  return( 
    <React.Fragment>
    <Layout>
      <Header style={{backgroundColor:"white"}}>
          <div style={{marginLeft:"-2vw", fontSize:"3vw", color:"#000099"}}>
            TEAMEET
          </div>
        </Header>

      <Content style={{backgroundColor:"white"}}>
        <div className="register_account">
            <div className="register_account-title">帳號: </div>
            <div className="register_account-input">
            <Input 
            className="register_searchbox"
            placeholder="                                                @gmail.com"
            onFocus="this.placeholder = ''"
            onChange={(event)=>setAccount(()=>event.target.value)}
            value={account}/>
            </div>
        </div>

        <div className="register_name">
            <div className="register_mid-title">姓名: </div>
            <div className="register_mid-input">
            <Input 
            className="register_searchbox"
            placeholder="                                                @gmail.com"
            onFocus="this.placeholder = ''"
            onChange={(event)=>setName(()=>event.target.value)}
            value={name}/>
            </div>
        </div>

        <div className="register_mid">
            <div className="register_mid-title">密碼: </div>
            <div className="register_mid-input">
                <Input.Password 
                className="register_searchbox"
                onChange={(event)=>setPass(()=>event.target.value)} 
                value={pass} />
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
           

        <div className = "register_check">
            <Checkbox className="register_check-checkbox" onChange={handlecheck} ></Checkbox>
        
            <a href="https://drive.google.com/file/d/1kvihGU8SSoVB6ctJ4kHENET_AkQFTjsJ/view?usp=sharing" 
                target = "_blank" 
                className="register_check-txt">
            我已閱讀並同意該服務協定 
            </a>
        </div>

        <div className="register_button">
        <Button 
            className="register_button-button"
            onClick = {()=>history.push('/')}>
            註冊
        </Button>
        </div>
      </Content>
    </Layout>


      

      
      
    
      
    

      
      
    </React.Fragment>
    


  );
}


export default Register;
