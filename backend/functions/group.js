// import models
import Group from '../models/group';
import User from '../models/user';

// function for every cases
async function group({ UID, GID }) {
  var status = false;
  var code = "";
  var GName = "";
  var isAdmin = false;
  var content = []; // (sort by time)  // todo
  var file = "";
  var discussion = []; // [{DID: id1, subject: subject1}, ...] // todo
  var error_msg = "Something wrong...";
  try {
    const group = await Group.findById(GID);
    if (!group) {
      status = false;
      error_msg = "The code is not valid!"
      return { status, error_msg };
    }
    const user = await User.findById(UID);
    if (!user) {
      status = false;
      error_msg = "The user is not valid!"
      return { status, error_msg };
    }
    code = group.code;
    GName = group.GName;
    isAdmin = group.admin.toString() === UID.toString();
    content = group.content;
    file = group.file;
    discussion = group.discussion;
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, code, GName, isAdmin, content, file, discussion, error_msg };
}

export default group;