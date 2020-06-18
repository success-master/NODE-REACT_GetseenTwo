const express = require("express");
const { check } = require("express-validator");

const checkAuth = require("../middleware/check-auth");
const groupsControllers = require("../controllers/groups-controllers");

const router = express.Router();

router.get("/", groupsControllers.getGroups);
router.get("/:gid", groupsControllers.getGroupById);
router.get("/account/:aid", groupsControllers.getGroupsByAccountId);
router.get("/user/:uid", groupsControllers.getGroupsByUserId);

router.use(checkAuth);

router.post(
  "/create",
  [
    check("groupName").isLength({ min: 4 }),
    check("groupDescription").isLength({ min: 6 }),
  ],
  groupsControllers.createGroup
);

router.patch(
  "/:gid",
  [
    check("groupName").isLength({ min: 4 }),
    check("groupDescription").isLength({ min: 6 }),
  ],
  groupsControllers.updateGroup
);

router.delete("/:gid", groupsControllers.deleteGroup);

module.exports = router;
