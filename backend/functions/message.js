import Group from "../models/group.js";
import User from "../models/user.js";
import Message from "../models/message.js";

async function message({ UID, GID, body }) {
  var status = false;
  var UName = "";
  var messages = [];
  var error_msg = "Something wrong...";
  try {
    const nowTime = new Date();
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

    const group = await Group.findById(GID);
    if (!group) {
      status = false;
      error_msg = "The group is not valid!"
      return { status, error_msg };
    }

    const newMessage = new Message({ time: nowTime, sender: UID, body });
    await newMessage.save();

    messages = group.messages;
    messages.push(newMessage);
    await group.updateOne({ $set: { messages } });

    UName = user.UName;
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, sender: UName, body, error_msg };
}

export default message;