"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _group = _interopRequireDefault(require("../models/group.js"));

var _user = _interopRequireDefault(require("../models/user.js"));

var _message2 = _interopRequireDefault(require("../models/message.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function message(_x) {
  return _message.apply(this, arguments);
}

function _message() {
  _message = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var UID, GID, body, status, UName, messages, error_msg, _nowTime, user, group, newMessage;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            UID = _ref.UID, GID = _ref.GID, body = _ref.body;
            status = false;
            UName = "";
            messages = [];
            error_msg = "Something wrong...";
            _context.prev = 5;
            _nowTime = new Date();
            _context.next = 9;
            return _user["default"].findById(UID);

          case 9:
            user = _context.sent;

            if (user) {
              _context.next = 14;
              break;
            }

            status = false;
            error_msg = "The user is not valid!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 14:
            if (!(user.groups.indexOf(GID) === -1)) {
              _context.next = 18;
              break;
            }

            status = false;
            error_msg = "The user is not in the group!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 18:
            _context.next = 20;
            return _group["default"].findById(GID);

          case 20:
            group = _context.sent;

            if (group) {
              _context.next = 25;
              break;
            }

            status = false;
            error_msg = "The group is not valid!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 25:
            newMessage = new _message2["default"]({
              time: _nowTime,
              sender: UID,
              body: body
            });
            _context.next = 28;
            return newMessage.save();

          case 28:
            messages = group.messages;
            messages.push(newMessage);
            _context.next = 32;
            return group.updateOne({
              $set: {
                messages: messages
              }
            });

          case 32:
            UName = user.UName;
            status = true;
            error_msg = "Successed!";
            _context.next = 43;
            break;

          case 37:
            _context.prev = 37;
            _context.t0 = _context["catch"](5);
            console.log(_context.t0);
            status = false;
            error_msg = "Something wrong...";
            ;

          case 43:
            return _context.abrupt("return", {
              status: status,
              time: nowTime,
              sender: UName,
              body: body,
              error_msg: error_msg
            });

          case 44:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 37]]);
  }));
  return _message.apply(this, arguments);
}

var _default = message;
exports["default"] = _default;
//# sourceMappingURL=message.js.map