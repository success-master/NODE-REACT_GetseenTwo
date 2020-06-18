const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const accountRoutes = require("./routes/accounts-routes");
const connectRoutes = require("./routes/connect-routes");
const groupsRoutes = require("./routes/groups-routes");
const messageRoutes = require("./routes/message-routes");
const reviewsRoutes = require("./routes/reviews-routes");
const feedbackRoutes = require("./routes/feedback-routes");
const templatesRoutes = require("./routes/templates-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const adminPanelRoutes = require("./routes/admin-panel-routes");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  next();
});

app.use("/admin", adminPanelRoutes);

app.use("/api/accounts", accountRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/connect", connectRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/templates", templatesRoutes);
app.use("/api/messages", messageRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@tester-f2vhs.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 4242);
    console.log(`Server connected successfully on port ${process.env.PORT}.`);
  })
  .catch((err) => {
    console.log(err);
  });
