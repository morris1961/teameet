// import models
import Discussion from '../models/discussion.js'

// function for every cases
async function votePlace({ UID, DID, places }) {
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
    var place_options = discussion.place_options;
    for (let j = 0; j < places.length; j++) {
      for (var [key, value] of place_options) {
        if (key === places[j]) {
          for (let i = 0; i < place_options.get(key).length; i++) {
            if (UID.toString() === place_options.get(key)[i].toString()) {
              status = false;
              error_msg = "The place has been voted by this user!";
              return { status, error_msg };
            }
          }
          place_options.get(key).push(UID);
        }
      }
    }
    await discussion.updateOne({ $set: { place_options } })
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, place_options, error_msg };
}

export default votePlace;