// import models
import Group from '../models/group.js';
import User from '../models/user.js';
import Discussion from '../models/discussion.js';

// function for every cases
async function group({ UID, GID }) {
  var status = false;
  var code = "";
  var GName = "";
  var isAdmin = false;
  var messages = []; // (sort by time)  // todo
  var file = "";
  var discussions = [];
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
    // todo
    // messages = group.messages;
    file = group.file;
    for (let i = 0; i < group.discussions.length; i++) {
      const aDisscussion = await Discussion.findById(group.discussions[i]);
      discussions.push({ DID: aDisscussion._id, subject: aDisscussion.subject });
    }
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, code, GName, isAdmin, messages, file, discussions, error_msg };
}

export default group;