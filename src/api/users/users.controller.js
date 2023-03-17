const User = require("./users.model");
const passport = require("passport");

const signInUser = (req, res, next) => {
  const done = (error, user) => {
    if (error) return next(error);
    // return res.status(500).json(error.message);

    req.logIn(user, (error) => {
      if (error) return next(error);
      return res.status(201).json(user);
    });
  };
  passport.authenticate("signin", done)(req);
};

const logInUser = (req, res,next) => {
  const done = (error, user) => {
    if (error) return next(error);

    req.logIn(user, (error) => {
      if (error) return next(error);
      return res.status(200).json(user);
    });
  };
  passport.authenticate("login", done)(req);
};

const logOutUser = async (req, res) => {
  if (req.user) {
    await req.logout(() => {
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        return res.status(200).json("Goodbye G!");
      });
    });
  } else {
    return res.status(404).json("User not authenticated");
  }
};

module.exports = {
  signInUser,
  logInUser,
  logOutUser,
};
