import { useEffect, useState } from 'react'
import URLModal from '../Components/Modal/URLModal'
import DiscussionSet from './DiscussionSet'
import ChatRoom from '../Components/ChatRoom'
import logo from '../image/logo.png';
///// react-router-dom /////
import { useParams, useHistory, useLocation } from "react-router-dom";
///// antd /////
import { Layout, Menu, Popconfirm, notification } from 'antd';
import {
  FileOutlined,
  BarsOutlined,
  UserOutlined,
  WechatOutlined,
  SmileOutlined,
  RollbackOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;




const GroupPage = ({discussions, file, sendData, message}) =>{

    const { UID, GID } = useParams();
    const [collapsed, setCollapsed] = useState(false)
    const [activeKey, setActiveKey] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const history = useHistory();
    const location = useLocation();


    // sider 隱藏
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    const renewURL = (url)=>{
      let data = {GID, file:url}
      sendData("renewFile", data)
    }
    
    // GroupPage default render chatRoom
    useEffect(()=>{
      let data = {UID, GID}  
      sendData("chat", data)
    }, [])

    useEffect(()=>{
      // 進討論頁面
      if(message.api === 'discussion'){
        // 跟討論有關 data (content, subject, DID) 從回傳 message 取，其他從 location.state.data
        let data = {
          UName:location.state.data.UName, 
          GName: location.state.data.GName, 
          email: location.state.data.email,
          password: location.state.data.password,
          code: location.state.data.code,
          subject: message.data.subject, 
          content: message.data.content,
          isAdmin: message.data.isAdmin,
        }
        // console.log(UID)
        history.push({pathname:`/${UID}/${GID}/${message.data.DID}`, state:{data}});
      }
      else if(message.api === 'chat'){
        setActiveKey("ChatRoom")
      }
      else if(message.api === 'renewFile'){
        if(message.data.status === true){
          notification['success']({
            message: '成功',
            description:
            "資料集連結已成功更新！",
          });
        }
        else{
          notification['error']({
            message: '失敗',
            description:
            "資料集連結更新失敗！",
          });
        }
      }
      else if(message.api === 'index'){
        var { email, password } =  location.state.data;
        var data = message.data;
        data.UID=UID;
        data.email=email;
        data.password=password;
        // console.log("data in index push", data)
          var path = {
            pathname:"/index",
            state:{data},
          }
          history.push(path);
      }
      else if(message.api === 'leaveGroup'){
        let { status } = message.data
        if(status){
          let data = {UID}
          sendData('index', data)
          notification['success']({
            message: '成功',
            description:
            "退出群組成功",
          });
        }
        else{
          notification['error']({
            message: '失敗',
            description:
            "退出群組失敗",
          });
        }
      }
      else if(message.api === 'message'){
        if(GID !== message.data.GID || activeKey !== 'ChatRoom'){
          notification['info']({
            message: '通知',
            description:
            `您在 ${message.data.GName} 有新訊息（${message.data.sender} 說：${message.data.body}）`,
          });
        }
      }
    }, [message])

    


    const handleDiscussionClick = (DID) =>{
      /// get data for DiscussionPage
      let data = {UID, DID}
      sendData("discussion", data)
    }

    const handleBack = () =>{
      var data ={UID}
      sendData('index', data);
    }

    const handleChatRoom = () =>{
      let data = {UID, GID}
      sendData('chat', data)
    }

    const handleWithdraw = () =>{
      let data = {UID, GID}
      sendData('leaveGroup', data)
    }

    return(
      <>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo">
              {collapsed?null:(<img src={logo} width="90%" alt="logo"/>)}
            </div>
            <Menu theme="dark" defaultSelectedKeys={['ChatRoom']} mode="inline">
              <Menu.Item key="User" icon={<UserOutlined style={{fontSize: "20px"}} />} title={location.state.data.Name} className="user" onClick={()=>{handleBack()}}>
                {location.state.data.UName}
              </Menu.Item>
              <Menu.Item key="ChatRoom" icon={<WechatOutlined />} title="聊天室" onClick={()=>{handleChatRoom()}}>
                聊天室
              </Menu.Item>
              <SubMenu key="File" icon={<FileOutlined />} title="資料集連結">
                <Menu.Item 
                key="gotoURL" 
                onClick={()=>{
                  {file.length === 0?
                    (
                      notification['error']({
                        message: '失敗',
                        description:
                        '群組尚無資料集連結，可按更新連結新增',
                      }))
                    :(window.open(file))}}}>前往連結</Menu.Item>
                <Menu.Item key="renewURL" onClick={()=>{setModalVisible(true)}}>更新連結</Menu.Item>
              </SubMenu>

              <URLModal 
                visible={modalVisible}
                onCreate={({url})=>{
                    setModalVisible(false) 
                    renewURL(url)
                }}
                onCancel={()=>{
                    setModalVisible(false)
                }}/>

              <Menu.Item key="Discussion" icon={<SmileOutlined />} title="來約討論" onClick={(e)=>{setActiveKey("Discussion")}}>
                來約討論
              </Menu.Item>
              <SubMenu key="Discussions" icon={<BarsOutlined />} title="討論">
                {discussions.map((d)=>{
                  return(
                    <Menu.Item key={`Discussions_${d.DID}`} onClick={(e)=>{handleDiscussionClick(d.DID);}}>{d.subject}</Menu.Item>
                  )
                })}
              </SubMenu>
              <Menu.Item key="LeaveGroup" icon={<UserDeleteOutlined />} title="退出群組" >
                <Popconfirm 
                title="確定要退出嗎？" 
                okText="Yes" 
                cancelText="No"
                onConfirm={handleWithdraw}
                >
                  <a href="#">退出群組</a>
                </Popconfirm>
              </Menu.Item>
              <Menu.Item key="Back" icon={<RollbackOutlined />} title="回上一頁" onClick={(e)=>{handleBack()}}>
                回上一頁
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }} >
                <div className="title">
                  <p style={{fontSize: "25px", marginBottom: "0px"}}>{location.state.data.GName}</p> 
                  <p style={{marginBottom: "0px"}}>{location.state.data.code}</p>
                </div>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360}}>
                  {activeKey === "ChatRoom"? (<ChatRoom UName={location.state.data.UName} message={message} sendData={sendData} UID={UID} GID={GID} />):(activeKey === "Discussion"?(<DiscussionSet UID={UID} GID={GID} sendData={sendData}  message={message}/>):(null))}
                </div>
            </Content>
            <Footer className="footer">Created by NTUIM | TEAMEET team @2021</Footer>
          </Layout>
        </Layout>
      </>
    )
}
export default GroupPage;