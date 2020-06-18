const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Review = require("../models/review-model");
const Group = require("../models/group-model");

const getReviewById = async (req, res, next) => {
  const reviewId = req.params.rid;

  let review;
  try {
    review = await Review.findById(reviewId);
  } catch (err) {
    const error = new HttpError(
      "Could not fetch that review, please try again",
      500
    );
    return next(error);
  }

  if (!review) {
    return next(
      new HttpError("Could not find a review by that review ID.", 404)
    );
  }
  res.json({ review: review.toObject({ getters: true }) });
};

const getReviewsByGroupId = async (req, res, next) => {
  const groupId = req.params.gid;

  let groupWithReviews;
  try {
    groupWithReviews = await Group.findById(groupId).populate("groupReviews");
    console.log(typeof groupWithReviews);
  } catch (err) {
    const error = new HttpError(
      "Could not fetch group reviews, please try again",
      500
    );
    return next(error);
  }

  if (!groupWithReviews || groupWithReviews.groupReviews.length === 0) {
    return next(
      new HttpError("Could not find reviews for the provided group ID.", 404)
    );
  }

  res.json({
    groupReviews: groupWithReviews.groupReviews.map((review) =>
      review.toObject({ getters: true })
    ),
  });
};

const createReview = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, could not create review.", 422)
    );
  }

  const {
    reviewOrigin,
    reviewerName,
    reviewRating,
    reviewBody,
    reviewResponded,
    reviewResponse,
  } = req.body;

  const createdReview = {
    reviewOrigin,
    reviewerName,
    reviewRating,
    reviewBody,
    reviewResponded,
    reviewResponse,
  };

  try {
    await createdReview.save();
  } catch (err) {
    const error = new HttpError(
      "Could not create review, please try again",
      500
    );
    return next(error);
  }

  res.status(201).json({ review: createdReview.toObject({ getters: true }) });
};

const updateReview = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const {
    reviewRating,
    reviewBody,
    reviewResponded,
    reviewResponse,
    reviewResponseUser,
  } = req.body;
  const reviewId = req.params.rid;

  let review;
  try {
    review = await Review.findById(reviewId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update review",
      500
    );
    return next(error);
  }

  if (!review) {
    const error = new HttpError(
      "Could not find review by the specified ID.",
      404
    );
    return next(error);
  }

  review.reviewRating = reviewRating;
  review.reviewBody = reviewBody;
  review.reviewResponded = reviewResponded;
  review.reviewResponse = reviewResponse;
  review.reviewResponseUser = reviewResponseUser;

  try {
    await review.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update review at the last hurdle.",
      500
    );
    return next(error);
  }

  res.status(200).json({ review: review.toObject({ getters: true }) });
};

const deleteReview = async (req, res, next) => {
  const reviewId = req.params.rid;

  let review;
  try {
    review = await Review.findById(reviewId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete review.",
      500
    );
    return next(error);
  }

  if (!review) {
    const error = new HttpError(
      "Could not delete a review that doesn't exist.",
      404
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted review successfully." });
};

exports.getReviewById = getReviewById;
exports.getReviewsByGroupId = getReviewsByGroupId;
exports.createReview = createReview;
exports.updateReview = updateReview;
exports.deleteReview = deleteReview;
