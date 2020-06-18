const express = require("express");
const { check } = require("express-validator");

const reviewsControllers = require("../controllers/reviews-controllers");

const router = express.Router();

router.get("/:rid", reviewsControllers.getReviewById);
router.get("/group/:gid", reviewsControllers.getReviewsByGroupId);
// router.get("/review/:aid", reviewsControllers.);

router.post(
  "/create",
  [
    check("reviewerName").not().isEmpty(),
    check("reviewRating").not().isEmpty(),
  ],
  reviewsControllers.createReview
);

router.patch(
  "/:rid",
  [
    check("reviewerName").not().isEmpty(),
    check("reviewRating").not().isEmpty(),
  ],
  reviewsControllers.updateReview
);

router.delete("/:rid", reviewsControllers.deleteReview);

module.exports = router;
