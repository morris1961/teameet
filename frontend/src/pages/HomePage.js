import { useEffect, useState } from 'react'
import {Button,Layout, Menu, Breadcrumb,Input, notification } from 'antd';
import {
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  FormOutlined,
  PlusOutlined,
  UsergroupAddOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
// import '../style/Index.css';
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
        console.log(collapsed);
        setCollapsed(collapsed);
    };

    const [iscreateclicked, setIscreateclicked] = useState(false);
    const [isjoinclicked, setIsjoinclicked] = useState(false);
  
    const [code, setCode]=useState("");
    const [GName, setGName]=useState("");
    const [file, setFile]=useState("");

    const handleback = () =>{
      setIscreateclicked(false);
      setIsjoinclicked(false);
    };
    
    const handlecreategroup = () =>{
      setIscreateclicked(true);
      setIsjoinclicked(false);  
    }
    const handlecreate = () =>{
      var data = {admin:UID, GName, file:file};
      sendData('createGroup', data);
    }
    const handlejoingroup = () =>{
      setIscreateclicked(false);
      setIsjoinclicked(true);
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
  
    const handlerenew = () => {
      var data = {UID, UName, password, email};
      var path_renew = {
                    pathname:"/renewProfile",
                    state:{data}};
      history.push(path_renew)
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
          }},[mess])

    return(
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo">
              {collapsed?null:(<img src={logo} width="90%" alt="logo"/>)}
            </div>
            <Menu theme="dark" mode="inline">
              <Menu.Item key="User" icon={<UserOutlined  style={{fontSize: "20px"}}/>} title="User" className="user" >
                <div onClick={handleback}>{UName}</div>
                <BsGear className="index_gear" onClick={handlegear} style={{fontSize:"20px"}}/>
              </Menu.Item>
              {isgearclicked?(<>
                <Menu.Item key="RenewProfile" icon={<FormOutlined />} title="RenewProdile" onClick={handlerenew}>
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
            <Content style={{ margin: '0 16px' }}>
            {iscreateclicked?(<>
                  <div className="title">
                    <p style={{fontSize: "25px", marginBottom: "0px"}}>創建群組</p> 
                  </div>
                  <div className="site-layout-background" style={{ padding: 24, minHeight: 360, display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <div>
                    <div style={{display: "flex"}}>
                      <h3 className='content'> 群組名稱：</h3>
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
                      <h3 className='content'> 資料集連結： </h3>
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
                <div className="homePageContent">
                  <div style={{fontSize:"2vw", marginLeft:"2vw", color: "#F0F0F0"}}>將要討論</div>  
                  <Menu style={{backgroundColor: "#E0E0E0"}} mode="inline" defaultOpenKeys={['recent3']}>
                      {voting.map((v, index)=>{
                        if(index < 3){
                          return(
                              <Menu.Item key={`voting_${index}`} style ={{height:"auto"}}
                                    onClick={(e)=>{handleGroupClick(v.GID)}}>
                                <VotingGroups key={'v_'+index}
                                          UID={UID} GID={v.GID} GName={v.GName} 
                                          deadline={v.deadline} subject={v.subject} place={v.place} />
                              </Menu.Item>)
                        }
                        if(voting.size > 3){
                          <SubMenu key="recent>3" title="其他群組" >
                          {voting.map((v, index)=>{
                          if(index >= 3){
                            return(
                                <Menu.Item key={`voting_${index}`} style ={{height:"auto"}}
                                          onClick={(e)=>{handleGroupClick(v.GID)}}>
                                  <VotingGroups key={'v_'+index}
                                            UID={UID} GID={v.GID} GName={v.GName} 
                                            deadline={v.deadline} subject={v.subject} place={v.place}/>
                                </Menu.Item>)
                              }})}
                          </SubMenu> }
                      })}
                  </Menu>
          
          <div style={{fontSize:"2vw", marginLeft:"2vw", color: "#F0F0F0"}}>近期討論</div>
          <Menu style={{backgroundColor: "#E0E0E0"}} mode="inline" defaultOpenKeys={['recent3']}>
          {recent.map((v, index)=>{
              if(index < 3){
                return(
                    <Menu.Item key={`recent_${index}`} style ={{height:"auto"}}
                          onClick={(e)=>{handleGroupClick(v.GID)}}>
                      <RecentGroups key={'r_'+index}
                                UID={UID} GID={v.GID} GName={v.GName} 
                                time_result={v.time_result} subject={v.subject} place={v.place}/>
                    </Menu.Item>)
              }
              if(recent.size > 3){
              <SubMenu key="recent>3" title="其他群組">
              {recent.map((r, index)=>{
                if(index >= 3)
                {return(
                      <Menu.Item key={`recent_${index}`} style ={{height:"auto"}}
                                 onClick={(e)=>{handleGroupClick(r.GID)}}>
                        <RecentGroups key={'r_'+index}
                                  UID={UID} GID={r.GID} GName={r.GName} 
                                  time_result={r.time_result} subject={r.subject} place={r.place}/>
                      </Menu.Item>)
                    }})}
              </SubMenu> }
            })}
        </Menu>
        </div>
        </>)}</>)}
      </Content>
            
      <Footer className="footer">Created by NTUIM | TEAMEET team @2021</Footer>
          </Layout>
        </Layout>
    )
}
export default HomePage;

