"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var MessageSchema = new Schema({
  time: {
    type: Date,
    required: true
  },
  sender: {
    type: _mongoose["default"].Types.ObjectId,
    required: true,
    ref: 'User'
  },
  body: {
    type: String,
    required: true
  }
}); // Creating a table within database with the defined schema

var Message = _mongoose["default"].model('Message', MessageSchema); // Exporting table for querying and mutating


var _default = Message;
exports["default"] = _default;
//# sourceMappingURL=message.js.map