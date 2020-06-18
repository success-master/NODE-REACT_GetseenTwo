const express = require("express");
const { check } = require("express-validator");

const messageControllers = require("../controllers/message-controllers");

const router = express.Router();

router.get("/:mid", messageControllers.getMessageById);
// router.get("/account/:aid", messageControllers.getMessagesByAccountId);
router.get("/group/:gid", messageControllers.getMessagesByGroupId);
router.get("/user/:uid", messageControllers.getMessagesByUserId);

router.post(
  "/create",
  [
    check("messageTo").not().isEmpty(),
    check("messageContent").isLength({ min: 28 }),
  ],
  messageControllers.createMessage
);

// router.patch(
//   "/:pid",
//   [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
//   placesControllers.updatePlace
// );

router.delete("/:mid", messageControllers.deleteMessage);

module.exports = router;
