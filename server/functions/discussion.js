"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _discussion3 = _interopRequireDefault(require("../models/discussion.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// function for every cases
function discussion(_x) {
  return _discussion.apply(this, arguments);
}

function _discussion() {
  _discussion = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var UID, DID, status, subject, content, isAdmin, error_msg, _discussion2;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            UID = _ref.UID, DID = _ref.DID;
            status = false;
            subject = "";
            content = "";
            isAdmin = false;
            error_msg = "Something wrong...";
            _context.prev = 6;
            _context.next = 9;
            return _discussion3["default"].findById(DID);

          case 9:
            _discussion2 = _context.sent;

            if (_discussion2) {
              _context.next = 14;
              break;
            }

            status = false;
            error_msg = "The discussion is not valid!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 14:
            subject = _discussion2.subject;
            content = _discussion2.content;
            isAdmin = UID.toString() === _discussion2.admin.toString();
            status = true;
            error_msg = "Successed!";
            _context.next = 27;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](6);
            console.log(_context.t0);
            status = false;
            error_msg = "Something wrong...";
            ;

          case 27:
            return _context.abrupt("return", {
              status: status,
              subject: subject,
              content: content,
              isAdmin: isAdmin,
              DID: DID,
              error_msg: error_msg
            });

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 21]]);
  }));
  return _discussion.apply(this, arguments);
}

var _default = discussion;
exports["default"] = _default;
//# sourceMappingURL=discussion.js.map