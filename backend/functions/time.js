// import models
import Discussion from '../models/discussion.js'

// function for every cases
async function time({ UID, DID }) {
  var status = false;
  var time_options = {};
  var isDue = false;
  var isAdmin = false;
  var voted = false;
  var error_msg = "Something wrong...";
  var isSelect = false;
  try {
    const discussion = await Discussion.findById(DID);
    if (!discussion) {
      status = false;
      error_msg = "The discussion is not valid!"
      return { status, error_msg };
    }
    const old_time_options = discussion.time_options;
    for (var [key, value] of old_time_options) {
      time_options[key.replace(" ", ".")] = value;
      if (!voted) {
        for (let i = 0; i < value.length; i++) {
          if (value[i].toString() === UID.toString()) {
            voted = true;
            break;
          }
        }
      }
    }
    isDue = (new Date().getTime() - discussion.deadline.getTime()) >= 0
    isAdmin = UID.toString() === discussion.admin.toString();
    isSelect = discussion.time_result == new Date(0);
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, time_options, isDue, isAdmin, voted, isSelect, error_msg };
}

export default time;