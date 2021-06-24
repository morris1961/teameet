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
function joinGroup(_x) {
  return _joinGroup.apply(this, arguments);
}

function _joinGroup() {
  _joinGroup = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var UID, code, status, GID, GName, error_msg, group, user, groups, i, _aGroup, aGroup;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            UID = _ref.UID, code = _ref.code;
            status = false;
            GID = "";
            GName = [];
            error_msg = "Something wrong...";
            _context.prev = 5;
            _context.next = 8;
            return _group["default"].findOne({
              code: code
            });

          case 8:
            group = _context.sent;

            if (group) {
              _context.next = 13;
              break;
            }

            status = false;
            error_msg = "The code is not valid!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 13:
            _context.next = 15;
            return _user["default"].findById(UID);

          case 15:
            user = _context.sent;

            if (user) {
              _context.next = 20;
              break;
            }

            status = false;
            error_msg = "The user is not valid!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 20:
            groups = user.groups;
            i = 0;

          case 22:
            if (!(i < groups.length)) {
              _context.next = 34;
              break;
            }

            if (!(groups[i].toString() === group._id.toString())) {
              _context.next = 27;
              break;
            }

            status = false;
            error_msg = "The user has been in the group!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 27:
            _context.next = 29;
            return _group["default"].findById(groups[i]);

          case 29:
            _aGroup = _context.sent;
            GName.push(_aGroup.GName);

          case 31:
            i++;
            _context.next = 22;
            break;

          case 34:
            groups.push(group._id);
            _context.next = 37;
            return _user["default"].updateOne({
              _id: UID
            }, {
              $set: {
                groups: groups
              }
            });

          case 37:
            _context.next = 39;
            return _group["default"].findById(group._id);

          case 39:
            aGroup = _context.sent;
            GName.push(aGroup.GName);
            status = true;
            error_msg = "Successed!";
            _context.next = 51;
            break;

          case 45:
            _context.prev = 45;
            _context.t0 = _context["catch"](5);
            console.log(_context.t0);
            status = false;
            error_msg = "Something wrong...";
            ;

          case 51:
            return _context.abrupt("return", {
              status: status,
              GID: GID,
              GName: GName,
              error_msg: error_msg
            });

          case 52:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 45]]);
  }));
  return _joinGroup.apply(this, arguments);
}

var _default = joinGroup;
exports["default"] = _default;
//# sourceMappingURL=joinGroup.js.map