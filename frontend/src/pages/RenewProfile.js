import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import '../style/RenewProfile.css'
import {Button, Input, Layout, notification} from 'antd';
import {useHistory, useLocation} from "react-router-dom";
const { Header, Content } = Layout;
const RegisterSuccess = ({sendData, mess}) =>{
  const location = useLocation();
  var data = location.state.data;
  var {UID, UName, password, email} = data;

  const history = useHistory();
  const [newUName, setUName] = useState(UName);
  const [newpassword, setPassword] = useState(password);
  useEffect(()=>{
    if(mess.api === "renewProfile"){
      if(mess.data.status === true){
      notification['success']({
        message: '更新成功',
        description:
        '已更新您的個人資料, 即將跳轉回去',
      });
      setTimeout(history.goBack(), 2000 )
    }else{
      notification['error']({
        message: '更新失敗',
        description:
        '伺服器出錯了, 麻煩你再嘗試一次',
      });
    }}
  },[mess, history]);

  const handlerenew = () =>{

    var data = {UID:UID, UName:newUName, password:newpassword};
    sendData('renewProfile', data);
  }
  return( 
    <React.Fragment>
    
    <Layout>
      <Header style={{backgroundColor:"white"}}>
          <div style={{float:"left",marginLeft:"-2vw", fontSize:"3vw", color:"#000099"}}>
            TEAMEET
          </div>
          <span style = {{float:"left", fontSize:"2vw", marginTop:"0.3vw", marginLeft:"0.8vw"}}>
            更新個人資料
          </span>

        </Header>

      <Content style={{backgroundColor:"white"}}>
      <div className="renew_account">
            <div className="renew_account-title">帳號: </div>
            <div className="renew_account-txt">{email}</div>
        </div>

        <div className="renew_name">
            <div className="renew_mid-title">暱稱: </div>
            <div className="renew_mid-input">
            <Input 
            className="renew_searchbox"
            onChange={(event)=>setUName(()=>event.target.value)}
            placeholder={UName}/>
            </div>
        </div>

        <div className="renew_mid">
            <div className="renew_mid-title">密碼: </div>
            <div className="renew_mid-input">
                <Input.Password 
                className="renew_searchbox"
                onChange={(event)=>setPassword(()=>event.target.value)} 
                placeholder={password} />
            </div>
        </div>



        <div className="renew_button">
        <Button 
            className="renew_button-button"
            onClick = {handlerenew}>
            確認
        </Button>
        </div>
      </Content>
    </Layout>

      

    </React.Fragment>
    


  );}
export default RegisterSuccess;
