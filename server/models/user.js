"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
    unique: true
  },
  UName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  groups: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: "Group"
  }]
}); // Creating a table within database with the defined schema

var User = _mongoose["default"].model('User', UserSchema); // Exporting table for querying and mutating


var _default = User;
exports["default"] = _default;
//# sourceMappingURL=user.js.map