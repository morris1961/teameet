import {useEffect, useState} from 'react'
import { Layout, Menu, Breadcrumb, BackTop } from 'antd';
import DiscussionContent from '../Components/DiscussionContent'
import DiscussionTime from '../Components/DiscussionTime'
import DiscussionPlace from '../Components/DiscussionPlace'
import {
  UserOutlined,
  WechatOutlined,
  FieldTimeOutlined,
  BookOutlined,
  HomeOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { useParams, useHistory, useLocation } from "react-router-dom";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const DiscussionPage = ({UName, DName, GName, isAdmin, subject, content, sendData, time_options, isDue, time_voted, place_voted, place_options, isSelectTime, isSelectPlace, displayStatus, time_result, place_result}) =>{
    const { UID, GID, DID } = useParams();
    const [collapsed, setCollapsed] = useState(false)
    const [activeKey, setActiveKey] = useState('content')
    const history = useHistory()
    const location = useLocation()

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed);
    };
    
    useEffect(()=>{
      let data = {UID, DID}  
      sendData("discussion", data)
    }, [])

    const back = () =>{
      history.push({pathname:`/${UID}/${GID}`, state:{UName:location.state.UName}});
    }


    return(
        
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="User" icon={<UserOutlined />} title="User" style={{height: "60px"}}>
                {location.state.UName}
              </Menu.Item>
              <Menu.Item key="content" icon={<BookOutlined />} title="內容" onClick={(e)=>{setActiveKey(e.key)}}>
                討論內容
              </Menu.Item>
              <Menu.Item key="time" icon={<FieldTimeOutlined />} title="時間" onClick={(e)=>{setActiveKey(e.key)}}>
                討論時間
              </Menu.Item>
              <Menu.Item key="place" icon={<HomeOutlined />} title="地點" onClick={(e)=>{setActiveKey(e.key)}}>
                討論地點
              </Menu.Item>
              <Menu.Item key="Back" icon={<RollbackOutlined />} title="回上一頁" onClick={(e)=>{setActiveKey(e.key); back();}}>
                回上一頁
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>群組</Breadcrumb.Item>
                <Breadcrumb.Item>{location.state.GName}</Breadcrumb.Item>
                <Breadcrumb.Item>討論</Breadcrumb.Item>
                <Breadcrumb.Item>{subject}</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {activeKey === "content"?(<DiscussionContent subject={subject} content={content}/>):
                (activeKey === "time"?(
                <DiscussionTime 
                voted={time_voted} 
                time_options={time_options} 
                isDue={isDue} 
                isAdmin={isAdmin} 
                sendData={sendData} 
                isSelect={isSelectTime} 
                displayStatus={displayStatus}
                time_result={time_result}/>):(
                <DiscussionPlace 
                voted={place_voted} 
                place_options={place_options}
                isDue={isDue} 
                isAdmin={isAdmin} 
                sendData={sendData} 
                isSelect={isSelectPlace} 
                displayStatus={displayStatus}
                place_result={place_result} />))}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
    )
}
export default DiscussionPage;