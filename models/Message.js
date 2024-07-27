import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  phone: {
    type: String,
  },
  body: {
    type: String
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Message = models.Message || model('Message', MessageSchema);

export default Message;