import { useEffect, useState } from 'react'
import {Button,Layout, Menu, Input, notification } from 'antd';
import {
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  FormOutlined,
  PlusOutlined,
  UsergroupAddOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import '../style/Index.css';
import {useHistory, useLocation } from "react-router-dom";
import  {BsGear}  from "react-icons/bs";
import RecentGroups from "../Components/RecentGroups";
import VotingGroups from "../Components/VotingGroups";
import logo from '../image/logo.png';
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const HomePage = ({sendData, mess, displayStatus}) =>{

    const [collapsed, setCollapsed] = useState(false)
    const history = useHistory();
    const location = useLocation();
    var data = location.state.data;
    var {UName, UID, password, email, group, recent, voting} = data;
    
    const [GID, setGID] = useState("");
    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };


    const [iscreateclicked, setIscreateclicked] = useState(false);
    const [isjoinclicked, setIsjoinclicked] = useState(false);
    const [isrenewprofileclick, setIsrenewprofileclick] = useState(false);
    const [code, setCode]=useState("");
    const [GName, setGName]=useState("");
    const [file, setFile]=useState("");
    const [newUName, setUName] = useState(UName);
    const [newpassword, setPassword] = useState(password);
    const [loading, setLoading] = useState(false);

    const handlerenewprofile = () =>{
        setIsrenewprofileclick(true);
    }
    const handlerenew = () =>{
        var data = {UID:UID, UName:newUName, password:newpassword};
        sendData('renewProfile', data);
        setLoading(true);
      }
    const handlecreategroup = () =>{
      setIscreateclicked(true);
      setIsjoinclicked(false);  
      setIsrenewprofileclick(false);
    }
    const handlecreate = () =>{
      var data = {admin:UID, GName, file:file};
      sendData('createGroup', data);
    }
    const handlejoingroup = () =>{
      setIscreateclicked(false);
      setIsjoinclicked(true);
      setIsrenewprofileclick(false);
    }
    const handlejoin = () =>{
      if(code === ""){
        notification['error']({
          message: '錯誤',
          description:
            'code不可為空',
          });
          return
      }
      var data = {UID:UID, code:'#'+code};
      sendData('joinGroup', data);
    }
  
    const [isgearclicked, setIsgearclicked] = useState(false);
    const handlegear = () =>{
      setIsgearclicked(!isgearclicked);
    };

    const handleGroupClick = (GID) =>{
      let data = {UID, GID}
      setGID(GID);
      sendData("group", data)
    }

    useEffect(()=>{
      if(mess.api === "joinGroup"){
        var error_msg = mess.data.error_msg;
        if(error_msg === "The user has been in the group!" ){
          notification['error']({
            message: '錯誤',
            description:
              '你已經在該群組內',
            });
        }else if(error_msg === "The code is not valid!"){
          notification['error']({
            message: '錯誤',
            description:
              '請再確認一次 code 是否正確',
            });
          }else if(error_msg === "Successed!"){
          notification['success']({
            message: '成功',
            description:
            '成功加入該群組, 為你跳轉頁面',
            });
            setGID(mess.data.GID);
            let data = {UID, GID:mess.data.GID}
            sendData("group", data)
          }
      }else if(mess.api === "createGroup"){
          if(mess.data.status === false){
            notification['error']({
              message: '錯誤',
              description:
              '請稍後再重新登入一次, 並請你確認你的網路連接正常',
            });
          }else if(mess.data.status === true){
            notification['success']({
              message: '成功',
              description:
              '創建成功, 為你跳轉至群組畫面',
            });
            setGID(mess.data.GID);
            setGName(mess.data.GName);
            let data = {UID, GID:mess.data.GID};
            sendData("group", data);
          }
        }else if(mess.api === 'group'){
            var data = mess.data;
            data.UName = UName
            console.log(UID)
            data.UID = UID
            data.password=password
            data.email=email
            data.group=group
            data.voting=voting 
            data.recent=recent
            console.log("data in homepage push to group", data)
              var path = {
                pathname:`/${UID}/${GID}`,
                state:{data},
              }
              history.push(path);
          }else if(mess.api === 'message'){
            if(mess.data.status === true){
              displayStatus({type:'success', msg: `您在 ${mess.data.GName} 有新訊息（${mess.data.sender} 說：${mess.data.body}）`})
            }
          }else if(mess.api === "renewProfile"){
            if(mess.data.status === true){
              var data ={UID: UID}
              sendData('index', data);
              notification['success']({
              message: '處理中',
              description:
              '正在更新您的個人資料',
              duration:7,
            });
            
          }else{
            notification['error']({
              message: '更新失敗',
              description:
              '伺服器出錯了, 麻煩你再嘗試一次',
            });
          }
        }else if(mess.api === "index"){
            setIsrenewprofileclick(false);
            setLoading(false);
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
        },[mess])

    return(
        <Layout  style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo">
              {collapsed?null:(<img src={logo} width="90%" alt="logo"/>)}
            </div>
            <Menu theme="dark" mode="inline">
              <Menu.Item key="User" icon={<UserOutlined  style={{fontSize: "20px"}}/>} title="User" className="user" >
                <div onClick={handlegear}>{UName}</div>
                <BsGear className="index_gear" onClick={handlegear} />
              </Menu.Item>
              {isgearclicked?(<>
                <Menu.Item key="RenewProfile" icon={<FormOutlined />} title="RenewProdile" onClick={handlerenewprofile}>
                    更新個人資料
                </Menu.Item>
                <Menu.Item key="logout" icon={<LogoutOutlined />} title="Logout" onClick={()=>{history.push('/')}}>
                    登出
                </Menu.Item>
                <Menu.Item key="Back" icon={<RollbackOutlined />} title="返回" onClick={handlegear}>
                    返回
                </Menu.Item>
                </>
                ):(
                <>
                <Menu.Item key="create" icon={<PlusOutlined />} title="創建群組"  onClick={handlecreategroup}>
                    創建群組
                </Menu.Item>

                <Menu.Item key="join" icon={<UsergroupAddOutlined />} title="加入群組"  onClick={handlejoingroup}>
                    加入群組
                </Menu.Item>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="群組">
                  {group.map((g, index)=>{return(
                          <Menu.Item key={`group_${g.GID}`} 
                                     onClick={(e)=>{handleGroupClick(g.GID)}}>{g.GName}
                          </Menu.Item>)
                        })}
                </SubMenu>
                </>
              )}
            </Menu>
          </Sider>

          <Layout className="site-layout">
            <Content  style={{ margin: '0 16px' }}>
            {isrenewprofileclick?(<>
              <div className="title">
                    <p style={{fontSize: "25px", marginBottom: "0px"}}>更新個人資料</p> 
              </div>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360, display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div>
                    <div style={{display: "flex"}}>
                      <h3 className='content'> 帳號：{email}</h3>
                    </div>
                    <div style={{display: "flex", marginTop: "5%"}}>
                      <h3 className='content'> 暱稱： </h3>
                      <div>
                          <Input 
                          className="create_searchbox"
                          placeholder={UName}
                          onChange={(event)=>setUName(()=>event.target.value)}
                          />
                      </div>
                    </div>
                    <div style={{display: "flex", marginTop: "5%"}}>
                      <h3 className='content'> 密碼： </h3>
                      <div>
                          <Input 
                          className="create_searchbox"
                          placeholder={newpassword}
                          onChange={(event)=>setPassword(()=>event.target.value)}
                         />
                      </div>
                    </div>
                  </div>
                  
                  </div>
                  <div style={{display: "flex", justifyContent: "flex-end", marginRight: "5%"}}>
                    <Button
                        type='primary'
                        onClick = {handlerenew}
                        loading = {loading}>
                      確認
                    </Button>
                  </div>            
            
            </>):(<>{iscreateclicked?(<>
                  <div className="title">
                    <p style={{fontSize: "25px", marginBottom: "0px"}}>創建群組</p> 
                  </div>
                  <div className="site-layout-background" style={{ padding: 24, minHeight: 360, display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div>
                    <div style={{display: "flex"}}>
                      <h2 className='content'> 群組名稱：</h2>
                      <div>
                          <Input 
                          className="create_searchbox"
                          placeholder="請輸入 群組名稱"
                          onChange={(event)=>setGName(()=>event.target.value)}
                          value={GName}
                        />
                      </div>
                    </div>
                    <div style={{display: "flex", marginTop: "5%"}}>
                      <h2 className='content'> 資料集連結： </h2>
                      <div>
                          <Input 
                          className="create_searchbox"
                          placeholder="請輸入 資料集連結"
                          onChange={(event)=>setFile(()=>event.target.value)}
                          value={file}/>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div style={{display: "flex", justifyContent: "flex-end", marginRight: "5%"}}>
                    <Button
                        type='primary'
                        onClick = {handlecreate}>
                      創建
                    </Button>
                  </div>
                  </>):(<>
          {isjoinclicked?(<>
                <div className="title">
                  <p style={{fontSize: "25px", marginBottom: "0px"}}>加入群組</p> 
                </div>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360, display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <h2 className='content'> 群組代碼：</h2>
                  <div className="create_GName-input" >
                      <Input 
                      prefix="#"
                      className="create_searchbox"
                      placeholder="請輸入群組代碼"
                      onChange={(event)=>setCode(()=>event.target.value)}
                      value={code}/>
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "flex-end", marginRight: "5%"}}>
                  <Button 
                      type="primary"
                      onClick = {handlejoin}>
                    加入
                  </Button>
                </div></>):(<>
                <div data-aos='zoom-out-down' data-aos-duration='600' className="homePageContent">
                  <div style={{fontSize:"2vw", marginLeft:"2vw", color: "#F0F0F0"}}>投票中</div>  
                  <Menu style={{backgroundColor: "#E0E0E0"}} mode="inline" defaultOpenKeys={['recent3']}>
                      {(voting.length < 1)?(<>
                        <div style={{fontSize:"1.5vw", marginTop:"4vw", paddingTop:"2vw",height:"5vw", textAlign:"center", color: '#6C6C6C'}}>
                          目前沒有投票中的討論
                      </div>
                    </>):(<>
                      {voting.map((v, index)=>{
                          return(
                              <Menu.Item key={`voting_${index}`} style ={{height:"auto"}}
                                    onClick={(e)=>{handleGroupClick(v.GID)}}>
                                <VotingGroups key={'v_'+index}
                                          UID={UID} GID={v.GID} GName={v.GName} 
                                          deadline={v.deadline} subject={v.subject} place={v.place} />
                              </Menu.Item>)
                        })}
                      </>)}
                  </Menu>
          
          <div style={{fontSize:"2vw", marginLeft:"2vw", color: "#F0F0F0"}}>近期討論</div>
          <Menu style={{backgroundColor: "#E0E0E0"}} mode="inline" defaultOpenKeys={['recent3']}>
                  {(recent.length < 1)?(<>
                        <div style={{fontSize:"1.5vw", marginTop:"4vw", paddingTop:"2vw",height:"5vw", textAlign:"center", color: '#6C6C6C'}}>
                          目前沒有討論中的群組
                      </div>
                    </>):(<>
                      
                      {recent.map((v, index)=>{
                        // if(index < 3){
                          return(
                              <Menu.Item key={`voting_${index}`} style ={{height:"auto"}}
                                    onClick={(e)=>{handleGroupClick(v.GID)}}>
                                <RecentGroups key={'v_'+index}
                                          UID={UID} GID={v.GID} GName={v.GName} 
                                          deadline={v.deadline} subject={v.subject} place={v.place} />
                              </Menu.Item>)})}</>)}
        </Menu>
        </div>
        </>)}</>)}</>)}
      </Content>
            
      <Footer className="footer">Created by NTUIM | TEAMEET team @2021</Footer>
          </Layout>
        </Layout>
    )
}
export default HomePage;

