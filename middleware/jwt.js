const jwt = require("jsonwebtoken");
const UsersModel = require("../models/users.js");

module.exports = {
  authenticateToken: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send("error");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        return res.status(401).send(err);
      }
      const getUser = await UsersModel.findOne({ _id: user._id });
      if (!getUser) {
        return res.status(401).send(err);
      }
      req.user = user;
      next();
    });
  },
  isAdmin: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send("error");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) {
        return res.status(401).send(err);
      }
      if (!user.isAdmin) {
        return res.status(401).send(err);
      }
      const getUser = await UsersModel.findOne({ _id: user._id });
      if (getUser?.isAdmin !== true) {
        return res.status(401).send(err);
      }
      req.user = user;
      next();
    });
  },
};
