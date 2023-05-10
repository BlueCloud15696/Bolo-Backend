var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

let mongoose = require("mongoose");
let cors = require("cors");

var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var questionsRouter = require("./routes/question");
var developersRouter = require("./routes/developer");
var developersNewRouter = require("./routes/developer_new");
var meetingRouter = require("./routes/meeting");

// const connectionString =
//   "mongodb+srv://user1:fKv0VvLYqnpsugVx@cluster0.fvp09.mongodb.net/BoloAppDb?retryWrites=true&w=majority";

const connectionString = "mongodb://localhost:27017/BoloAppDb";
mongoose.connect(connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
var app = express();

const db = mongoose.connection;
db.on("error", (error) => {
  console.log("error", error);
});

db.once("open", async function () {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(cors());
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/questions", questionsRouter);
  app.use("/api/developers", developersRouter);
  app.use("/api/developers_new", developersNewRouter);
  app.use("/api/schedule", meetingRouter);

  app.listen(process.env.PORT || 4000, () => console.log("Listening 4000..."));
});

module.exports = app;
