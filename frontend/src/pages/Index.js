import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import '../style/Index.css';
import VotingGroups from "../Components/VotingGroups";
import RecentGroups from "../Components/RecentGroups";
import {Button, Input, Layout, notification} from 'antd';
import {useHistory, useLocation} from "react-router-dom";
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import  {BsGear}  from "react-icons/bs";
const { Header, Content, Sider } = Layout;
const Index = ({status, UName, recent, voting, group, sendData, error_msg}) =>{
  const history = useHistory();
  const location = useLocation();
  var data = location.state.data;
  var {UID, password, email} = data;
  const [GID, setGID] = useState("");
 
  // const [voting, setVoting] = useState([
  //   {GName:"群組1", GID:"888888", subject:"web", time:"1900/00/00 00:00:00", place:"博理 113"},
  //   {GName:"群組2", GID:"777777", subject:"pro", time:"2019/12/27 10:30:00", place:"管五"},
  //   {GName:"群組3", GID:"666666", subject:"gram", time:"2021/5/30 17:20:00", place:"地點"}
      
  // ])
  // const [recent, setRecent] = useState([
  //   {GName:"組1", GID:"345678", subject:"1web", time:"2021/01/23 01:23:45", place:"1博理 113"},
  //   {GName:"組2", GID:"123456", subject:"2pro", time:"2020/12/27 10:30:00", place:"2管五"},
  //   {GName:"組3", GID:"654321", subject:"3gram", time:"2020/5/30 17:20:00", place:"3地點"}
  // ])
  const [isgearclicked, setIsgearclicked] = useState(false);
  const handlegear = () =>{
    setIsgearclicked(!isgearclicked);
  };

  const [iscreateclicked, setIscreateclicked] = useState(false);
  const [isjoinclicked, setIsjoinclicked] = useState(false);
  const [code, setCode]=useState("");
  const [GName, setGName]=useState("");
  const [file, setFile]=useState("");
  const [click_join, setClick_join]=useState(false);
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

  useEffect(()=>{
    var data = {UID:UID};
    sendData('index', data);
  },[])
  useEffect(()=>{
    // console.log("UName", UName);
    // console.log("recent", recent);
    // console.log("voting", voting);
    // console.log("group", group);

    if(status === false){
      notification['error']({
        message: '錯誤',
        description:
          '請稍後再重新登入一次, 並請你確認你的網路連接正常',
        });
    }
    if(click_join === true){
        if(error_msg === "The user has been in the group!" ){
          notification['error']({
            message: '錯誤',
            description:
              '你已經在該群組內',
            });
            setClick_join(false);
        }else if(error_msg === "The code is not valid!"){
          notification['error']({
            message: '錯誤',
            description:
              '請再確認一次 code 是否正確',
            });
            setClick_join(false);
          }
        else if(error_msg === "Successed!"){
          notification['success']({
            message: '成功',
            description:
            'success',
          });
          var data_group = {UID: UID, GID: GID};
          var path_group = {
            pathname:"/:UID/:GID",
            state:{data_group},
          }
          setTimeout(history.push('/:UID/:GID'), 2000 )
        }
    }
    
    // }else if(msg.api === 'createGroup'){
    //       if(msg.data.status === false){
    //         notification['error']({
    //           message: '錯誤',
    //           description:
    //           '請稍後再重新登入一次, 並請你確認你的網路連接正常'+ msg.data.error_msg,
    //         });
    //       }else if(msg.data.status === true){
    //         notification['success']({
    //           message: '成功',
    //           description:
    //           'success',
    //         });
    //         setGID(msg.data.GID);
    //         setGName(msg.data.GName);
    //         var data_creategroup = {UID: UID, GID: msg.data.GID};
    //         var path_creategroup = {
    //           pathname:"/group",
    //           state:{data_creategroup},
    //         }
    //         setTimeout(history.push(path_creategroup), 2000 )
    //       }
  });
  const handleback = () =>{
    var passdata = {UID, password, email};
    var path_group = {
      pathname:"/index",
      state:{passdata},
    };
    history.push(path_group);
  }

  return( 
    <React.Fragment>

<Layout style={{backgroundColor:"white"}}>
<Sider className="index_sider">
        <div className="index_Uname" onClick={handleback}>
            {UName}
            <BsGear className="index_gear" onClick={handlegear}/>
        </div>
        {isgearclicked?(<>
        <Button style={{width:"80%", margin:"1vw", fontSize:"1.2vw", borderRadius:"2vw", marginBottom:"0.2vw"}}
                onClick={handlerenew}>
            更新個人資料
        </Button>
        <Button style={{width:"80%", margin:"1vw", fontSize:"1.2vw", borderRadius:"2vw", marginBottom:"0.2vw"}}
                onClick={()=>{history.push('/')}}
                >
            登出
        </Button>
        <Button style={{width:"80%", margin:"1vw", fontSize:"1.2vw", borderRadius:"2vw", marginTop:"25vw"}}
                onClick={handlegear}
                >
            回上一頁
        </Button>
        </>
        
        ):(
        <>
        <Button style={{width:"80%", margin:"1vw", fontSize:"1.2vw", borderRadius:"2vw", marginBottom:"0.8vw"}}
                onClick={handlecreategroup}>
            + 創建群組
        </Button>
        <Button style={{width:"80%", margin:"0vw 0.3vw 0.3vw 0.9vw", fontSize:"1.2vw", borderRadius:"2vw", marginBottom:"0.8vw"}}
                onClick={handlejoingroup}>
            + 加入群組
        </Button>
        <div className="index_votinglist">
          
          {group.map((v, i)=><VotingGroups key={'v_'+i} UID={UID} GID={v.GID} GName={v.GName}/>)}
        </div>
        </>
      )}
      </Sider>
      
      <Layout>
      {/* click createGroup */}
      <If condition={iscreateclicked}>
        <Then>
        <Header style={{backgroundColor:"white"}}>
          <div style={{fontSize:"2vw", marginLeft:"-2vw"}}>
              創建群組
          </div>
      </Header>
        <Content style={{paddingLeft:"1.2vw",backgroundColor:"white"}} >
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
        <Header style={{backgroundColor:"white"}}>
            <div style={{fontSize:"2vw", marginLeft:"-2vw"}}>
                加入群組
            </div>
        </Header>
        <Content style={{paddingLeft:"1.2vw",backgroundColor:"white"}} >
        <div className="create_GName" >
          <div className="create_GName-title" > code: </div>
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
            <div>
            {recent.map((v, i)=><RecentGroups key={'r_'+i}
                                      UID={UID} GID={v.GID} GName={v.GName} 
                                      time={v.time} subject={v.subject} place={v.place}/>)}
            </div>
          </Content>
        </Else>
      </If>
      </Layout>
    </Layout>

    </React.Fragment>
    


  );
}


export default Index;
{/* <Header style={{backgroundColor:"white"}}>
            <div style={{fontSize:"2vw", marginLeft:"-2vw"}}>
                資料集錦
            </div>
        </Header>
        <Content style={{paddingLeft:"1.2vw",backgroundColor:"white"}} >
        <div className="create_GName" >
          <div className="create_GName-title" > 連結: </div>
          <div className="create_GName-input" >
              <Input 
              prefix="#"
              className="create_searchbox"
              placeholder="請輸入 code"
              onChange={(event)=>setFile(()=>event.target.value)}
              value={file}

            />
            </div>
        </div>

        <div className="create_create">
        <Button
            className="create_create-button"
            // onClick = {()=>{history.push(path_group)}}>
          加入
        </Button>
         </div>
          </Content> */}