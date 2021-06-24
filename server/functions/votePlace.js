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
function votePlace(_x) {
  return _votePlace.apply(this, arguments);
}

function _votePlace() {
  _votePlace = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
    var UID, DID, places, status, error_msg, discussion, place_options, j, _iterator, _step, _step$value, key, value, i;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            UID = _ref.UID, DID = _ref.DID, places = _ref.places;
            status = false;
            error_msg = "Something wrong...";
            _context.prev = 3;
            _context.next = 6;
            return _discussion["default"].findById(DID);

          case 6:
            discussion = _context.sent;

            if (discussion) {
              _context.next = 11;
              break;
            }

            status = false;
            error_msg = "The discussion is not valid!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 11:
            if (!(new Date().getTime() - discussion.deadline.getTime() >= 0)) {
              _context.next = 15;
              break;
            }

            status = false;
            error_msg = "The deadline has arrived!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 15:
            place_options = discussion.place_options;
            j = 0;

          case 17:
            if (!(j < places.length)) {
              _context.next = 47;
              break;
            }

            _iterator = _createForOfIteratorHelper(place_options);
            _context.prev = 19;

            _iterator.s();

          case 21:
            if ((_step = _iterator.n()).done) {
              _context.next = 36;
              break;
            }

            _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], value = _step$value[1];

            if (!(key === places[j])) {
              _context.next = 34;
              break;
            }

            i = 0;

          case 25:
            if (!(i < place_options.get(key).length)) {
              _context.next = 33;
              break;
            }

            if (!(UID.toString() === place_options.get(key)[i].toString())) {
              _context.next = 30;
              break;
            }

            status = false;
            error_msg = "The place has been voted by this user!";
            return _context.abrupt("return", {
              status: status,
              error_msg: error_msg
            });

          case 30:
            i++;
            _context.next = 25;
            break;

          case 33:
            place_options.get(key).push(UID);

          case 34:
            _context.next = 21;
            break;

          case 36:
            _context.next = 41;
            break;

          case 38:
            _context.prev = 38;
            _context.t0 = _context["catch"](19);

            _iterator.e(_context.t0);

          case 41:
            _context.prev = 41;

            _iterator.f();

            return _context.finish(41);

          case 44:
            j++;
            _context.next = 17;
            break;

          case 47:
            _context.next = 49;
            return discussion.updateOne({
              $set: {
                place_options: place_options
              }
            });

          case 49:
            status = true;
            error_msg = "Successed!";
            _context.next = 59;
            break;

          case 53:
            _context.prev = 53;
            _context.t1 = _context["catch"](3);
            console.log(_context.t1);
            status = false;
            error_msg = "Something wrong...";
            ;

          case 59:
            return _context.abrupt("return", {
              status: status,
              place_options: place_options,
              error_msg: error_msg
            });

          case 60:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 53], [19, 38, 41, 44]]);
  }));
  return _votePlace.apply(this, arguments);
}

var _default = votePlace;
exports["default"] = _default;
//# sourceMappingURL=votePlace.js.map