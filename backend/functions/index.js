// import models
import Group from '../models/group.js';
import User from '../models/user.js';

// function for every cases
async function index({ UID }) {
  var status = false;
  var UName = "";
  var voting = []; // todo
  var recent = []; // todo
  var group = [];
  var error_msg = "Something wrong...";
  try {
    const user = await User.findById(UID);
    if (!user) {
      status = false;
      error_msg = "The user is not valid!"
      return { status, error_msg };
    }
    UName = user.UName;
    var groups = user.groups;
    for (let i = 0; i < groups.length; i++) {
      const aGroup = await Group.findById(groups[i]);
      group.push({GID: aGroup._id, GName: aGroup.GName});
    }
    status = true
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, UName, recent, voting, group, error_msg };
}

export default index;