import React from 'react'
import '../style/RecentGroups.css';
const RecentGroups = (props) =>{


    return( 
        <React.Fragment>
          <div className="recentgroups_button">
          {props.GName}
            <div >
                <div>時間: {props.time}</div>
                <div>地點: {props.place}</div>
                <div>主題: {props.subject}</div>
            </div>
          </div>
        </React.Fragment>  
    
      );
  
}


export default RecentGroups;
