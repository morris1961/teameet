// import models
import Group from '../models/group.js'
import Discussion from '../models/discussion.js'

// function for every cases
async function createDiscussion({ GID, UID, subject, content, time_start, time_span, time_end, deadline }) {
  var status = false;
  var DID = ""
  var error_msg = "Something wrong...";
  time_start = new Date(time_start); // 時間怪怪ㄉ
  time_end = new Date(time_end);
  deadline = new Date(deadline);
  time_span = parseInt(time_span);
  try {
    const group = await Group.findById(GID);
    const discussion = new Discussion({ admin: UID, subject, time_start, time_end, time_span, deadline, content });
    await discussion.save();
    DID = discussion._id;
    var time_options = new Map();
    var time_option = new Date(time_start);
    time_options.set(new Date(time_option).toString(), []);
    while (time_option.getTime() <= time_end.getTime()) {
      time_option.setMinutes(time_option.getMinutes() + time_span);
      time_options.set(new Date(time_option).toString(), []);
    }
    await discussion.updateOne({$set:{time_options}});

    var discussions =  group.discussions;
    discussions.push(DID);
    await group.updateOne({discussions});
    status = true;
    error_msg = "Successed!";
  } catch (e) {
    console.log(e)
    status = false;
    error_msg = "Something wrong...";;
  }
  return { status, DID, error_msg };
}

export default createDiscussion;