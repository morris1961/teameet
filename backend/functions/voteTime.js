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
    var time_options = discussion.time_options;
    for (let j = 0; j < times.length; j++) {
      const time = times[j].split(/-|T|:/);
      const time_option = new Date(Date.UTC(time[0], time[1], time[2], time[3], time[4])).toString(); //todo
      // console.log(time_option);
      for (var [key, value] of time_options) {
        if (key === time_option) {
          // console.log("?")
          time_options[key].push(UID);
        }
      }
    }
    // console.log(time_options);
    // await discussion.updateOne({ $set: { time_options } })
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