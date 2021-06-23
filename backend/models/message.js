import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  time: {
    type: Date,
    required: true,
  },
  sender: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  body: {
    type: String,
    required: true,
  },
})

// Creating a table within database with the defined schema
const Message = mongoose.model('Message', MessageSchema)

// Exporting table for querying and mutating
export default Message;