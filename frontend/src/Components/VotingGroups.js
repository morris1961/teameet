import React, {useCallback} from 'react'
import '../style/VotingGroups.css';
import { useHistory } from "react-router-dom";
import { Button } from 'antd';

const VotingGroups = (props) =>{
  const history = useHistory();
  var data = {GID: props.GId, UID: props.UID};
  var path = {
    pathname:"/:UID/:GID",
    state:{data},
  }
  const handleOnClick = (() => {history.push('/:UID/:GID')});
    return( 
        <React.Fragment>
          <Button className="votinggroups_button" 
                onClick={handleOnClick} >
            {props.GName}
          </Button>
        </React.Fragment>  
    
      );
  
}


export default VotingGroups;
