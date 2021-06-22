// import models
import Discussion from '../models/discussion.js'

// function for every cases
async function discussion({ UID, DID }) {
  var status = false;
  var subject = "";
  var content = "";
  var isAdmin = false;
  var error_msg = "Something wrong...";
  try {
    const discussion = await Discussion.findById(DID);
    if (!discussion) {
      status = false;
      error_msg = "The discussion is not valid!"
      return { status, error_msg };
    }
    subject = discussion.subject;
    content = discussion.content;
    isAdmin = UID.toString() === discussion.admin.toString();
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, subject, content, isAdmin, DID, error_msg };
}

export default discussion;