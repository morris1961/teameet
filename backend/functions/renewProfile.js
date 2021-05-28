// import models
import User from '../models/user.js';

// function for every cases
async function renewProfile({ UID, UName, password }) {
  var status = false;
  var error_msg = "Something wrong...";
  try {
    const user = await User.findById(UID);
    if (!user) {
      status = false;
      error_msg = "The user is not valid!"
      return { status, error_msg };
    }
    await user.updateOne({ $set: { UName, password } });
    status = true
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, UName, error_msg };
}

export default renewProfile;