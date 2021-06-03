// import models
import Discussion from '../models/discussion.js'

// function for every cases
async function time({ UID, DID, places }) {
  var status = false;
  var error_msg = "Something wrong...";
  try {
    const discussion = await Discussion.findById(DID);
    if (!discussion) {
      status = false;
      error_msg = "The discussion is not valid!"
      return { status, error_msg };
    }
    // todo
    var place_options = discussion.place_options;
    for (let j = 0; j < places.length; j++) {
      for (var [key, value] of place_options) {
        if (key === places[j]) {
          // console.log("?")
          place_options[key].push(UID);
        }
      }
    }
    // todo
    console.log(place_options);
    // await discussion.updateOne({ $set: { place_options } })
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