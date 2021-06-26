// import models
import User from '../models/user.js';

// function for every cases
async function login({ email, password }) {
  var status = false;
  var UID = "";
  var groups = [];
  var error_msg = "Something wrong...";
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      status = false;
      error_msg = "The email or password is invalid!";
      return { status, error_msg };
    }
    groups = user.groups;
    UID = user._id;
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, UID, groups, error_msg };
}

export default login;