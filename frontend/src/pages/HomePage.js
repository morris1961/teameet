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
import '../style/Index.css';
import { useParams, useHistory, useLocation } from "react-router-dom";
import  {BsGear}  from "react-icons/bs";
import VotingGroups from "../Components/VotingGroups";
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import RecentGroups from "../Components/RecentGroups";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const HomePage = ({sendData, mess}) =>{

    const [collapsed, setCollapsed] = useState(false)
    const [activeKey, setActiveKey] = useState("")
    const history = useHistory();
    const location = useLocation();
    var data = location.state.data;
    // console.log("data in homepage", location.state)
    var {UName, postdata, group, recent, voting, email, password} = data;
    var {UID, password, email} = postdata;
    // console.log("indexxx",data)
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
    const [click_join, setClick_join]=useState(false);
    const [click_create, setClick_create]=useState(false);

    // initialize
    // useEffect(()=>{
    //   let data = {UID}
    //   sendData("index", data)
    // }, [])
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
      setClick_join(true);  
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

    //history.push({pathname:`/${UID}/${GID}`, state:{UName, password, email}});
    const handleGroupClick = (GID) =>{
      let data = {UID, GID}
      setGID(GID);
      sendData("group", data)

    }

    useEffect(()=>{
      if(mess.api === "index"){
          console.log("index", mess)
        // console.log("error_msg", message.error_msg)
        // var error_msg = message.error_msg;
        // if(error_msg === "The user has been in the group!" ){
        //   notification['error']({
        //     message: '錯誤',
        //     description:
        //       '你已經在該群組內',
        //     });
        //     setClick_join(false);
        // }else if(error_msg === "The code is not valid!"){
        //   notification['error']({
        //     message: '錯誤',
        //     description:
        //       '請再確認一次 code 是否正確',
        //     });
        //     setClick_join(false);
        //   }
        // else if(error_msg === "Successed!"){
        //   notification['success']({
        //     message: '成功',
        //     description:
        //     '成功加入該群組, 為你跳轉頁面',
        //   });
          // var path_group = {
          //   pathname:`/${UID}/${GID}`,
          //   state:{UName},
          // }
          // setTimeout(history.push(path_group), 2000 )
        
     }
    // else if(click_create === true){
    //   if(message.status === false){
    //         notification['error']({
    //           message: '錯誤',
    //           description:
    //           '請稍後再重新登入一次, 並請你確認你的網路連接正常',
    //         });
    //         setClick_create(false);
    //       }else if(message.status === true){
    //         notification['success']({
    //           message: '成功',
    //           description:
    //           '創建成功, 為你跳轉至群組畫面',
    //         });
    //         setGID(message.GID);
    //         setGName(message.GName);
    //         var path_creategroup = {
    //           pathname:`/${UID}/${GID}`,
    //           state:{UName},
    //         }
    //         // setTimeout(history.push(path_creategroup), 2000 )
    //         setClick_create(false);

    else if(mess.api === 'group'){
      // var GID = GID;
      // console.log("GID", {GID})
      var data = mess.data;
      data.UName = UName
      data.postdata = {UName, postdata, group, recent, voting, email, password};
      // console.log(data)
      console.log("data in hp push", data)
        var path = {
          pathname:`/${UID}/${GID}`,
          state:{data},
        }
        // history.push(path);
        history.push(path);
    }
    },[mess])

    return(
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<UserOutlined />} title="User" style={{height: "60px"}} >
                <div onClick={handleback} style={{float:"left"}}>{UName}</div>
                <BsGear className="index_gear" onClick={handlegear} style={{fontSize:"1.5vw",marginTop:"0.5vw"}}/>
              </Menu.Item>
              {isgearclicked?(<>
                <Menu.Item key="RenewProfile" icon={<FormOutlined />} title="RenewProdile" onClick={handlerenew}>
                    更新個人資料
                </Menu.Item>
                <Menu.Item key="logout" icon={<LogoutOutlined />} title="Logout" onClick={()=>{history.push('/')}}>
                    登出
                </Menu.Item>
                <Menu.Item key="Back" icon={<RollbackOutlined />} title="回上一頁" onClick={handlegear}>
                    回上一頁
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
            {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>使用者</Breadcrumb.Item>
                <Breadcrumb.Item>{UName}</Breadcrumb.Item>
              </Breadcrumb>
              <If condition={iscreateclicked}>
        <Then>
        <Content>
          <div style={{fontSize:"2vw", marginLeft:"2vw", height:"30vw"}}>
              創建群組
          </div>
        
        {/* <Content style={{paddingLeft:"1.2vw",backgroundColor:"white"}} > */}
        <div className="create_GName" >
          <div className="create_GName-title" > 群組名稱: </div>
          <div className="create_GName-input" >
              <Input 
              className="create_searchbox"
              placeholder="請輸入 群組名稱"
              onChange={(event)=>setGName(()=>event.target.value)}
              value={GName}
            />
            </div>
        </div>

        <div className="create_datalink" >
          <div className="create_datalink-title" > 資料集連結: </div>
          <div className="create_datalink-input" >
              <Input 
              className="create_searchbox"
              placeholder="請輸入 資料集連結"
              onChange={(event)=>setFile(()=>event.target.value)}
              value={file}
            />
            </div>
        </div>

        <div className="create_create">
        <Button
            className="create_create-button"
            onClick = {handlecreate}>
          創建
        </Button>
         </div>
          </Content>
        </Then>
         {/* click joinGroup */}
        <ElseIf condition={isjoinclicked}>
        <Content >
            <div style={{fontSize:"2vw", marginLeft:"2vw"}}>
                加入群組
            </div>

        
        <div style={{marginTop:"4vw"}} >
          <div style={{marginLeft:"25vw",height:"4.2vw",marginRight:"0.5vw",float:"left", textAlign:"left",fontSize:"2vw"}} > code: </div>
          <div className="create_GName-input" >
              <Input 
              prefix="#"
              className="create_searchbox"
              placeholder="請輸入 code"
              onChange={(event)=>setCode(()=>event.target.value)}
              value={code}
            />
            </div>
        </div>

        <div className="create_create">
        <Button
            className="create_create-button"
            onClick = {handlejoin}>
          加入
        </Button>
         </div>
          </Content>
        </ElseIf>
         {/* index */}
        <Else>
        <Header style={{backgroundColor:"white"}}>
            <div style={{fontSize:"2vw", marginLeft:"-2vw"}}>
                近期討論
            </div>
        </Header>
        <Content style={{paddingLeft:"1.2vw",backgroundColor:"white"}} >
            
            {/* {recent.map((v, i)=><RecentGroups key={'r_'+i}
                                      UID={UID} GID={v.GID} GName={v.GName} 
                                      time={v.time} subject={v.subject} place={v.place}/>)} */}
            
          </Content>
        </Else>
      </If>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
    )
}
export default HomePage;

