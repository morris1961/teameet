// import models
import Group from '../models/group.js';
import User from '../models/user.js';
import Discussion from '../models/discussion.js';

// function for every cases
async function index({ UID }) {
  var status = false;
  var UName = "";
  var voting = []; // todo
  var recent = []; // todo
  var group = [];
  var error_msg = "Something wrong...";
  try {
    const now = new Date().getTime();
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
      group.push({ GID: aGroup._id, GName: aGroup.GName });
      const discussions = aGroup.discussions;
      for (let j = 0; j < discussions.length; j++) {
        const aDiscussion = await Discussion.findById(discussions[j])
        // before deadline
        if ((now - aDiscussion.deadline.getTime()) < 0) {
          voting.push({
            GID: aGroup._id,
            DID: aDiscussion._id,
            GName: aGroup.GName,
            subject: aDiscussion.subject,
            time: aDiscussion.time_result,
            place: aDiscussion.place_result,
            deadline: aDiscussion.deadline,
          })
        }
        // after deadline
        else {
          // before discussion time result
          if (now - aDiscussion.time_result.getTime() < 0) {
            recent.push({
              GID: aGroup._id,
              DID: aDiscussion._id,
              GName: aGroup.GName,
              subject: aDiscussion.subject,
              time: aDiscussion.time_result,
              place: aDiscussion.place_result,
            })
          }
        }
      }
    }
    voting.sort((a, b) => (a.deadline.getTime() < b.deadline.getTime()) ? 1 : ((b.deadline.getTime() < a.deadline.getTime()) ? -1 : 0))
    recent.sort((a, b) => (a.time_result.getTime() < b.time_result.getTime()) ? 1 : ((b.time_result.getTime() < a.time_result.getTime()) ? -1 : 0))
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