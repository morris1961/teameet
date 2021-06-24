"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _group = _interopRequireDefault(require("../models/group.js"));

var _user = _interopRequireDefault(require("../models/user.js"));

var _discussion = _interopRequireDefault(require("../models/discussion.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// function for every cases
function index(_x) {
  return _index.apply(this, arguments);
}

function _index() {
  _index = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var UID, status, UName, voting, recent, group, error_msg, now, user, groups, i, aGroup, discussions, j, aDiscussion;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            UID = _ref.UID;
            status = false;
            UName = "";
            voting = []; // todo

            recent = []; // todo

            group = [];
            error_msg = "Something wrong...";
            _context.prev = 7;
            now = new Date().getTime();
            _context.next = 11;
            return _user["default"].findById(UID);

          case 11:
            user = _context.sent;

            if (user) {
              _context.next = 16;
              break;
            }

            status = false;
            error_msg = "The user is not valid!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 16:
            UName = user.UName;
            groups = user.groups;
            i = 0;

          case 19:
            if (!(i < groups.length)) {
              _context.next = 37;
              break;
            }

            _context.next = 22;
            return _group["default"].findById(groups[i]);

          case 22:
            aGroup = _context.sent;
            group.push({
              GID: aGroup._id,
              GName: aGroup.GName
            });
            discussions = aGroup.discussions;
            j = 0;

          case 26:
            if (!(j < discussions.length)) {
              _context.next = 34;
              break;
            }

            _context.next = 29;
            return _discussion["default"].findById(discussions[j]);

          case 29:
            aDiscussion = _context.sent;

            // before deadline
            if (now - aDiscussion.deadline.getTime() < 0) {
              voting.push({
                GID: aGroup._id,
                DID: aDiscussion._id,
                GName: aGroup.GName,
                subject: aDiscussion.subject,
                time_result: aDiscussion.time_result,
                place: aDiscussion.place_result,
                deadline: aDiscussion.deadline
              });
            } // after deadline
            else {
                // before discussion time result
                if (now - aDiscussion.time_result.getTime() < 0) {
                  recent.push({
                    GID: aGroup._id,
                    DID: aDiscussion._id,
                    GName: aGroup.GName,
                    subject: aDiscussion.subject,
                    time_result: aDiscussion.time_result,
                    place: aDiscussion.place_result
                  });
                }
              }

          case 31:
            j++;
            _context.next = 26;
            break;

          case 34:
            i++;
            _context.next = 19;
            break;

          case 37:
            voting.sort(function (a, b) {
              return a.deadline.getTime() < b.deadline.getTime() ? 1 : b.deadline.getTime() < a.deadline.getTime() ? -1 : 0;
            });
            recent.sort(function (a, b) {
              return a.time_result.getTime() < b.time_result.getTime() ? 1 : b.time_result.getTime() < a.time_result.getTime() ? -1 : 0;
            });
            status = true;
            error_msg = "Successed!";
            _context.next = 49;
            break;

          case 43:
            _context.prev = 43;
            _context.t0 = _context["catch"](7);
            console.log(_context.t0);
            status = false;
            error_msg = "Something wrong...";
            ;

          case 49:
            return _context.abrupt("return", {
              status: status,
              UName: UName,
              recent: recent,
              voting: voting,
              group: group,
              error_msg: error_msg
            });

          case 50:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 43]]);
  }));
  return _index.apply(this, arguments);
}

var _default = index;
exports["default"] = _default;
//# sourceMappingURL=index.js.map