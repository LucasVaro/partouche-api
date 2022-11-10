const express = require("express");
const path = require("path");
const { login, register, userMe } = require("../controllers/auth.js");
const {
  createMatch,
  getMatchs,
  deleteMatch,
} = require("../controllers/matchs.js");
const { authenticateToken, isAdmin } = require("../middleware/jwt");
const router = express.Router();

router.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

router.get("/uploads/logo/:name", (req, res) => {
  res.sendFile(path.join(__dirname + `/../uploads/logo/${req.params.name}`));
});

router.post("/auth/login", login);

router.post("/auth/register", register);

router.get("/auth/me", authenticateToken, userMe);

router.post("/match/create", isAdmin, createMatch);

router.post("/match/deleteMatch", isAdmin, deleteMatch);

router.get("/match/getMatchs", getMatchs);

module.exports = router;
