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
function register(_x) {
  return _register.apply(this, arguments);
}

function _register() {
  _register = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var email, UName, password, status, error_msg, existing, newScore;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = _ref.email, UName = _ref.UName, password = _ref.password;
            status = false;
            error_msg = "Something wrong...";
            _context.prev = 3;
            _context.next = 6;
            return _user["default"].findOne({
              email: email
            });

          case 6:
            existing = _context.sent;

            if (!existing) {
              _context.next = 12;
              break;
            }

            status = false;
            error_msg = "The email has been used!";
            _context.next = 17;
            break;

          case 12:
            newScore = new _user["default"]({
              email: email,
              UName: UName,
              password: password
            });
            _context.next = 15;
            return newScore.save();

          case 15:
            status = true;
            error_msg = "Successed!";

          case 17:
            _context.next = 25;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0);
            status = false;
            error_msg = "Something wrong...";
            ;

          case 25:
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 19]]);
  }));
  return _register.apply(this, arguments);
}

var _default = register;
exports["default"] = _default;
//# sourceMappingURL=register.js.map