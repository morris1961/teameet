// import models
import Discussion from '../models/discussion.js'

// function for every cases
async function confirmTime({ UID, DID, time_result }) {
  var status = false;
  var error_msg = "Something wrong...";
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
    // todo check if result is in options
    // todo
    // await discussion.updateOne({ $set: { time_result } })
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, error_msg };
}

export default confirmTime;