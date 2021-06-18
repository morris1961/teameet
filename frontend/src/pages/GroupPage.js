import {useEffect, useState} from 'react'
import ChatModal from '../Components/ChatModal'
import DiscussionSet from './DiscussionSet'
import DiscussionPage from './DiscussionPage'
///// antd /////
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  WechatOutlined,
  SmileOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
///// react-router-dom /////
import { useParams, useHistory, useLocation } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const GroupPage = ({UName, code, GName, isAdmin, file, discussions, sendData, displayStatus}) =>{
    const { UID, GID } = useParams();
    const [collapsed, setCollapsed] = useState(false)
    const [activeKey, setActiveKey] = useState('ChatRoom')
    const [modalVisible, setModalVisible] = useState(false)
    const history = useHistory();
    const location = useLocation();
    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };

    const renewURL = (url)=>{
      let data = {GID, file:url}
      sendData("renewFile", data)
    }
    
    useEffect(()=>{
      let data = {UID, GID}  
      sendData("group", data)
      
    }, [])

    useEffect(()=>{

        if(activeKey.search("Discussions_") !== -1){
          let id = activeKey.indexOf('_') + 1
          let DID = activeKey.slice(id)
          history.push({pathname:`/${UID}/${GID}/${DID}`, state:{UName:location.state.UName, GName}});
          // window.location.href = `/${UID}/${GID}/${DID}`
        }
        if(activeKey === 'Back'){
          history.push({pathname:`/${UID}`});
        }
          
    })

    return(
      <>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="User" icon={<UserOutlined />} title="User" style={{height: "60px"}}>
                {location.state.UName}
              </Menu.Item>
              <Menu.Item key="ChatRoom" icon={<WechatOutlined />} title="ChatRoom">
                聊天室
              </Menu.Item>
              <SubMenu key="File" icon={<FileOutlined />} title="資料集錦">
                <Menu.Item key="gotoURL" onClick={(e)=>{window.open(file)}}>前往連結</Menu.Item>
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

              <Menu.Item key="Discussion" icon={<SmileOutlined />} title="Discussion" onClick={(e)=>{setActiveKey("Discussion")}}>
                來約討論
              </Menu.Item>
              <SubMenu key="Discussions" icon={<TeamOutlined />} title="討論">
                {discussions.map((d, index)=>{
                  return(
                    <Menu.Item key={`Discussions_${d.DID}`} onClick={(e)=>{setActiveKey(e.key);}}>{d.subject}</Menu.Item>
                  )
                })}
              </SubMenu>
              <Menu.Item key="Back" icon={<RollbackOutlined />} title="回上一頁" onClick={(e)=>{setActiveKey("Back")}}>
                回上一頁
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>群組</Breadcrumb.Item>
                <Breadcrumb.Item>{GName}</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {activeKey === "Discussion"?(<DiscussionSet UID={UID} GID={GID} sendData={sendData} displayStatus={displayStatus} />):(null)}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </>
    )
}
export default GroupPage;