const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Group = require("../models/group-model");
const User = require("../models/user-model");
const Account = require("../models/account-model");

const getGroups = async (req, res, next) => {
  let groups;
  try {
    groups = await Group.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching groups failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    groups: groups.map((group) => group.toObject({ getters: true })),
  });
};

const getGroupById = async (req, res, next) => {
  const groupId = req.params.gid;

  let group;
  try {
    group = await Group.findById(groupId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find groups for this account.",
      500
    );
    return next(error);
  }

  if (!group) {
    const error = new HttpError(
      "Could not find a group for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ group: group.toObject({ getters: true }) });
};

const getGroupsByAccountId = async (req, res, next) => {
  const accountId = req.params.aid;
  console.log(accountId);

  let accountGroups;
  try {
    accountGroups = await Account.findById(accountId).populate("accountGroups");
    console.log(typeof accountGroups, accountGroups);
  } catch (err) {
    const error = new HttpError(
      "Fetching groups for this account failed, please try again later",
      500
    );
    return next(error);
  }

  if (!accountGroups /*  || accountGroups.places.length === 0 */) {
    return next(
      new HttpError("Could not find groups for the provided account id.", 404)
    );
  }

  res.json({
    accountGroups: accountGroups.accountGroups.map((group) =>
      group.toObject({ getters: true })
    ),
  });
};

const getGroupsByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  console.log(userId);

  let userGroups;
  try {
    userGroups = await User.findById(userId).populate("userGroups");
    console.log(typeof userGroups, userGroups);
  } catch (err) {
    const error = new HttpError(
      "Fetching a users groups failed, please try again later",
      500
    );
    return next(error);
  }

  if (!userGroups /*  || accountGroups.places.length === 0 */) {
    return next(
      new HttpError("Could not find groups for the provided user id.", 404)
    );
  }

  res.json({
    userGroups: userGroups.userGroups.map((group) =>
      group.toObject({ getters: true })
    ),
  });
};

const createGroup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { groupName, groupDescription } = req.body;
  // console.log(groupName, groupDescription, groupCreator, groupAccount);

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("Creating group failed, please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  let account;
  try {
    account = await Account.findById(req.userData.accountId);
  } catch (err) {
    const error = new HttpError(
      "Could not push this group to an account ID. Please try again.",
      500
    );
    return next(error);
  }

  if (!account) {
    const error = new HttpError(
      "Could not find a account for the provided id",
      404
    );
    return next(error);
  }

  const createdGroup = new Group({
    groupName,
    groupDescription,
    groupCreator: req.userData.userId,
    groupAccount: req.userData.accountId,
    groupUsers: [],
  });

  // console.log("user: ", user);
  // console.log("createdGroup: ", createdGroup);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdGroup.save({ session: sess });
    user.userGroups.push(createdGroup);
    await user.save({ session: sess });
    account.accountGroups.push(createdGroup);
    await account.save({ session: sess });
    // Save groupCreator into array of groupUsers
    createdGroup.groupUsers.push(user);
    await createdGroup.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating group failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ group: createdGroup });
};

const updateGroup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { groupName, groupDescription } = req.body;
  const groupId = req.params.gid;

  let group;
  try {
    group = await Group.findById(groupId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update group.",
      500
    );
    return next(error);
  }

  if (group.groupAccount.toString() !== req.userData.accountId) {
    const error = new HttpError(
      "You are not allowed to update this group.",
      401
    );
    return next(error);
  }

  group.groupName = groupName;
  group.groupDescription = groupDescription;

  try {
    await group.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update group.",
      500
    );
    return next(error);
  }

  res.status(200).json({ group: group.toObject({ getters: true }) });
};

const deleteGroup = async (req, res, next) => {
  const groupId = req.params.gid;

  let group;
  try {
    group = await Group.findById(groupId)
      .populate("groupCreator")
      .populate("groupAccount");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete group.",
      500
    );
    return next(error);
  }

  if (!group) {
    // console.log("noGroupError");
    const error = new HttpError("Could not find group for this id.", 404);
    return next(error);
  }

  if (group.groupAccount.id !== req.userData.accountId) {
    const error = new HttpError(
      "You are not allowed to delete this group.",
      401
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await group.remove({ session: sess });
    group.groupCreator.userGroups.pull(group);
    await group.groupCreator.save({ session: sess });
    group.groupAccount.accountGroups.pull(group);
    await group.groupAccount.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, could not delete group.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted group." });
};

exports.getGroups = getGroups;
exports.getGroupById = getGroupById;
exports.getGroupsByAccountId = getGroupsByAccountId;
exports.getGroupsByUserId = getGroupsByUserId;
exports.createGroup = createGroup;
exports.updateGroup = updateGroup;
exports.deleteGroup = deleteGroup;
