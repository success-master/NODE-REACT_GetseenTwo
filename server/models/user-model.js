const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userPreferencesSchema = new Schema(
  {
    notifications: { type: Boolean, default: true },
    marketing: { type: Boolean, default: true },
    relevance: { type: Boolean, default: true },
  },
  { _id: false }
);

const userSchema = new Schema({
  userFirstName: { type: String, required: true },
  userLastName: { type: String, required: true },
  userEmail: { type: String, required: true, unique: true },
  userPassword: { type: String, required: true, minlength: 6 },
  userAccount: {
    type: mongoose.Types.ObjectId,
    ref: "Account",
  },
  userGroups: [{ type: mongoose.Types.ObjectId, required: true, ref: "Group" }],
  userMessages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
  userPreferences: [userPreferencesSchema],
  userIsAdmin: { type: Boolean, default: false },

  userCreated: { type: Date, required: true, default: Date.now() },

  // userMessageCount: { type: Number, default: 0 },
  // userReviewResponseCount: { type: Number, default: 0 },
  // userInviteCount: { type: Number, default: 0 },
  // userReferralCount: { type: Number, default: 0 },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
