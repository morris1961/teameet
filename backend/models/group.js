import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  GName: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  code: {
    type: String,
    unique: true,
    match: /^#/,
  },
  content: {
    type: Array,
    default: []
  },
  file: {
    type: String,
    default: "",
  },
  discussions: [{type: mongoose.Types.ObjectId, ref: "Discussion"}]
})

// Creating a table within database with the defined schema
const Group = mongoose.model('Group', GroupSchema)

// Exporting table for querying and mutating
export default Group;