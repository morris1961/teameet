// import models
import User from '../models/user.js';

// function for every cases
async function regester({ email, UName, password }) {
  var status = false;
  var error_msg = "Something wrong...";
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      status = false;
      error_msg = "The email has been used!";
    }
    else {
      const newScore = new User({ email, UName, password });
      await newScore.save();
      status = true;
      error_msg = "Successed!";
    }
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, error_msg };
}

export default regester;