import { useEffect, useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useParams } from "react-router-dom";
import useData from "../client"

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const HomePage = () =>{
    const { UID } = useParams();
    const { UName, group, sendData } = useData();
    const [collapsed, setCollapsed] = useState(false)
    const [activeKey, setActiveKey] = useState("")
    const [init, setInit] = useState(false)

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };

    // initialize
    useEffect(()=>{
      let data = {UID}
      sendData("index", data)
      // console.log(UName, group)
    }, [])

    useEffect(()=>{

      if(activeKey.search("group_") !== -1){
        let id = activeKey.indexOf('_') + 1
        let GID = activeKey.slice(id) 
        let data = {UID:UID, GID:GID}
        sendData("group", data)
        window.location.href = `/${UID}/${GID}`
      }
    })

    return(
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<UserOutlined />} title="User" style={{height: "60px"}}>
                {UName}
              </Menu.Item>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="群組">
                {/* {group.map((g, index)=>{
                  <Menu.Item key={`group_${g.GID}`} onClick={(e)=>{setActiveKey(e.key)}}>{g.GName}</Menu.Item> 
                })} */}
              </SubMenu>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>使用者</Breadcrumb.Item>
                <Breadcrumb.Item>{UName}</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                Hello.
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
    )
}
export default HomePage;

