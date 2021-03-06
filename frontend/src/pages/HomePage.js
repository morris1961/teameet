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


const HomePage = ({sendData, mess}) =>{

    const [collapsed, setCollapsed] = useState(false)
    const history = useHistory();
    const location = useLocation();
    var data = location.state.data;
    var {UName, UID, password, email, group, recent, voting} = data;
    
    const [GID, setGID] = useState("");
    const onCollapse = collapsed => {
        // console.log(collapsed);
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
    const handlelogout = () =>{
      var data = {UID};
      sendData('logout', data);
    }
    const handlerenew = () =>{
        var data = {UID:UID, UName:newUName, password:newpassword};
        sendData('renewProfile', data);
        setLoading(true);
      }
    const handleback = () =>{
      setIscreateclicked(false);
      setIsjoinclicked(false);  
      setIsrenewprofileclick(false);
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
          message: '??????',
          description:
            'code????????????',
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

    const handleGroupClick = (gid) =>{
      let data = {UID, GID: gid}
      setGID(gid);
      sendData("group", data)
    }

    useEffect(()=>{
      if(mess.api === "joinGroup"){
        var error_msg = mess.data.error_msg;
        if(error_msg === "The user has been in the group!" ){
          notification['error']({
            message: '??????',
            description:
              '????????????????????????',
            });
        }else if(error_msg === "The code is not valid!"){
          notification['error']({
            message: '??????',
            description:
              '?????????????????? code ????????????',
            });
          }else if(error_msg === "Successed!"){
          notification['success']({
            message: '??????',
            description:
            '?????????????????????, ??????????????????',
            });
            setGID(mess.data.GID);
            let data = {UID, GID:mess.data.GID}
            sendData("group", data)
          }
      }else if(mess.api === "createGroup"){
          if(mess.data.status === false){
            notification['error']({
              message: '??????',
              description:
              '??????????????????????????????, ???????????????????????????????????????',
            });
          }else if(mess.data.status === true){
            notification['success']({
              message: '??????',
              description:
              '????????????, ???????????????????????????',
            });
            setGID(mess.data.GID);
            setGName(mess.data.GName);
            let data = {UID, GID:mess.data.GID};
            sendData("group", data);
          }
        }else if(mess.api === 'group'){
            if(mess.data.status === true){
              var data = mess.data;
              data.UName = UName
              // console.log(UID)
              data.UID = UID
              data.password=password
              data.email=email
              data.group=group
              data.voting=voting 
              data.recent=recent
              // console.log("data in homepage push to group", data)
                var path = {
                  pathname:`/${UID}/${GID}`,
                  state:{data},
                }
              history.push(path);
            }
            else{
              notification['error']({
                message: '??????',
                description:
                '??????????????????????????????, ???????????????????????????????????????',
              });

            }
            
          }else if(mess.api === 'message'){
            if(mess.data.status === true){
              notification['info']({
                message: '??????',
                description:
                `?????? ${mess.data.GName} ???????????????${mess.data.sender} ??????${mess.data.body}???`,
              });
            }
          }else if(mess.api === "renewProfile"){
            if(mess.data.status === true){
              var data ={UID: UID}
              sendData('index', data);
              notification['success']({
              message: '?????????',
              description:
              '??????????????????????????????',
              duration:7,
            });
            
          }else{
            notification['error']({
              message: '????????????',
              description:
              '??????????????????, ????????????????????????',
            });
          }
        }else if(mess.api === "index"){
            setIsrenewprofileclick(false);
            setLoading(false);
            var data = mess.data;
            data.UID=UID;
            data.email=email;
            data.password=password;
            // console.log("data in index push", data)
              var path = {
                pathname:"/index",
                state:{data},
              }
              history.push(path);
              
        }else if(mess.api === "logout"){
          if(mess.data.status === true){
            notification['success']({
              message: '????????????',
              description:
              '???????????????byebye???',
            });
            history.push('/')
          }else{
            notification['error']({
              message: '????????????',
              description:
              '??????????????????, ??????????????????????????????',
            });

          }
        }
        },[mess])

    return(
        <Layout  style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo">
              {collapsed?null:(<img src={logo} width="90%" alt="logo"/>)}
            </div>
            <Menu theme="dark" mode="inline">
              <Menu.Item key="User" icon={<UserOutlined  style={{fontSize: "20px"}}/>} title="User" className='user'>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                  <div onClick={handleback}>{UName}</div>
                  <BsGear onClick={handlegear} />
                </div>
              </Menu.Item>
              {isgearclicked?(<>
                <Menu.Item key="RenewProfile" icon={<FormOutlined />} title="RenewProdile" onClick={handlerenewprofile}>
                    ??????????????????
                </Menu.Item>
                <Menu.Item key="logout" icon={<LogoutOutlined />} title="Logout" onClick={handlelogout}>
                    ??????
                </Menu.Item>
                <Menu.Item key="Back" icon={<RollbackOutlined />} title="??????" onClick={handlegear}>
                    ??????
                </Menu.Item>
                </>
                ):(
                <>
                <Menu.Item key="create" icon={<PlusOutlined />} title="????????????"  onClick={handlecreategroup}>
                    ????????????
                </Menu.Item>

                <Menu.Item key="join" icon={<UsergroupAddOutlined />} title="????????????"  onClick={handlejoingroup}>
                    ????????????
                </Menu.Item>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="??????">
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
                    <p style={{fontSize: "25px", marginBottom: "0px"}}>??????????????????</p> 
              </div>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360, display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div>
                    <div style={{display: "flex"}}>
                      <h2 className='content'> ?????????{email}</h2>
                    </div>
                    <div style={{display: "flex", marginTop: "5%"}}>
                      <h2 className='content'> ????????? </h2>
                      <div>
                          <Input 
                          className="create_searchbox"
                          placeholder={UName}
                          onChange={(event)=>setUName(()=>event.target.value)}
                          />
                      </div>
                    </div>
                    <div style={{display: "flex", marginTop: "5%"}}>
                      <h2 className='content'> ????????? </h2>
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
                      ??????
                    </Button>
                  </div>            
            
            </>):(<>{iscreateclicked?(<>
                  <div className="title">
                    <p style={{fontSize: "25px", marginBottom: "0px"}}>????????????</p> 
                  </div>
                  <div className="site-layout-background" style={{ padding: 24, minHeight: 360, display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div>
                    <div style={{display: "flex"}}>
                      <h2 className='content'> ???????????????</h2>
                      <div>
                          <Input 
                          className="create_searchbox"
                          placeholder="????????? ????????????"
                          onChange={(event)=>setGName(()=>event.target.value)}
                          value={GName}
                        />
                      </div>
                    </div>
                    <div style={{display: "flex", marginTop: "5%"}}>
                      <h2 className='content'> ?????????????????? </h2>
                      <div>
                          <Input 
                          className="create_searchbox"
                          placeholder="????????? ???????????????"
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
                      ??????
                    </Button>
                  </div>
                  </>):(<>
          {isjoinclicked?(<>
                <div className="title">
                  <p style={{fontSize: "25px", marginBottom: "0px"}}>????????????</p> 
                </div>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360, display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <h2 className='content'> ???????????????</h2>
                  <div className="create_GName-input" >
                      <Input 
                      prefix="#"
                      className="create_searchbox"
                      placeholder="?????????????????????"
                      onChange={(event)=>setCode(()=>event.target.value)}
                      value={code}/>
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "flex-end", marginRight: "5%"}}>
                  <Button 
                      type="primary"
                      onClick = {handlejoin}>
                    ??????
                  </Button>
                </div></>):(<>
                <div className="homePageContent">
                  <div style={{fontSize:"2vw", marginLeft:"2vw", color: "#F0F0F0"}}>?????????</div>  
                  <Menu style={{backgroundColor: "#E0E0E0"}} mode="inline" defaultOpenKeys={['recent3']}>
                      {(voting.length < 1)?(<>
                        <div style={{fontSize:"1.5vw", marginTop:"4vw", paddingTop:"2vw",height:"5vw", textAlign:"center", color: '#6C6C6C'}}>
                          ??????????????????????????????
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
          
          <div style={{fontSize:"2vw", marginLeft:"2vw", color: "#F0F0F0"}}>????????????</div>
          <Menu style={{backgroundColor: "#E0E0E0"}} mode="inline" defaultOpenKeys={['recent3']}>
                  {(recent.length < 1)?(<>
                        <div style={{fontSize:"1.5vw", marginTop:"4vw", paddingTop:"2vw",height:"5vw", textAlign:"center", color: '#6C6C6C'}}>
                          ?????????????????????????????????
                      </div>
                    </>):(<>
                      {recent.map((v, index)=>{
                          return(
                              <Menu.Item key={`recent_${index}`} style ={{height:"auto"}}
                                    onClick={()=>{handleGroupClick(v.GID)}}>
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

