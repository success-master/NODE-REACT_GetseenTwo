const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customersSchema = new Schema({
  customerName: { type: String, required: true },
  customerPhoneOrEmail: { type: String, required: true },
});

const messageSchema = new Schema({
  messageTo: [customersSchema],
  messageBody: { type: String, required: true, minlength: 28 },
  messageCreator: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },

  messageCreated: { type: Date, required: true, default: Date.now() },
  // messageToCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Message", messageSchema);
