"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _group = _interopRequireDefault(require("../models/group.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// function for every cases
function createGroup(_x) {
  return _createGroup.apply(this, arguments);
}

function _createGroup() {
  _createGroup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var GID, file, status, error_msg, group;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            GID = _ref.GID, file = _ref.file;
            status = false;
            error_msg = "Something wrong...";
            _context.prev = 3;
            _context.next = 6;
            return _group["default"].findById(GID);

          case 6:
            group = _context.sent;

            if (group) {
              _context.next = 11;
              break;
            }

            status = false;
            error_msg = "The code is not valid!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 11:
            _context.next = 13;
            return group.updateOne({
              $set: {
                file: file
              }
            });

          case 13:
            status = true;
            error_msg = "Successed!";
            _context.next = 23;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](3);
            console.log(_context.t0);
            status = false;
            error_msg = "Something wrong...";
            ;

          case 23:
            return _context.abrupt("return", {
              status: status,
              file: file,
              error_msg: error_msg
            });

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 17]]);
  }));
  return _createGroup.apply(this, arguments);
}

var _default = createGroup;
exports["default"] = _default;
//# sourceMappingURL=renewFile.js.map