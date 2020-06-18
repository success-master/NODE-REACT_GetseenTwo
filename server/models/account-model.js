const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  accountName: { type: String, required: true },
  accountUserAdmin: { type: mongoose.Types.ObjectId, ref: "User" },
  accountGroups: [
    { type: mongoose.Types.ObjectId, required: true, ref: "Group" },
  ],

  accountUsers: [
    { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  ],
  accountTemplates: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Template",
    },
  ],

  accountCreated: { type: Date, required: true, default: Date.now() },

  // accountMessageCount: { type: Number, default: 0 },
  // accountGroupsCount: { type: Number, default: 0 },
  // accountUserCount: { type: Number, default: 0 },
  // accountReferralCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Account", accountSchema);
