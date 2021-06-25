import React, { useEffect } from 'react';
import '../style/RecentGroups.css';
import moment from 'moment';
import 'moment-timezone';

const VotingGroups = (props) =>{
    return( 
        <React.Fragment>
          <div className="recentgroups_button">
          {props.GName}
            <div >
                <div>投票截止時間: {moment(props.deadline).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm')} </div>
                <div>地點: {props.place}</div>
                <div>主題: {props.subject}</div>
            </div>
          </div>
        </React.Fragment>  
    
      );
  
}


export default VotingGroups;
