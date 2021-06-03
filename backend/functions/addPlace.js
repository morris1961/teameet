// import models
import Discussion from '../models/discussion.js'

// function for every cases
async function addPlace({ UID, DID, place }) {
  var status = false;
  var error_msg = "Something wrong...";
  try {
    const discussion = await Discussion.findById(DID);
    if (!discussion) {
      status = false;
      error_msg = "The discussion is not valid!"
      return { status, error_msg };
    }
    var place_options = discussion.place_options;
    place_options.set(place, []);
    await discussion.updateOne({ $set: { place_options } })
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, error_msg };
}

export default addPlace;