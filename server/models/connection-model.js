const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const connectionModel = new Schema({
  connectName: { type: String, required: true },
  connectPlatformName: { type: String, required: true },
  connectIconClass: { type: String, required: true },
  connectAvailable: { type: Boolean, required: true },
  connectConnected: { type: Boolean, required: true, default: false },
  connectGroup: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Group",
  },
  connectCreated: { type: Date, required: true, default: Date.now() },
  // connectApiRequestCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Connection", connectionModel);
