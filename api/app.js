const hemet = require("helmet");
const multer = require("multer");
const path = require("path");
const morgan = require("morgan");
const xss = require("xss-clean");
const rareLimiter = require("express-rate-limit");
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const ukekwaRouter = require("./routes/ukekwa");
const umushyitsiRouter = require("./routes/umushyitsi");
const chatRouter = require("./routes/Iganiriro");
const reportRouter = require("./routes/report");
const subizaRouter = require("./routes/subiza");
const caseRouter = require("./routes/case");
const taskRouter = require("./routes/task");
const marketRouter = require("./routes/market");
const gahundaRouter = require("./routes/appointment");
const eventRouter = require("./routes/uruhushya");
const imihigoRouter = require("./routes/imihigo");
const messageRouter = require("./routes/message");
const { isAuth } = require("./middleware/authentication");
const { escalateSchedure } = require("./utils");
const laws = require("./laws");

//set proxy

// connectDB
app.use(express.json());
app.use(hemet());

app.set("trust proxy", 1);
app.use(xss());
app.use(morgan("common"));
app.use(
  rareLimiter({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, //limit each IP to requests per windowMs
  })
);
app.use("/images", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRouter);
app.use("/api/post", isAuth, postRouter);
app.use("/api/ukekwa", isAuth, ukekwaRouter);
app.use("/api/umushyitsi", isAuth, umushyitsiRouter);
app.use("/api/chat", isAuth, chatRouter);
app.use("/api/subiza", isAuth, subizaRouter);
app.use("/api/report", isAuth, reportRouter);
app.use("/api/messages", isAuth, messageRouter);
app.use("/api/tasks", isAuth, taskRouter);
app.use("/api/imihigo", isAuth, imihigoRouter);
app.use("/api/gahunda", isAuth, gahundaRouter);
app.use("/api/event", isAuth, eventRouter);
app.use("/api/isoko", isAuth, marketRouter);
app.use("/api/cases", isAuth, caseRouter);
app.get("/api/laws", isAuth, (req, res) => {
  res.send(laws);
});

const __dirnam = path.resolve();
app.use(express.static(path.join(__dirnam, "/muturage/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirnam, "/muturage/build/index.html"));
});

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
escalateSchedure();

start();
