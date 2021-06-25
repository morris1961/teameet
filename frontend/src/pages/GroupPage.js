import { useEffect, useState } from 'react'
import ChatModal from '../Components/Modal/URLModal'
import DiscussionSet from './DiscussionSet'
import ChatRoom from '../Components/ChatRoom'
///// react-router-dom /////
import { useParams, useHistory, useLocation } from "react-router-dom";
///// antd /////
import { Layout, Menu, Breadcrumb, Row, Col } from 'antd';
import {
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  WechatOutlined,
  SmileOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;




const GroupPage = ({discussions, sendData, displayStatus, message, messages}) =>{

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
          file:location.state.data.file, 
          GName: location.state.data.GName, 
          subject: message.data.subject, 
          content: message.data.content,
          isAdmin: message.data.isAdmin,
        }
        history.push({pathname:`/${UID}/${GID}/${message.data.DID}`, state:{data}});
      }
      else if(message.api === 'chat'){
        setActiveKey("ChatRoom")
      }
      else if(message.api === 'renewFile'){
        if(message.data.status === true){
          displayStatus({type: 'success', msg: '資料集連結已成功更新！'})
        }
        else{
          displayStatus({type: 'error', msg: '資料集連結更新失敗'})
        }
      }
      else if(message.api === 'index'){
        var {UID, email, password} =  location.state.data;
        var data = message.data;
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

    return(
      <>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="User" icon={<UserOutlined />} title="User" style={{height: "60px"}} onClick={()=>{handleBack()}}>
                {location.state.data.UName}
              </Menu.Item>
              <Menu.Item key="ChatRoom" icon={<WechatOutlined />} title="聊天室" onClick={()=>{handleChatRoom()}}>
                聊天室
              </Menu.Item>
              <SubMenu key="File" icon={<FileOutlined />} title="資料集連結">
                <Menu.Item key="gotoURL" onClick={(e)=>{window.open(location.state.data.file)}}>前往連結</Menu.Item>
                <Menu.Item key="renewURL" onClick={()=>{setModalVisible(true)}}>更新連結</Menu.Item>
              </SubMenu>

              <ChatModal 
                visible={modalVisible}
                onCreate={({url})=>{
                    setActiveKey("")
                    setModalVisible(false) 
                    renewURL(url)
                }}
                onCancel={()=>{
                    setActiveKey("")
                    setModalVisible(false)
                }}/>

              <Menu.Item key="Discussion" icon={<SmileOutlined />} title="來約討論" onClick={(e)=>{setActiveKey("Discussion")}}>
                來約討論
              </Menu.Item>
              <SubMenu key="Discussions" icon={<TeamOutlined />} title="討論">
                {discussions.map((d)=>{
                  return(
                    <Menu.Item key={`Discussions_${d.DID}`} onClick={(e)=>{handleDiscussionClick(d.DID);}}>{d.subject}</Menu.Item>
                  )
                })}
              </SubMenu>
              <Menu.Item key="Back" icon={<RollbackOutlined />} title="回上一頁" onClick={(e)=>{handleBack()}}>
                回上一頁
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>群組</Breadcrumb.Item>
                <Breadcrumb.Item>{location.state.data.GName}</Breadcrumb.Item>
              </Breadcrumb>
              <Row>
                <Col span={4}></Col>
                <Col span={16}>
                  <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    {activeKey === "ChatRoom"? (<ChatRoom UName={location.state.data.UName} displayStatus={displayStatus} messages={messages} sendData={sendData} UID={UID} GID={GID} />):(activeKey === "Discussion"?(<DiscussionSet UID={UID} GID={GID} sendData={sendData} displayStatus={displayStatus} />):(null))}
                  </div>
                </Col>
                <Col span={4}></Col>
              </Row>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </>
    )
}
export default GroupPage;