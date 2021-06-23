import Group from "../models/group.js";
import User from "../models/user.js";
import Message from "../models/message.js";

async function chat({ UID, GID }) {
  var status = false;
  var messages = [];
  var error_msg = "Something wrong...";
  try {
    const user = await User.findById(UID)
    if (!user) {
      status = false;
      error_msg = "The user is not valid!"
      return { status, error_msg };
    }
    if (user.groups.indexOf(GID) === -1) {
      status = false;
      error_msg = "The user is not in the group!"
      return { status, error_msg };
    }

    const group = await Group.findById(GID).populate({ path: 'messages', populate: 'sender' });
    if (!group) {
      status = false;
      error_msg = "The group is not valid!"
      return { status, error_msg };
    }
    messages = group.messages.map(({ time, body, sender: { UName } }) => ({
      time,
      sender: UName,
      body
    }))
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, messages, error_msg };
}

export default chat;