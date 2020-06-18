const HttpError = require("../models/http-error");

const Connection = require("../models/connection-model");
const Group = require("../models/group-model");

const getConnectionById = async (req, res, next) => {
  const connectId = req.params.cid;
  let connection;
  try {
    connection = await Connection.findById(connectId);
  } catch (err) {
    const error = new HttpError(
      "Could not find a connection by the provided ID.",
      404
    );
    return next(error);
  }
  res.json({ connection: connection.toObject({ getters: true }) });
};

const getConnectionsByGroupId = async (req, res, next) => {
  const groupId = req.params.gid;

  let groupConnections;
  try {
    groupConnections = await Group.findById(groupId).populate("connections");
  } catch (err) {
    const error = new HttpError(
      "Fetching connections failed, please try again later",
      500
    );
    return next(error);
  }

  if (!groupConnections || groupConnections.places.length === 0) {
    return next(
      new HttpError("Could not find places for the provided group id.", 404)
    );
  }

  res.json({
    connections: groupConnections.connections.map((connection) =>
      connection.toObject({ getters: true })
    ),
  });
};

const updateConnection = async (req, res, next) => {
  const { connectConnected } = req.body;
  const connectId = req.params.cid;

  let connection;
  try {
    connection = await Connection.findById(connectId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  connection.connectConnected = connectConnected;

  try {
    await connection.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update connection.",
      500
    );
    return next(error);
  }

  res.status(200).json({ connection: connection.toObject({ getters: true }) });
};

exports.getConnectionById = getConnectionById;
exports.getConnectionsByGroupId = getConnectionsByGroupId;
exports.updateConnection = updateConnection;
