// import models
import Discussion from '../models/discussion.js'

// function for every cases
async function confirmTime({ UID, DID, time_result }) {
  var status = false;
  var error_msg = "Something wrong...";
  time_result = new Date(time_result);
  try {
    const discussion = await Discussion.findById(DID);
    if (!discussion) {
      status = false;
      error_msg = "The discussion is not valid!"
      return { status, error_msg };
    }
    if(discussion.admin.toString() !== UID.toString()){
      status = false;
      error_msg = "The user is not admin!"
      return { status, error_msg };
    }
    if (!(new Date().getTime() - discussion.deadline.getTime()) >= 0){
      status = false;
      error_msg = "The deadline has not arrived!"
      return { status, error_msg };
    }
    let isIn = false;
    for (var [key, value] of discussion.time_options) {
      if (key === time_result) {
        isIn = true;
        break;
      }
    }
    if(!isIn){
      status = false;
      error_msg = "The time is not in the options";
      return { status, error_msg };
    }
    await discussion.updateOne({ $set: { time_result } })
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, time_result, error_msg };
}

export default confirmTime;