// import models
import Group from '../models/group';
import User from '../models/user';

// function for every cases
async function joinGroup({ UID, code }) {
  var status = false;
  var GID = "";
  var GName = [];
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
    for (let i = 0; i < groups.length; i++) {
      if (groups[i].toString() === group._id.toString()) {
        status = false;
        error_msg = "The user has been in the group!"
        return { status, error_msg };
      }
      const aGroup = await Group.findById(groups[i]);
      GName.push(aGroup.GName);
    }
    groups.push(group._id);
    await User.updateOne({ _id: UID }, { $set: { groups } });
    const aGroup = await Group.findById(group._id);
    GName.push(aGroup.GName);
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, GID, GName, error_msg };
}

export default joinGroup;