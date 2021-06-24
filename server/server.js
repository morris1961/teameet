"use strict";

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _dotenvDefaults = _interopRequireDefault(require("dotenv-defaults"));

var _ws = _interopRequireDefault(require("ws"));

var _mongo = _interopRequireDefault(require("./functions/mongo.js"));

var _register = _interopRequireDefault(require("./functions/register.js"));

var _login = _interopRequireDefault(require("./functions/login.js"));

var _createGroup = _interopRequireDefault(require("./functions/createGroup.js"));

var _joinGroup = _interopRequireDefault(require("./functions/joinGroup.js"));

var _index = _interopRequireDefault(require("./functions/index.js"));

var _renewProfile = _interopRequireDefault(require("./functions/renewProfile.js"));

var _group = _interopRequireDefault(require("./functions/group.js"));

var _renewFile = _interopRequireDefault(require("./functions/renewFile.js"));

var _createDisscussion = _interopRequireDefault(require("./functions/createDisscussion.js"));

var _discussion = _interopRequireDefault(require("./functions/discussion.js"));

var _time = _interopRequireDefault(require("./functions/time.js"));

var _place = _interopRequireDefault(require("./functions/place.js"));

var _voteTime = _interopRequireDefault(require("./functions/voteTime.js"));

var _addPlace = _interopRequireDefault(require("./functions/addPlace.js"));

var _votePlace = _interopRequireDefault(require("./functions/votePlace.js"));

var _confirmTime = _interopRequireDefault(require("./functions/confirmTime.js"));

var _confirmPlace = _interopRequireDefault(require("./functions/confirmPlace.js"));

var _message2 = _interopRequireDefault(require("./functions/message.js"));

var _chat = _interopRequireDefault(require("./functions/chat.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenvDefaults["default"].config();

_mongo["default"].connect(); // import functions


// init server
var app = (0, _express["default"])();

var server = _http["default"].createServer(app);

app.use(_express["default"]["static"]("./public"));
var wss = new _ws["default"].Server({
  server: server
});
wss.on('connection', /*#__PURE__*/function () {
  var _connection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ws) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // init ws
            console.log('server connected!');

            ws.sendEvent = function (e) {
              return ws.send(JSON.stringify(e));
            }; // handle message


            ws.on('message', function incoming(message) {
              message = JSON.parse(message);
              var _message = message,
                  api = _message.api,
                  data = _message.data;
              console.log(api, data);
              var msg = {};
              msg.api = api;

              switch (api) {
                case "register":
                  (0, _register["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                  });
                  break;

                case "login":
                  (0, _login["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                    console.log("login_msg", msg);
                  });
                  break;

                case "index":
                  (0, _index["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                  });
                  break;

                case "createGroup":
                  (0, _createGroup["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                  });
                  break;

                case "joinGroup":
                  (0, _joinGroup["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                  });
                  break;

                case "renewProfile":
                  (0, _renewProfile["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                  });
                  break;

                case "group":
                  (0, _group["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                  });
                  break;

                case "renewFile":
                  (0, _renewFile["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                  });
                  break;

                case "createDiscussion":
                  (0, _createDisscussion["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                  });
                  break;

                case "discussion":
                  (0, _discussion["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                  });
                  break;

                case "time":
                  (0, _time["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                  });
                  break;

                case "place":
                  (0, _place["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                  });
                  break;

                case "voteTime":
                  (0, _voteTime["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                  });
                  break;

                case "addPlace":
                  (0, _addPlace["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                  });
                  break;

                case "votePlace":
                  (0, _votePlace["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                  });
                  break;

                case "confirmPlace":
                  (0, _confirmPlace["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                  });
                  break;

                case "confirmTime":
                  (0, _confirmTime["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                  });
                  break;

                case "chat":
                  (0, _chat["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                  });
                  break;

                case "message":
                  (0, _message2["default"])(data).then(function (ret) {
                    msg.data = ret;
                    ws.sendEvent(msg);
                  });
                  break;

                default:
                  console.log(message);
                  break;
              }
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  function connection(_x) {
    return _connection.apply(this, arguments);
  }

  return connection;
}());
var PORT = process.env.port || 4000;
server.listen(PORT, function () {
  console.log("Listening on http://localhost:".concat(PORT));
});
//# sourceMappingURL=server.js.map