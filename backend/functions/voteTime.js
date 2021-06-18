// import models
import Discussion from '../models/discussion.js'
import moment from 'moment';
import 'moment-timezone';

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
    if ((new Date().getTime() - discussion.deadline.getTime()) >= 0){
      status = false;
      error_msg = "The deadline has arrived!"
      return { status, error_msg };
    }
    var time_options = discussion.time_options;
    for (let j = 0; j < times.length; j++) {
      const time = new Date(moment(times[j]).toDate());
      for (var [key, value] of time_options) {
        if (key === time.toISOString().replace(".", " ")) {
          var newArray = value.push(UID);
          time_options.set(key, newArray);
          break;
        }
      }
    }
    console.log(time_options);
    await discussion.updateOne({ $set: { time_options } })
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, time_options, error_msg };
}

export default time;