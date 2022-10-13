const express = require("express");
const { welcome } = require("../controllers/controllers.js");
const {
  ExampleController,
} = require("../controllers/controllerExample/controllerExample.js");
const router = express.Router();

router.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

router.get("/", welcome);

router.post("/routes/routesExample", ExampleController);

module.exports = router;
