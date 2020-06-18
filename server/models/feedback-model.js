const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  feedbackScore: { type: Number, required: true },
  feedbackCustomer: { type: String, required: true },
  feedbackBody: {
    type: String,
    required: true,
    default: "No comment left by the customer.",
  },
  feedbackReminded: { type: Boolean, required: true, default: false },
  feedbackFrom: {
    type: String,
    // required: true,
    default: "Error finding contact",
  },
  feedbackGroup: { type: mongoose.Types.ObjectId, ref: "Group" },
  feedbackSentFrom: { type: mongoose.Types.ObjectId, ref: "User" },

  feedbackCreated: { type: Date, required: true, default: Date.now() },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
