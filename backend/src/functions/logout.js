// import models
import User from '../models/user.js';

// function for every cases
async function logout({ UID }) {
  var status = false;
  var error_msg = "Something wrong...";
  try {
    const user = await User.findById(UID);
    if (!user) {
      status = false;
      error_msg = "The user is invalid!";
      return { status, error_msg };
    }
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, error_msg };
}

export default logout;