// import models
import Group from '../models/group.js';

// function for every cases
async function createGroup({ GID, file }) {
  var status = false;
  var error_msg = "Something wrong...";
  try {
    const group = await Group.findById(GID);
    if (!group) {
      status = false;
      error_msg = "The code is not valid!"
      return { status, error_msg };
    }
    await group.updateOne({ $set: { file } });
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, error_msg };
}

export default createGroup;