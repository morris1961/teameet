"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _discussion = _interopRequireDefault(require("../models/discussion.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// function for every cases
function time(_x) {
  return _time.apply(this, arguments);
}

function _time() {
  _time = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var UID, DID, status, time_options, isDue, isAdmin, voted, error_msg, isSelect, time_result, discussion, old_time_options, _iterator, _step, _step$value, key, value, i;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            UID = _ref.UID, DID = _ref.DID;
            status = false;
            time_options = {};
            isDue = false;
            isAdmin = false;
            voted = false;
            error_msg = "Something wrong...";
            isSelect = false;
            time_result = "";
            _context.prev = 9;
            _context.next = 12;
            return _discussion["default"].findById(DID);

          case 12:
            discussion = _context.sent;

            if (discussion) {
              _context.next = 17;
              break;
            }

            status = false;
            error_msg = "The discussion is not valid!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 17:
            old_time_options = discussion.time_options;
            _iterator = _createForOfIteratorHelper(old_time_options);
            _context.prev = 19;

            _iterator.s();

          case 21:
            if ((_step = _iterator.n()).done) {
              _context.next = 35;
              break;
            }

            _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], value = _step$value[1];
            time_options[key.replace(" ", ".")] = value;

            if (voted) {
              _context.next = 33;
              break;
            }

            i = 0;

          case 26:
            if (!(i < value.length)) {
              _context.next = 33;
              break;
            }

            if (!(value[i].toString() === UID.toString())) {
              _context.next = 30;
              break;
            }

            voted = true;
            return _context.abrupt("break", 33);

          case 30:
            i++;
            _context.next = 26;
            break;

          case 33:
            _context.next = 21;
            break;

          case 35:
            _context.next = 40;
            break;

          case 37:
            _context.prev = 37;
            _context.t0 = _context["catch"](19);

            _iterator.e(_context.t0);

          case 40:
            _context.prev = 40;

            _iterator.f();

            return _context.finish(40);

          case 43:
            isDue = new Date().getTime() - discussion.deadline.getTime() >= 0;
            isAdmin = UID.toString() === discussion.admin.toString();
            time_result = discussion.time_result;
            isSelect = !(time_result.getTime() - new Date(0).getTime() === 0);
            status = true;
            error_msg = "Successed!";
            _context.next = 57;
            break;

          case 51:
            _context.prev = 51;
            _context.t1 = _context["catch"](9);
            console.log(_context.t1);
            status = false;
            error_msg = "Something wrong...";
            ;

          case 57:
            return _context.abrupt("return", {
              status: status,
              time_options: time_options,
              isDue: isDue,
              isAdmin: isAdmin,
              voted: voted,
              isSelect: isSelect,
              time_result: time_result,
              error_msg: error_msg
            });

          case 58:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 51], [19, 37, 40, 43]]);
  }));
  return _time.apply(this, arguments);
}

var _default = time;
exports["default"] = _default;
//# sourceMappingURL=time.js.map