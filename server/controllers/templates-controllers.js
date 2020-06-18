const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const Template = require("../models/template-model");
const User = require("../models/user-model");
const Account = require("../models/account-model");

const HttpError = require("../models/http-error");

const getTemplateById = async (req, res, next) => {
  const templateId = req.params.tid;

  let template;
  try {
    template = await Template.findById(templateId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not locate template",
      500
    );

    return next(error);
  }

  if (!template) {
    const error = new HttpError(
      "Could not locate template with the specified ID.",
      404
    );

    return next(error);
  }

  res.json({ template: template.toObject({ getters: true }) });
};

// const getTemplatesByGroupId = async (req, res, next) => {
//   const groupId = req.params.gid;

//   let groupWithTemplates;
//   try {
//     groupWithTemplates = Group.findById(groupId).populate("groupTemplates");
//   } catch (err) {
//     const error = new HttpError(
//       "Fetching templates for this group failed, please try again later.",
//       500
//     );
//     return next(error);
//   }

//   if (groupWithTemplates.length === 0) {
//     const error = new HttpError(
//       "There are no templates for this specified group. Create one?",
//       404
//     );
//   }

//   if (groupWithTemplates === null) {
//     const error = new HttpError(
//       "Could not find and templates for this group ID.",
//       404
//     );
//     return next(error);
//   }
//   res.json({
//     templates: groupWithTemplates.templates.map((template) =>
//       template.toObject({ getters: true })
//     ),
//   });
// };

const getTemplatesByAccountId = async (req, res, next) => {
  const accountId = req.params.aid;

  let accountWithTemplates;
  try {
    accountWithTemplates = await Account.findById(accountId).populate(
      "accountTemplates"
    );
    console.log(typeof accountWithTemplates);
  } catch (err) {
    const error = new HttpError(
      "Fetching templates for this account failed, please try again later.",
      500
    );
    return next(error);
  }

  if (accountWithTemplates.length === 0) {
    const error = new HttpError(
      "There are no templates for this specified account. Create one?",
      404
    );
    return next(error);
  }

  if (accountWithTemplates === null) {
    const error = new HttpError(
      "Could not find any templates for this account ID.",
      404
    );
    return next(error);
  }
  res.json({
    accountTemplates: accountWithTemplates.accountTemplates.map((template) =>
      template.toObject({ getters: true })
    ),
  });
};

// TODO Structure DB to allow filtering for templates by account i.e. const getTemplatesByAccountId

const createTemplate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors) {
    return next(
      new HttpError("Invalid login inputs passed, please check your data.", 422)
    );
  }

  const {
    templateTitle,
    templateContent,
    templateCreator,
    templateAccount,
  } = req.body;

  const createdTemplate = new Template({
    templateTitle,
    templateContent,
    templateCreator,
    templateAccount,
    // templateUsedCount: 0,
  });

  let user;
  try {
    user = await User.findById(templateCreator);
  } catch (err) {
    const error = new HttpError(
      "Creating template failed, please try again later.",
      500
    );
    return next(error);
  }
  console.log(user);
  if (!user) {
    const error = new HttpError(
      "Could not find user by the specified Creator ID.",
      404
    );
    return next(error);
  }

  let account;
  try {
    account = await Account.findById(templateAccount);
  } catch (err) {
    const error = new HttpError(
      "Creating template failed, please try again later",
      500
    );
    return next(error);
  }

  if (!account) {
    const error = new HttpError(
      "Could not find a template by the specified Account ID.",
      404
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTemplate.save({ session: sess });
    account.accountTemplates.push(createdTemplate);
    await account.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating Template failed to save, please try again.",
      500
    );
    return next(error);
  }
  res.status(201).json({ template: createdTemplate });
};

const updateTemplate = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { templateTitle, templateContent, templateLastEditedBy } = req.body;

  const templateId = req.params.tid;

  let template;
  try {
    template = await Template.findById(templateId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update template.",
      500
    );
    return next(error);
  }

  template.templateTitle = templateTitle;
  template.templateContent = templateContent;
  template.templateLastEdited = Date.now();
  template.templateLastEditedBy = templateLastEditedBy;

  try {
    await template.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not save template.",
      500
    );
    return next(error);
  }
  res.status(200).json({ template: template.toObject({ getters: true }) });
};

const deleteTemplate = async (req, res, next) => {
  const templateId = req.params.tid;

  let template;
  try {
    template = await Template.findById(templateId).populate("templateAccount");
  } catch (err) {
    const error = new HttpError(
      "Could not delete Template. Please try again later.",
      500
    );
    return next(error);
  }
  if (!template) {
    console.log("noTemplateError");
    const error = new HttpError(
      "Could not find Template by the specified ID.",
      404
    );
    return next(error);
  }

  // let account;
  // try {
  //   account = await Account.findById(template.templateAccount);
  // } catch (err) {
  //   const error = new HttpError(
  //     "Could not sync template with account ID. Please try again.",
  //     500
  //   );
  //   return next(error);
  // }

  // if (!account) {
  //   const error = new HttpError(
  //     "Could not delete a template linked with the specified Account ID.",
  //     404
  //   );
  //   return next(error);
  // }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await template.remove({ session: sess });
    template.templateAccount.accountTemplates.pull(template);
    await template.templateAccount.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong at the last hurdle, could not delete template.",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "Deleted template." });
};

exports.getTemplateById = getTemplateById;
// exports.getTemplatesByGroupId = getTemplatesByGroupId;
exports.getTemplatesByAccountId = getTemplatesByAccountId;
exports.createTemplate = createTemplate;
exports.updateTemplate = updateTemplate;
exports.deleteTemplate = deleteTemplate;
