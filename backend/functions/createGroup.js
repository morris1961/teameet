// import models
import Group from '../models/group.js';
import User from '../models/user.js';

// function for every cases
async function createGroup({ GName, admin, file }) {
  var status = false;
  var GID = "";
  var error_msg = "Something wrong...";
  try {
    const adminUser = await User.findById(admin);
    if (!adminUser) {
      status = false;
      error_msg = "The user is not valid!"
      return { status, error_msg };
    }

    const newGroup = new Group({ GName, admin, file });
    await newGroup.save();
    GID = newGroup._id;
    await Group.updateOne({ _id: GID }, { $set: { code: `#${GID.toString().slice(-6)}` } });

    var groups = adminUser.groups
    groups.push(GID);
    await User.updateOne({ _id: admin }, { $set: { groups } })
    
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, GID, GName, error_msg };
}

export default createGroup;