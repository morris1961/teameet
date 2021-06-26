import { useEffect, useState } from 'react'
import { Layout, Menu, Breadcrumb, BackTop } from 'antd';
import DiscussionContent from '../Components/DiscussionContent'
import DiscussionTime from '../Components/TimeRelated/DiscussionTime'
import DiscussionPlace from '../Components/PlaceRelated/DiscussionPlace'
import logo from '../image/logo.png';
import {
  UserOutlined,
  FieldTimeOutlined,
  BookOutlined,
  HomeOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import { useParams, useHistory, useLocation } from "react-router-dom";


const { Content, Footer, Sider } = Layout;


const DiscussionPage = ({isDue, isSelectTime, isSelectPlace, time_options,  place_options, time_voted, place_voted, time_result, place_result, displayStatus, sendData, message}) =>{
    const { UID, GID, DID } = useParams();
    const [collapsed, setCollapsed] = useState(false)
    const [activeKey, setActiveKey] = useState('content')
    const history = useHistory()
    const location = useLocation()

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    // 回上一頁
    const back = () =>{
      console.log("back")
      let data = {
        UName:location.state.data.UName, 
        file: location.state.data.file, 
        GName: location.state.data.GName,
        code: location.state.data.code,}
      history.push({pathname:`/${UID}/${GID}`, state:{data}});
    }

    //按 logo 回首頁
    const backToIndex = ()=>{
      // let data1 = location.state.data;
      // var data = data1.postdata;
      // var path = {
      //   pathname:"/index",
      //   state:{data},
      // }
      // console.log("pushback", data)
      // history.push(path);
      
    }

    /// get data for DiscussionTime
    const handleClick_time = () =>{
      let data = {UID, DID}  
      sendData("time", data)  
    }

    /// get data for DiscussionPlace
    const handleClick_place = () =>{
      let data = {UID, DID}  
      sendData("place", data)
    }

    // setKey & render
    useEffect(()=>{
        if(message.api === 'time' || message.api === 'place'){
          setActiveKey(message.api)
        }
    }, [message])


    return(
        
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo">
              {collapsed?null:(<img src={logo} width="90%" alt="logo"/>)}
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="User" icon={<UserOutlined style={{fontSize: "20px"}} />} title="User" className='user' style={{height: "60px"}} onClick={backToIndex()}>
                {location.state.data.UName}
              </Menu.Item>
              <Menu.Item key="content" icon={<BookOutlined />} title="內容" onClick={(e)=>{setActiveKey(e.key)}}>
                討論內容
              </Menu.Item>
              <Menu.Item key="time" icon={<FieldTimeOutlined />} title="時間" onClick={()=>{handleClick_time()}}>
                討論時間
              </Menu.Item>
              <Menu.Item key="place" icon={<HomeOutlined />} title="地點" onClick={()=>{handleClick_place()}}>
                討論地點
              </Menu.Item>
              <Menu.Item key="Back" icon={<RollbackOutlined />} title="回上一頁" onClick={()=>{back()}}>
                回上一頁
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
              <div className="title">
                <p style={{fontSize: "25px", marginBottom: "0px"}}>{location.state.data.subject}</p> 
              </div>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {activeKey === "content"?(<DiscussionContent subject={location.state.data.subject} content={location.state.data.content}/>):
                (activeKey === "time"?(
                <DiscussionTime 
                voted={time_voted} 
                isDue={isDue} 
                isAdmin={location.state.data.isAdmin} 
                time_options={time_options}
                time_result={time_result}
                isSelect={isSelectTime} 
                sendData={sendData} 
                displayStatus={displayStatus}
                />):(
                <DiscussionPlace 
                voted={place_voted} 
                isDue={isDue} 
                isAdmin={location.state.data.isAdmin} 
                place_options={place_options}
                place_result={place_result}
                isSelect={isSelectPlace} 
                sendData={sendData} 
                displayStatus={displayStatus}
                 />))}
              </div>
            </Content>
            <Footer className="footer">Created by NTUIM | TEAMEET team @2021</Footer>
          </Layout>
        </Layout>
    )
}
export default DiscussionPage;