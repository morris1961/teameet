"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// function for every cases
function login(_x) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var email, password, status, UID, error_msg, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = _ref.email, password = _ref.password;
            status = false;
            UID = "";
            error_msg = "Something wrong...";
            _context.prev = 4;
            _context.next = 7;
            return _user["default"].findOne({
              email: email,
              password: password
            });

          case 7:
            user = _context.sent;

            if (!user) {
              status = false;
              error_msg = "The email or password is invalid!";
            } else {
              UID = user._id;
              status = true;
              error_msg = "Successed!";
            }

            _context.next = 17;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](4);
            console.log(_context.t0);
            status = false;
            error_msg = "Something wrong...";
            ;

          case 17:
            return _context.abrupt("return", {
              status: status,
              UID: UID,
              error_msg: error_msg
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 11]]);
  }));
  return _login.apply(this, arguments);
}

var _default = login;
exports["default"] = _default;
//# sourceMappingURL=login.js.map