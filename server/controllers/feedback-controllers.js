const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Feedback = require("../models/feedback-model");
const Group = require("../models/group-model");

const getFeedbackById = async (req, res, next) => {
  const feedbackId = req.params.fid;

  let feedback;
  try {
    feedback = await Feedback.findById(feedbackId);
  } catch (err) {
    const error = new HttpError(
      "Could not fetch that feedback, please try again",
      500
    );
    return next(error);
  }

  if (!feedback) {
    return next(
      new HttpError("Could not find a feedback by that feedback ID.", 404)
    );
  }
  res.json({ feedback: feedback.toObject({ getters: true }) });
};

const getFeedbacksByGroupId = async (req, res, next) => {
  const groupId = req.params.gid;

  let groupWithFeedbacks;
  try {
    groupWithFeedbacks = await Group.findById(groupId).populate(
      "groupFeedback"
    );
    console.log(typeof groupWithFeedbacks);
  } catch (err) {
    const error = new HttpError(
      "Could not fetch group feedback, please try again",
      500
    );
    return next(error);
  }

  if (!groupWithFeedbacks || groupWithFeedbacks.groupFeedback.length === 0) {
    return next(
      new HttpError("Could not find feedback for the provided group ID.", 404)
    );
  }

  res.json({
    groupFeedback: groupWithFeedbacks.groupFeedback.map((feedback) =>
      feedback.toObject({ getters: true })
    ),
  });
};

const createFeedback = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, could not create review.", 422)
    );
  }

  const { feedbackScore, feedbackCustomer, feedbackBody } = req.body;

  const createdFeedback = {
    feedbackScore,
    feedbackCustomer,
    feedbackBody,
  };

  try {
    await createdFeedback.save();
  } catch (err) {
    const error = new HttpError(
      "Could not create feedback, please try again",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ feedback: createdFeedback.toObject({ getters: true }) });
};

const updateFeedback = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const {
    feedbackScore,
    feedbackCustomer,
    feedbackBody,
    feedbackReminded,
    feedbackGroup,
  } = req.body;
  const feedbackId = req.params.fid;

  let feedback;
  try {
    feedback = await Feedback.findById(feedbackId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update feedback.",
      500
    );
    return next(error);
  }

  if (!feedback) {
    const error = new HttpError(
      "Could not find feedback by the specified ID.",
      404
    );
    return next(error);
  }

  (feedback.feedbackScore = feedbackScore),
    (feedback.feedbackCustomer = feedbackCustomer),
    (feedback.feedbackBody = feedbackBody),
    (feedback.feedbackReminded = feedbackReminded),
    (feedback.feedbackGroup = feedbackGroup);

  try {
    await feedback.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update feedback at the last hurdle.",
      500
    );
    return next(error);
  }

  res.status(200).json({ feedback: feedback.toObject({ getters: true }) });
};

const deleteFeedback = async (req, res, next) => {
  const feedbackId = req.params.fid;

  let feedback;
  try {
    feedback = await Feedback.findById(feedbackId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete review.",
      500
    );
    return next(error);
  }

  if (!feedback) {
    const error = new HttpError(
      "Could not delete a feedback that doesn't exist.",
      404
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted feedback successfully." });
};

exports.getFeedbackById = getFeedbackById;
exports.getFeedbacksByGroupId = getFeedbacksByGroupId;
exports.createFeedback = createFeedback;
exports.updateFeedback = updateFeedback;
exports.deleteFeedback = deleteFeedback;
