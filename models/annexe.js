const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.MONGODB);

const AnnexeSchema = new mongoose.Schema({
  logo1: String,
  logo2: String,
  team1: String,
  team2: String,
  cote: String,
  text: String,
});

const AnnexeModel = mongoose.model("AnnexeModel", AnnexeSchema, "annexe");

module.exports = AnnexeModel;
