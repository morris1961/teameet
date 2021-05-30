import {useState} from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const HomePage = ({user}) =>{
    const [collapsed, setCollapsed] = useState(false)
    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };

    return(
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<UserOutlined />} title="User" style={{height: "60px"}}>
                {user}
              </Menu.Item>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                <Menu.Item key="2">Team 1</Menu.Item>
                <Menu.Item key="3">Team 2</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
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

