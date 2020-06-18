const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const templateSchema = new Schema({
  templateTitle: { type: String, required: true },
  templateContent: { type: String, required: true },
  templateCreator: {
    type: mongoose.Types.ObjectId,

    ref: "User",
  },
  templateAccount: {
    type: mongoose.Types.ObjectId,

    ref: "Account",
  },
  templateCreated: { type: Date, default: Date.now },

  templateLastEdited: { type: Date },
  templateLastEditedBy: {
    type: mongoose.Types.ObjectId,

    ref: "User",
  },

  // templateUsedCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Template", templateSchema);
