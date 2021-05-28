import mongoose from 'mongoose';
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
    unique: true,
  },
  UName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  groups: [{ type: mongoose.Types.ObjectId, ref: "Group" }],
})

// Creating a table within database with the defined schema
const User = mongoose.model('User', UserSchema)

// Exporting table for querying and mutating
export default User;