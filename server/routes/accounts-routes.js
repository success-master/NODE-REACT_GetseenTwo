const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");

const accountsControllers = require("../controllers/accounts-controllers");

const router = express.Router();

router.post(
  "/register",
  [
    check("userFirstName").not().isEmpty(),
    check("userLastName").not().isEmpty(),
    check("accountName").not().isEmpty(),
    check("userEmail").normalizeEmail().isEmail(),
    check("userPassword").isLength({ min: 6 }),
  ],
  accountsControllers.createAccount
);

router.use(checkAuth);

router.get("/", accountsControllers.getAccounts);
router.get("/:aid", accountsControllers.getAccountById);

// router.post("/login", accountsControllers.login);

module.exports = router;
