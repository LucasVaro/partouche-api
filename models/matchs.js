const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.connect(process.env.MONGODB);

const MatchsSchema = new mongoose.Schema({
  logo1: String,
  logo2: String,
  team1: String,
  team2: String,
  cote1: String,
  coteX: String,
  cote2: String,
  dateString: String,
});

const MatchsModel = mongoose.model("MatchsModel", MatchsSchema, "matchs");

module.exports = MatchsModel;
