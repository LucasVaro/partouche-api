const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.MONGODB);

const ExampleSchema = new mongoose.Schema({
  user: String,
  ip: String,
  page: String,
  dateFormat: Date,
});

const ExampleModel = mongoose.model(
  "ExampleModel",
  ExampleSchema,
  "example-name-db"
);

module.exports = ExampleModel;
