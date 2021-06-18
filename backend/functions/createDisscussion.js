// import models
import Group from '../models/group.js'
import Discussion from '../models/discussion.js'
import moment from "moment";

// function for every cases
async function createDiscussion({ GID, UID, subject, content, time_start, time_span, time_end, deadline, place }) {
  var status = false;
  var DID = "";
  var error_msg = "Something wrong...";
  var discussions = [];
  time_start = new Date(moment(time_start).toDate());
  time_end = new Date(moment(time_end).toDate());
  deadline = new Date(moment(deadline).toDate());
  time_span = parseInt(time_span);
  try {
    const group = await Group.findById(GID);
    if (!group) {
      status = false;
      error_msg = "The group is not valid!"
      return { status, error_msg };
    }
    var time_options = new Map();
    var time_option = time_start;
    time_options.set(time_option.toISOString().replace(".", " "), []);
    while (time_option.getTime() < time_end.getTime()) {
      time_option.setMinutes(time_option.getMinutes() + time_span);
      time_options.set(time_option.toISOString().replace(".", " "), []);
    }
    var place_options = {};
    place_options[place] = [];
    const discussion = new Discussion({ admin: UID, subject, time_start, time_end, time_span, deadline, content, place_options, time_options });
    await discussion.save();
    DID = discussion._id;

    const newDiscussions = group.discussions;
    newDiscussions.push(DID);
    await group.updateOne({ discussions: newDiscussions });

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
  return { status, DID, discussions, error_msg };
}

export default createDiscussion;