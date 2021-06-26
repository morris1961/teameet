// import models
import Group from '../models/group.js';
import User from '../models/user.js';

// function for every cases
async function leaveGroup({ UID, GID }) {
  var status = false;
  var error_msg = "Something wrong...";
  try {
    const group = await Group.findById(GID);
    if (!group) {
      status = false;
      error_msg = "The group is not valid!"
      return { status, error_msg };
    }
    const user = await User.findById(UID);
    if (!user) {
      status = false;
      error_msg = "The user is not valid!"
      return { status, error_msg };
    }
    var oldGroups = user.groups;
    const groups = oldGroups.filter((value) => {
      return value.toString() !== GID.toString();
    });
    console.log(groups);
    await user.updateOne({ $set: { groups } });
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, error_msg };
}

export default leaveGroup;