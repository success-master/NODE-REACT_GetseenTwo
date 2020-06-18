const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const User = require("../models/user-model");
const Group = require("../models/group-model");
const Message = require("../models/message-model");

const getMessageById = async (req, res, next) => {
  const messageId = req.params.mid;

  let message;
  try {
    message = await Message.findById(messageId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find this message.",
      500
    );
    return next(error);
  }

  if (!message) {
    const error = new HttpError(
      "Could not find a message by the provided message ID.",
      404
    );
    return next(error);
  }
  res.json({ message: message.toObject({ getters: true }) });
};

const getMessagesByGroupId = async (req, res, next) => {
  const groupId = req.params.gid;

  let groupMessages;
  try {
    groupMessages = await Group.findById(groupId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not locate message",
      500
    );
    return next(error);
  }

  if (!groupMessages) {
    const error = new HttpError(
      "Could not find any messages by the provided Group ID.",
      404
    );
    return next(error);
  }

  if (groupMessages.length === 0) {
    const error = new HttpError("This group has no messages to show", 200);
    return next(error);
  }
  res.json({
    messages: groupMessages.messages.map((message) => {
      message.toObject({ getters: true });
    }),
  });
};

const getMessagesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userMessages;
  try {
    userMessages = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not locate user messages",
      500
    );
    return next(error);
  }

  if (!userMessages) {
    const error = new HttpError(
      "Could not find any messages by the provided User ID.",
      404
    );
    return next(error);
  }

  if (userMessages.length === 0) {
    const error = new HttpError("This user has no messages to show", 200);
    return next(error);
  }
  res.json({
    messages: userMessages.messages.map((message) => {
      message.toObject({ getters: true });
    }),
  });
};

const createMessage = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { messageTo, messageBody, messageCreator, messageGroup } = req.body;

  let group;
  let user;
  try {
    group = await Group.findById(messageGroup);
    user = await User.findById(messageCreator);
  } catch (err) {
    const error = new HttpError(
      "Creating message failed, please try again",
      500
    );
    return next(error);
  }

  const createdMessage = new Message({
    messageTo,
    messageBody,
    messageGroup,
    messageCreator,
    //messageGroup
  });

  if (!user || !group) {
    const error = new HttpError(
      "Could not find a message user or group for the provided id",
      404
    );
    return next(error);
  }

  console.log(user);
  console.log(group);
  console.log(createdMessage);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdMessage.save({ session: sess });
    user.userMessages.push(createdMessage);
    await user.save({ session: sess });
    // Save created message into groupMessages relationship array
    group.groupMessages.push(createdMessage);
    await createdMessage.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating message failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ message: createdMessage });
};

const deleteMessage = async (req, res, next) => {
  const messageId = req.params.mid;

  let message;
  try {
    message = await Message.findById(messageId).populate("messageCreator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not discard message.",
      500
    );
    return next(error);
  }

  if (!message) {
    const error = new HttpError("Could not find message for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await message.remove({ session: sess });
    message.messageCreator.messages.pull(message);
    await message.messageCreator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete message.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted message." });
};

exports.getMessageById = getMessageById;
exports.getMessagesByGroupId = getMessagesByGroupId;
exports.getMessagesByUserId = getMessagesByUserId;
exports.createMessage = createMessage;
exports.deleteMessage = deleteMessage;

// let DUMMY_MESSAGES = [
//   {
//     id: "m1",
//     recipients: [
//       {
//         customerName: "Will Walsh",
//         emailOrMobile: "07888077505",
//       },
//       {
//         customerName: "Chris Swain",
//         emailOrMobile: "will@getseen.co.uk",
//       },
//       {
//         customerName: "Yuriy Christyakov",
//         emailOrMobile: "support@getseen.co.uk",
//       },
//     ],
//     template: 0,
//     message:
//       "Hi —Name— thanks so much for choosing getseen! Would you be able to leave us an online review? Here’s a link that makes it super simple: https://fdbc.co.uk/e12ds1",
//     sender: "Elon Musk",
//     customerCount: [3],
//     group: "g1",
//     account: "ac1",
//   },
//   {
//     id: "m2",
//     customers: [
//       {
//         customerName: "Steve Hughes",
//         emailOrMobile: "07888077505",
//       },
//       {
//         customerName: "Anne Rand",
//         emailOrMobile: "will@getseen.co.uk",
//       },
//       {
//         customerName: "Alice Wonder-land",
//         emailOrMobile: "support@getseen.co.uk",
//       },
//     ],
//     template: 0,
//     message: "Hey there, the feedback link is here: https://fdbc.co.uk/e12ds1",
//     sender: "u1",
//     customerCount: 3,
//     group: "g2",
//     account: "ac1",
//   },
// ];
