const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, "super_secrecy");
    req.userData = {
      userId: decodedToken.userId,
      accountId: decodedToken.accountId,
      userEmail: decodedToken.userEmail,
      userFirstName: decodedToken.userFirstName,
      userGroups: decodedToken.userGroups,
    };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  }
};
