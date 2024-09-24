const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  remit: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  recep: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  messageText: {
    type: String,
    required: true,
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
}
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;