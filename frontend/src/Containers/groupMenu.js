// import {useState} from 'react'
import { Menu, Button } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

const groupMenu = () =>{
    const handleClick = e => {
        console.log('click ', e)
    }
    return(
        
        <Menu
        onClick={handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Button block>聊天室</Button>
        <div style={{display: flex}}>
          <Button block>資料集錦</Button>
          <Button block>修改</Button>
        </div>
        <Button block>來約討論</Button>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="討論">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" icon={<SettingOutlined />} title="設定">
          <Menu.Item key="1">更新個人資料</Menu.Item>
          <Menu.Item key="2">登出</Menu.Item>
        </SubMenu>
      </Menu>
    )
}
export default groupMenu;



