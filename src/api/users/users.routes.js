const express = require("express");
const { signInUser, logInUser, logOutUser } = require("./users.controller");
const passport = require("passport");
const usersRouter = express.Router();

usersRouter
  .post("/login", logInUser)
  .post("/signin", signInUser)
  .post("/logout", logOutUser)
  .post("/test", (req, res) => {
    console.log(`user authenticated`, req.user);
    return res.status(200).json(req.user);
  });

module.exports = usersRouter;
