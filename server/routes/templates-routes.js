const express = require("express");
const { check } = require("express-validator");

const templatesControllers = require("../controllers/templates-controllers");

const router = express.Router();

router.get("/:tid", templatesControllers.getTemplateById);
router.get("/account/:aid", templatesControllers.getTemplatesByAccountId);

router.post(
  "/create",
  [
    check("templateTitle").isLength({ min: 4 }),
    check("templateContent").isLength({ min: 28 }),
  ],
  templatesControllers.createTemplate
);

router.patch(
  "/:tid",
  [
    check("templateTitle").isLength({ min: 4 }),
    check("templateContent").isLength({ min: 28 }),
  ],
  templatesControllers.updateTemplate
);

router.delete("/:tid", templatesControllers.deleteTemplate);

module.exports = router;
