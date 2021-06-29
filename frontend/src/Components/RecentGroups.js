import React from 'react';
import '../style/RecentGroups.css';
import moment from 'moment';
import 'moment-timezone';
import { Tag } from 'antd';

const RecentGroups = (props) =>{
    return( 
        <React.Fragment>
          <div className="recentgroups_button">
          <h3 style={{textShadow: "1px 1px 0px rgba(0,0,0,0.2)", color: "#003060"}}>群組：{props.GName}</h3>
            <div>
                <div>
                  <Tag color="blue">討論主題</Tag>
                  {props.subject}
                </div>
                <div>
                  <Tag color="blue">投票時間</Tag>
                  {moment(props.time).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm')} 
                </div>
                <div>
                  <Tag color="blue">地點</Tag>
                  {props.place}
                </div>
            </div>
          </div>
        </React.Fragment>  
    
      );
  
}


export default RecentGroups;
