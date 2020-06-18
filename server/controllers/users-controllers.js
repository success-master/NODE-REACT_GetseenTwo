const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/user-model");
const Group = require("../models/group-model");
const Account = require("../models/account-model");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-userPassword");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const getUserById = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  let userGroups;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a user.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find a user for the provided id.",
      404
    );
    return next(error);
  }

  console.log("server1");
  console.log(user);
  res.json({ user: user.toObject({ getters: true }) });
};

const getUsersByGroupId = async (req, res, next) => {
  const groupId = req.params.gid;

  let groupWithUsers;
  try {
    groupWithUsers = await Group.findById(groupId).populate("groupUsers");
    console.log(typeof groupUsers);
  } catch (err) {
    const error = new HttpError(
      "Fetching users for a specific group failed, please try again later",
      500
    );
    return next(error);
  }

  if (!groupWithUsers) {
    return next(
      new HttpError("Could not find users for the provided group ID.", 404)
    );
  }

  res.json({
    groupUsers: groupWithUsers.groupUsers.map((user) =>
      user.toObject({ getters: true })
    ),
  });
};

const getUsersByAccountId = async (req, res, next) => {
  const accountId = req.params.aid;
  console.log(accountId);

  let accountUsers;
  try {
    accountUsers = await Account.findById(accountId).populate("accountUsers");
    console.log(typeof accountUsers);
  } catch (err) {
    const error = new HttpError(
      "Fetching users for a specific account failed, please try again later",
      500
    );
    return next(error);
  }

  if (!accountUsers) {
    return next(
      new HttpError("Could not find users for the provided account id.", 404)
    );
  }

  res.json({
    users: accountUsers.users.map((user) => user.toObject({ getters: true })),
  });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { userFirstName, userLastName, userEmail, userPassword } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ userEmail: userEmail });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(userPassword, 8);
  } catch (err) {
    const error = new HttpError(
      "Could not create a secure user password, so we've stopped this operation.",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    userFirstName,
    userLastName,
    userEmail,
    userPassword: hashedPassword,
    userGroups: [],
    userPreferences: [
      { notifications: true, marketing: true, relevance: true },
    ],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        accountId: createdUser.userAccount.id,
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
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({
    userId: createdUser.id,
    accountId: createdUser.userAccount,
    userEmail: createdUser.userEmail,
    isAdmin: createdUser.userIsAdmin,
    userGroups: createdUser.userGroups,
    userFirstName: createdUser.userFirstName,
    token: token,
    message: "Created user successfully.",
  });
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors) {
    return next(
      new HttpError("Invalid login inputs passed, please check your data.", 422)
    );
  }
  const { userEmail, userPassword } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ userEmail: userEmail });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed at the first hurdle, please try again later.",
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(
      userPassword,
      existingUser.userPassword
    );
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check you credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        token: token,
        userId: existingUser.id,
        accountId: existingUser.userAccount,
        isAdmin: existingUser.userIsAdmin,
        userGroups: existingUser.userGroups,

        // userEmail: existingUser.userEmail,
        // userFirstName: existingUser.userFirstName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed at the last hurdle, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    token: token,
    userId: existingUser.id,
    accountId: existingUser.userAccount,
    isAdmin: existingUser.userIsAdmin,
    userGroups: existingUser.userGroups,

    // userEmail: existingUser.userEmail,
    // userFirstName: existingUser.userFirstName,

    message: "Logged in successfully.",
  });
};

const updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { userFirstName, userLastName, userEmail, userGroups } = req.body;
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update your profile.",
      500
    );
    return next(error);
  }

  user.userFirstName = userFirstName;
  user.userLastName = userLastName;
  user.userEmail = userEmail;
  user.userGroups = userGroups;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update your profile.",
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const updatePreferences = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const userPreferences = req.body;
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update your preferences.",
      500
    );
    return next(error);
  }

  user.userPreferences[0] = userPreferences;

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update your preferences.",
      500
    );
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;

  let user;
  try {
    user = await User.findById(userId).populate("userAccount");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete user.",
      500
    );
    return next(error);
  }

  if (!user) {
    // console.log("noGroupError");
    const error = new HttpError("Could not find user for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    user.userAccount.accountUsers.pull(user);
    await user.userAccount.save({ session: sess });
    await user.remove({ session: sess });
    user.userGroups.groupUsers.pull(user);
    await user.userGroups.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, failed at the last hurdle.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted user." });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.getUsersByAccountId = getUsersByAccountId;
exports.getUsersByGroupId = getUsersByGroupId;
exports.signup = signup;
exports.login = login;
exports.updateUser = updateUser;
exports.updatePreferences = updatePreferences;
exports.deleteUser = deleteUser;
