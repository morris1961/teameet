import {useEffect, useState} from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useParams } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const HomePage = () =>{
    const { user } = useParams();
    const [collapsed, setCollapsed] = useState(false)
    const [activeKey, setActiveKey] = useState("")

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };

    useEffect(()=>{
      if(activeKey.search("group_") !== -1){
        let id = activeKey.indexOf('_') + 1
        let GID = activeKey.slice(id)
        window.location.href = `/${user}/${GID}`
      }
    })

    return(
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<UserOutlined />} title="User" style={{height: "60px"}}>
                {user}
              </Menu.Item>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="群組">
                <Menu.Item key="group_1" onClick={(e)=>{setActiveKey("group_1")}}>群組 1</Menu.Item>
                <Menu.Item key="group_2">群組 2</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>使用者</Breadcrumb.Item>
                <Breadcrumb.Item>{user}</Breadcrumb.Item>
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

