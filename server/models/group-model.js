const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  groupName: { type: String, required: true },
  groupDescription: { type: String, required: true },
  groupCreator: { type: mongoose.Types.ObjectId, ref: "User" },
  groupAccount: { type: mongoose.Types.ObjectId, ref: "Account" },
  groupUsers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  groupReviews: [{ type: mongoose.Types.ObjectId, ref: "Review", default: [] }],
  groupFeedback: [
    { type: mongoose.Types.ObjectId, ref: "Feedback", default: [] },
  ],
  groupMessages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
  groupConnections: [{ type: mongoose.Types.ObjectId, ref: "Connection" }],
  groupCreated: { type: Date, required: true, default: Date.now() },

  // groupReviewCount: { type: Number, default: 0 },
  // groupMessageCount: { type: Number, default: 0 },
  // groupUserCount: { type: Number, default: 0 },
  // groupTemplateCount: { type: Number, default: 0 },
  // groupConnectCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Group", groupSchema);
