const express = require("express");

const connectControllers = require("../controllers/connect-controllers");

const router = express.Router();

router.get("/:cid", connectControllers.getConnectionById);

router.get("/group/:gid", connectControllers.getConnectionsByGroupId);

router.patch("/:cid", connectControllers.updateConnection);

module.exports = router;
