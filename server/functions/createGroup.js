"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _group = _interopRequireDefault(require("../models/group.js"));

var _user = _interopRequireDefault(require("../models/user.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// function for every cases
function createGroup(_x) {
  return _createGroup.apply(this, arguments);
}

function _createGroup() {
  _createGroup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var GName, admin, file, status, GID, error_msg, adminUser, newGroup, groups;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            GName = _ref.GName, admin = _ref.admin, file = _ref.file;
            status = false;
            GID = "";
            error_msg = "Something wrong...";
            _context.prev = 4;
            _context.next = 7;
            return _user["default"].findById(admin);

          case 7:
            adminUser = _context.sent;

            if (adminUser) {
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
            newGroup = new _group["default"]({
              GName: GName,
              admin: admin,
              file: file
            });
            _context.next = 15;
            return newGroup.save();

          case 15:
            GID = newGroup._id;
            _context.next = 18;
            return _group["default"].updateOne({
              _id: GID
            }, {
              $set: {
                code: "#".concat(GID.toString().slice(-6))
              }
            });

          case 18:
            groups = adminUser.groups;
            groups.push(GID);
            _context.next = 22;
            return _user["default"].updateOne({
              _id: admin
            }, {
              $set: {
                groups: groups
              }
            });

          case 22:
            status = true;
            error_msg = "Successed!";
            _context.next = 32;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](4);
            console.log(_context.t0);
            status = false;
            error_msg = "Something wrong...";
            ;

          case 32:
            return _context.abrupt("return", {
              status: status,
              GID: GID,
              GName: GName,
              error_msg: error_msg
            });

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 26]]);
  }));
  return _createGroup.apply(this, arguments);
}

var _default = createGroup;
exports["default"] = _default;
//# sourceMappingURL=createGroup.js.map