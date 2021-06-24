"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var GroupSchema = new Schema({
  GName: {
    type: String,
    required: true
  },
  admin: {
    type: _mongoose["default"].Types.ObjectId,
    required: true,
    ref: 'User'
  },
  code: {
    type: String,
    unique: true,
    match: /^#/
  },
  messages: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: "Message"
  }],
  file: {
    type: String,
    "default": ""
  },
  discussions: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: "Discussion"
  }]
}); // Creating a table within database with the defined schema

var Group = _mongoose["default"].model('Group', GroupSchema); // Exporting table for querying and mutating


var _default = Group;
exports["default"] = _default;
//# sourceMappingURL=group.js.map