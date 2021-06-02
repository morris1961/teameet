import {useEffect, useState} from 'react'
import ChatModal from '../Components/ChatModal'
import DiscussionSet from './DiscussionSet'
import DiscussionPage from './DiscussionPage'
import useData from '../client'
///// antd /////
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  WechatOutlined,
  SmileOutlined,
} from '@ant-design/icons';
///// react-router-dom /////
import { useParams } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const GroupPage = () =>{
    const { UID, GID } = useParams();
    const { UName, code, content, GName, isAdmin, file, discussion} = useData();
    const { sendData } = useData();
    const [URL, setURL] = useState(file)
    const [collapsed, setCollapsed] = useState(false)
    const [activeKey, setActiveKey] = useState('ChatRoom')
    const [modalVisible, setModalVisible] = useState(false)
    // const [discussions, setDiscussions] = useState([{name:"經原"},{name:"統計"},{name: "web"}])
    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };
    const handleNewURL = (e) =>{
        console.log()
        setActiveKey("renewURL")
        let data = {GID, file: URL}
        sendData("renewFile", data)
    }

    useEffect(()=>{
        /// initialize
        let data = {UID, GID:"60b48f1be8948421c0f3b358"} // 等 GID 調好要改
        sendData("group", data)
        
        if(activeKey === 'renewURL'){
            setModalVisible(true)
        }
        else if(activeKey.search("Discussions_") !== -1){
          let id = activeKey.indexOf('_') + 1
          let DID = activeKey.slice(id)
          window.location.href = `/${UID}/${GID}/${DID}`
        }
          
    })

    return(
      <>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="User" icon={<UserOutlined />} title="User" style={{height: "60px"}}>
                {UName}
              </Menu.Item>
              <Menu.Item key="ChatRoom" icon={<WechatOutlined />} title="ChatRoom">
                聊天室
              </Menu.Item>
              <SubMenu key="File" icon={<FileOutlined />} title="資料集錦">
                <Menu.Item key="gotoURL" onClick={(e)=>{window.open(URL)}}>前往連結</Menu.Item>
                <Menu.Item key="renewURL" onClick={handleNewURL}>更新連結</Menu.Item>
              </SubMenu>

              <ChatModal 
                visible={modalVisible}
                onCreate={({url})=>{
                    setActiveKey("")
                    setModalVisible(false) 
                    setURL(url)
                }}
                onCancel={()=>{
                    setActiveKey("")
                    setModalVisible(false)
                }}/>

              <Menu.Item key="Discussion" icon={<SmileOutlined />} title="Discussion" onClick={(e)=>{setActiveKey("Discussion")}}>
                來約討論
              </Menu.Item>
              <SubMenu key="Discussions" icon={<TeamOutlined />} title="討論">
                {discussion.map((d, index)=>{
                  return(
                    <Menu.Item key={`Discussions_${d.DID}`} onClick={(e)=>{setActiveKey(e.key)}}>{d.subject}</Menu.Item>
                  )
                })}
              </SubMenu>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>{UName}</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {activeKey === "Discussion"?(<DiscussionSet />):(null)}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </>
    )
}
export default GroupPage;