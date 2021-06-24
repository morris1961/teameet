"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _group3 = _interopRequireDefault(require("../models/group.js"));

var _user = _interopRequireDefault(require("../models/user.js"));

var _discussion = _interopRequireDefault(require("../models/discussion.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// function for every cases
function group(_x) {
  return _group.apply(this, arguments);
}

function _group() {
  _group = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var UID, GID, status, code, GName, isAdmin, messages, file, discussions, error_msg, _group2, user, i, aDisscussion;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            UID = _ref.UID, GID = _ref.GID;
            status = false;
            code = "";
            GName = "";
            isAdmin = false;
            messages = []; // (sort by time)  // todo

            file = "";
            discussions = [];
            error_msg = "Something wrong...";
            _context.prev = 9;
            _context.next = 12;
            return _group3["default"].findById(GID);

          case 12:
            _group2 = _context.sent;

            if (_group2) {
              _context.next = 17;
              break;
            }

            status = false;
            error_msg = "The code is not valid!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 17:
            _context.next = 19;
            return _user["default"].findById(UID);

          case 19:
            user = _context.sent;

            if (user) {
              _context.next = 24;
              break;
            }

            status = false;
            error_msg = "The user is not valid!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 24:
            code = _group2.code;
            GName = _group2.GName;
            isAdmin = _group2.admin.toString() === UID.toString(); // todo
            // messages = group.messages;

            file = _group2.file;
            i = 0;

          case 29:
            if (!(i < _group2.discussions.length)) {
              _context.next = 37;
              break;
            }

            _context.next = 32;
            return _discussion["default"].findById(_group2.discussions[i]);

          case 32:
            aDisscussion = _context.sent;
            discussions.push({
              DID: aDisscussion._id,
              subject: aDisscussion.subject
            });

          case 34:
            i++;
            _context.next = 29;
            break;

          case 37:
            status = true;
            error_msg = "Successed!";
            _context.next = 47;
            break;

          case 41:
            _context.prev = 41;
            _context.t0 = _context["catch"](9);
            console.log(_context.t0);
            status = false;
            error_msg = "Something wrong...";
            ;

          case 47:
            return _context.abrupt("return", {
              status: status,
              code: code,
              GName: GName,
              isAdmin: isAdmin,
              messages: messages,
              file: file,
              discussions: discussions,
              error_msg: error_msg
            });

          case 48:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 41]]);
  }));
  return _group.apply(this, arguments);
}

var _default = group;
exports["default"] = _default;
//# sourceMappingURL=group.js.map