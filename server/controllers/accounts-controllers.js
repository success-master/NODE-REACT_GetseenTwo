const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const Account = require("../models/account-model");
const Group = require("../models/group-model");
const User = require("../models/user-model");
const Template = require("../models/template-model");

const getAccounts = async (req, res, next) => {
  let accounts;
  try {
    accounts = await Account.find({}, "-userPassword");
  } catch (err) {
    const error = new HttpError(
      "Fetching accounts failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    accounts: accounts.map((account) => account.toObject({ getters: true })),
  });
};

const getAccountById = async (req, res, next) => {
  const accountId = req.params.aid;

  let account;
  try {
    account = await Account.findById(accountId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find an account.",
      500
    );
    return next(error);
  }

  if (!account) {
    const error = new HttpError(
      "Could not find a account for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ account: account.toObject({ getters: true }) });
};

const createAccount = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const {
    accountName,
    userFirstName,
    userLastName,
    userEmail,
    userPassword,
  } = req.body;

  let existingAccount;
  try {
    existingAccount = await User.findOne({ userEmail: userEmail });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingAccount) {
    const error = new HttpError(
      "Account exists already, please Login instead.",
      422
    );
    return next(error);
  }

  const createdAccount = new Account({
    accountName,
    accountGroups: [],
    accountUsers: [],
    accountCreated: Date.now(),
  });

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(userPassword, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create a secure user password LOL, so we've stopped this operation.",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    userFirstName,
    userLastName,
    userEmail,
    userPassword: hashedPassword,
    userAccount: createdAccount.id,
    userGroups: [],
    userPreferences: [
      { notifications: true, marketing: true, relevance: true },
    ],
    userIsAdmin: true,
    userCreated: Date.now(),
  });

  const createdGroup = new Group({
    groupName: accountName,
    groupAccount: createdAccount.id,
    groupDescription: "My First Group",
    groupCreator: createdUser._id,
    groupUsers: [],
    groupCreated: Date.now(),
  });

  const createdTemplate = new Template({
    templateTitle: "Positive Review Response",
    templateContent:
      "Hi --Customer Name--, thanks so much for the 5-stars! Your review really makes a difference, so thanks again. Hope to see you again soon!" +
      createdUser.userFirstName,
    templateAccount: createdAccount._id,
    templateCreator: createdUser._id,
    templateGroup: createdGroup._id,
    templateCreated: Date.now(),
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    createdAccount.accountGroups.push(createdGroup);
    createdAccount.accountUsers.push(createdUser);
    createdAccount.accountTemplates.push(createdTemplate);
    await createdAccount.save({ session: sess });

    createdUser.userGroups.push(createdGroup);
    await createdUser.save({ session: sess });

    createdGroup.groupUsers.push(createdUser);
    await createdGroup.save({ session: sess });

    await createdTemplate.save({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating account failed at the last hurdle, please try again.",
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        accountId: createdAccount.id,
        userEmail: createdUser.userEmail,
        isAdmin: createdUser.userIsAdmin,
        userGroups: createdUser.userGroups,
        userFirstName: createdUser.userFirstName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Creating account failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({
    userId: createdUser.id,
    accountId: createdAccount.id,
    userEmail: createdUser.userEmail,
    isAdmin: createdUser.userIsAdmin,
    userGroups: createdUser.userGroups,
    userFirstName: createdUser.userFirstName,
    token: token,
    message: "Created account successfully.",
  });
};

exports.getAccounts = getAccounts;
exports.getAccountById = getAccountById;
exports.createAccount = createAccount;
