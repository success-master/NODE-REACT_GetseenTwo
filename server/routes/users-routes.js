const express = require("express");
const { check } = require("express-validator");

const UsersControllers = require("../controllers/users-controllers");

const router = express.Router();

router.get("/", UsersControllers.getUsers);
router.get("/user/:uid", UsersControllers.getUserById);
router.get("/group/:gid", UsersControllers.getUsersByGroupId);
router.get("/account/:aid", UsersControllers.getUsersByAccountId);

router.post(
  "/vip-access",
  [
    check("userFirstName").not().isEmpty(),
    check("userLastName").not().isEmpty(),
    check("userEmail").normalizeEmail().isEmail(),
    check("userPassword").isLength({ min: 6 }),
  ],
  UsersControllers.signup
);

router.post(
  "/login",
  check("userPassword").isLength({ min: 6 }),
  UsersControllers.login
);

router.patch(
  "/user/:uid",
  [
    check("userFirstName").not().isEmpty(),
    check("userLastName").not().isEmpty(),
    check("userEmail").normalizeEmail().isEmail(),
  ],
  UsersControllers.updateUser
);

router.patch("/preferences/:uid", UsersControllers.updatePreferences);

router.delete("/user/:uid", UsersControllers.deleteUser);

module.exports = router;
