// import models
import Group from '../models/group.js';
import User from '../models/user.js';

// function for every cases
async function joinGroup({ UID, code }) {
  var status = false;
  var GID = "";
  var error_msg = "Something wrong...";
  try {
    const group = await Group.findOne({ code });
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
    var groups = user.groups;
    groups.push(group._id);
    await User.updateOne({ _id: UID }, { $set: { groups } });
    GID = group._id;
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, GID, error_msg };
}

export default joinGroup;