const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.MONGODB);

const UsersSchema = new mongoose.Schema({
  dateCreate: Date,
  email: String,
  password: String,
  isAdmin: Boolean,
});

const UsersModel = mongoose.model("UsersModel", UsersSchema, "users");

module.exports = UsersModel;
