// import models
import Discussion from '../models/discussion.js'

// function for every cases
async function time({ UID, DID }) {
  var status = false;
  var place_options = [];
  var isDue = false;
  var isAdmin = false;
  var voted = false;
  var isSelect = false;
  var error_msg = "Something wrong...";
  try {
    const discussion = await Discussion.findById(DID);
    if (!discussion) {
      status = false;
      error_msg = "The discussion is not valid!"
      return { status, error_msg };
    }
    place_options = discussion.place_options;
    for (var [key, value] of place_options) {
      for (let i = 0; i < value.length; i++) {
        if (value[i].toString() === UID.toString()) {
          voted = true;
          break;
        }
      }
      if (voted) {
        break;
      }
    }
    isDue = (new Date().getTime() - discussion.deadline.getTime()) >= 0
    isAdmin = UID.toString() === discussion.admin.toString();
    isSelect = discussion.place_result == ""
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";
  }
  return { status, place_options, isDue, isAdmin, voted, isSelect, error_msg };
}

export default time;