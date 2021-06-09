import React, {useCallback} from 'react'
import '../style/RecentGroups.css';
import { useHistory } from "react-router-dom";
import { Button } from 'antd';

const VotingGroups = (props) =>{
  const history = useHistory();
  var data = {GId: props.GId, UID: props.UID};
  var path = {
    pathname:"/group",
    state:{data},
  }
  const handleOnClick = useCallback(() => history.push(path), [history]);
    return( 
        <React.Fragment>
          <Button className="recentgroups_button" 
                onClick={handleOnClick} >
            {props.GName}
            <div className="recentgroups_txt">
                <div>時間: {props.time}</div>
                <div>地點: {props.place}</div>
                <div>主題: {props.subject}</div>
            </div>
          </Button>
        </React.Fragment>  
    
      );
  
}


export default VotingGroups;
