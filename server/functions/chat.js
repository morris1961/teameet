"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _group = _interopRequireDefault(require("../models/group.js"));

var _user = _interopRequireDefault(require("../models/user.js"));

var _message = _interopRequireDefault(require("../models/message.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function chat(_x) {
  return _chat.apply(this, arguments);
}

function _chat() {
  _chat = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var UID, GID, status, messages, error_msg, user, group;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            UID = _ref.UID, GID = _ref.GID;
            status = false;
            messages = [];
            error_msg = "Something wrong...";
            _context.prev = 4;
            _context.next = 7;
            return _user["default"].findById(UID);

          case 7:
            user = _context.sent;

            if (user) {
              _context.next = 12;
              break;
            }

            status = false;
            error_msg = "The user is not valid!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 12:
            if (!(user.groups.indexOf(GID) === -1)) {
              _context.next = 16;
              break;
            }

            status = false;
            error_msg = "The user is not in the group!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 16:
            _context.next = 18;
            return _group["default"].findById(GID).populate({
              path: 'messages',
              populate: 'sender'
            });

          case 18:
            group = _context.sent;

            if (group) {
              _context.next = 23;
              break;
            }

            status = false;
            error_msg = "The group is not valid!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 23:
            messages = group.messages.map(function (_ref2) {
              var time = _ref2.time,
                  body = _ref2.body,
                  UName = _ref2.sender.UName;
              return {
                time: time,
                sender: UName,
                body: body
              };
            });
            status = true;
            error_msg = "Successed!";
            _context.next = 34;
            break;

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](4);
            console.log(_context.t0);
            status = false;
            error_msg = "Something wrong...";
            ;

          case 34:
            return _context.abrupt("return", {
              status: status,
              messages: messages,
              error_msg: error_msg
            });

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 28]]);
  }));
  return _chat.apply(this, arguments);
}

var _default = chat;
exports["default"] = _default;
//# sourceMappingURL=chat.js.map