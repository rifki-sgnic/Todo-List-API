require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./models");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const https = require("https");
const fs = require("fs");

/* Middlewares */
const isAuth = require("./middlewares/isAuth");

/* Routes */
const indexRouter = require("./routes/index");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const usersRouter = require("./routes/users");
const todosRouter = require("./routes/todos");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: true }));

app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", isAuth, logoutRouter);
app.use("/users", isAuth, usersRouter);
app.use("/todos", isAuth, todosRouter);

if (process.env.NODE_ENV === "production") {
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/13-213-0-190.nip.io/privkey.pem",
    "utf-8"
  );

  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/13-213-0-190.nip.io/cert.pem",
    "utf-8"
  );

  const credentials = { key: privateKey, cert: certificate };

  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(PORT);
}

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
  });
});

// module.exports = app;
