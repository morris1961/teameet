import React, { useEffect } from 'react';
import '../style/RecentGroups.css';
import {useState} from 'react';
import moment from 'moment';
import 'moment-timezone';
const RecentGroups = (props) =>{
    return( 
        <React.Fragment>
          <div className="recentgroups_button">
          {props.GName}
            <div >
                <div>時間: {moment(props.time_result).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm')}</div>
                <div>地點: {props.place}</div>
                <div>主題: {props.subject}</div>
            </div>
          </div>
        </React.Fragment>  
    
      );
  
}


export default RecentGroups;
