// import models
import Discussion from '../models/discussion.js'

// function for every cases
async function time({ UID, DID, times }) {
  var status = false;
  var error_msg = "Something wrong...";
  try {
    const discussion = await Discussion.findById(DID);
    if (!discussion) {
      status = false;
      error_msg = "The discussion is not valid!"
      return { status, error_msg };
    }
    time_options = discussion.time_options;
    for (var [key, value] of time_options) {
      for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < times.length; j++) {              
              if (key[i].toString() === times[j].toString()) {
                  value.push(UID);
          }
        }
      }
    }
    console.log(time_options);
    discussion.updateOne({ $set: { time_options } })
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, error_msg };
}

export default time;