const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewOrigin: { type: String, required: true, enum: ["google", "facebook"] },
  reviewerName: { type: String, required: true },
  reviewRating: { type: Number, required: true },
  reviewBody: { type: String, required: true },
  reviewResponded: { type: Boolean, default: false },
  reviewResponse: { type: String, default: "" },
  reviewGroup: { type: mongoose.Types.ObjectId, ref: "Group" },
  reviewResponseUser: { type: mongoose.Types.ObjectId, ref: "User" },

  reviewCreated: { type: Date, required: true, default: Date.now() },
});

module.exports = mongoose.model("Review", reviewSchema);
