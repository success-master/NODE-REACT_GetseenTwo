const express = require("express");
const { check } = require("express-validator");

const feedbackControllers = require("../controllers/feedback-controllers");

const router = express.Router();

router.get("/:fid", feedbackControllers.getFeedbackById);
router.get("/group/:gid", feedbackControllers.getFeedbacksByGroupId);
// router.get("/feedback/:aid", feedbackControllers.getFeedbacksByAccountId);

router.post(
  "/create",
  [
    check("feedbackScore").not().isEmpty(),
    check("feedbackCustomer").not().isEmpty(),
  ],
  feedbackControllers.createFeedback
);

router.patch(
  "/:fid",
  [
    check("feedbackCustomer").not().isEmpty(),
    check("feedbackScore").not().isEmpty(),
  ],
  feedbackControllers.updateFeedback
);

router.delete("/:fid", feedbackControllers.deleteFeedback);

module.exports = router;
