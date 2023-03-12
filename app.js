require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const db = require("./models");
const PORT = process.env.PORT || 3000;
const cors = require('cors')

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
app.use(cors({origin: true}))

app.use("/", indexRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", isAuth, logoutRouter);
app.use("/users", isAuth, usersRouter);
app.use("/todos", isAuth, todosRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
  });
});

// module.exports = app;
