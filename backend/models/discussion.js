import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DiscussionSchema = new Schema({
  admin: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  subject:{ 
    type: String,
    required: true,
  },
  time_start:{
    type: Date,
    required: true,
  },
  time_end:{
    type: Date,
    required: true,
  },
  time_span:{
    type: Number,
    enum: [30, 60, 120],
    default: 60,
  },
  time_options:{
    type: Map,
    of: [{type: mongoose.Types.ObjectId, ref:"User"}],
    default: {},
  },
  deadline:{
    type: Date,
    required: true,
  },
  time_result:{
    type: Date,
    default:new Date(0) //Thu Jan 01 1970 08:00:00 GMT+0800 (GMT+08:00)
  },
  place_options:{
    type: Map,
    of: [{type: mongoose.Types.ObjectId, ref:"User"}],
    default: {},
  },
  place_result:{
    type:String,
    default:"",
  },
  content:{
    type:String,
    default: "",
  },

  // time_voted:

  // default: []

  // place_voted:

  // default: []
})

// Creating a table within database with the defined schema
const Discussion = mongoose.model('Discussion', DiscussionSchema)

// Exporting table for querying and mutating
export default Discussion;