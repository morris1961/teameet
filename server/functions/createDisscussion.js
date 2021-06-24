"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _group = _interopRequireDefault(require("../models/group.js"));

var _discussion = _interopRequireDefault(require("../models/discussion.js"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// function for every cases
function createDiscussion(_x) {
  return _createDiscussion.apply(this, arguments);
}

function _createDiscussion() {
  _createDiscussion = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var GID, UID, subject, content, time_start, time_span, time_end, deadline, place, status, DID, error_msg, discussions, group, time_options, time_option, place_options, discussion, newDiscussions, i, aDisscussion;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            GID = _ref.GID, UID = _ref.UID, subject = _ref.subject, content = _ref.content, time_start = _ref.time_start, time_span = _ref.time_span, time_end = _ref.time_end, deadline = _ref.deadline, place = _ref.place;
            status = false;
            DID = "";
            error_msg = "Something wrong...";
            discussions = [];
            time_start = new Date((0, _moment["default"])(time_start).toDate());
            time_end = new Date((0, _moment["default"])(time_end).toDate());
            deadline = new Date((0, _moment["default"])(deadline).toDate());
            time_span = parseInt(time_span);
            _context.prev = 9;
            _context.next = 12;
            return _group["default"].findById(GID);

          case 12:
            group = _context.sent;

            if (group) {
              _context.next = 17;
              break;
            }

            status = false;
            error_msg = "The group is not valid!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 17:
            time_options = new Map();
            time_option = time_start;
            time_options.set(time_option.toISOString().replace(".", " "), []);

            while (time_option.getTime() < time_end.getTime()) {
              time_option.setMinutes(time_option.getMinutes() + time_span);
              time_options.set(time_option.toISOString().replace(".", " "), []);
            }

            place_options = {};
            place_options[place] = [];
            discussion = new _discussion["default"]({
              admin: UID,
              subject: subject,
              time_start: time_start,
              time_end: time_end,
              time_span: time_span,
              deadline: deadline,
              content: content,
              place_options: place_options,
              time_options: time_options
            });
            _context.next = 26;
            return discussion.save();

          case 26:
            DID = discussion._id;
            newDiscussions = group.discussions;
            newDiscussions.push(DID);
            _context.next = 31;
            return group.updateOne({
              discussions: newDiscussions
            });

          case 31:
            i = 0;

          case 32:
            if (!(i < group.discussions.length)) {
              _context.next = 40;
              break;
            }

            _context.next = 35;
            return _discussion["default"].findById(group.discussions[i]);

          case 35:
            aDisscussion = _context.sent;
            discussions.push({
              DID: aDisscussion._id,
              subject: aDisscussion.subject
            });

          case 37:
            i++;
            _context.next = 32;
            break;

          case 40:
            status = true;
            error_msg = "Successed!";
            _context.next = 50;
            break;

          case 44:
            _context.prev = 44;
            _context.t0 = _context["catch"](9);
            console.log(_context.t0);
            status = false;
            error_msg = "Something wrong...";
            ;

          case 50:
            return _context.abrupt("return", {
              status: status,
              DID: DID,
              discussions: discussions,
              error_msg: error_msg
            });

          case 51:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 44]]);
  }));
  return _createDiscussion.apply(this, arguments);
}

var _default = createDiscussion;
exports["default"] = _default;
//# sourceMappingURL=createDisscussion.js.map