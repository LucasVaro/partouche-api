const dotenv = require("dotenv");
const fs = require("fs");
const MatchsModel = require("../models/matchs.js");
dotenv.config();

module.exports = {
  createMatch: async (req, res) => {
    try {
      const { logo1, logo2, team1, team2, cote1, coteX, cote2, dateString } =
        req.body;

      const imgName1 = `${Math.floor(Math.random() * 9999999999999)}.png`;
      fs.writeFileSync(`./uploads/logo/${imgName1}`, logo1, "base64");

      const imgName2 = `${Math.floor(Math.random() * 9999999999999)}.png`;
      fs.writeFileSync(`./uploads/logo/${imgName2}`, logo2, "base64");

      const create = await MatchsModel.create({
        logo1: imgName1,
        logo2: imgName2,
        team1,
        team2,
        cote1,
        coteX,
        cote2,
        dateString,
      });
      res.send(create);
    } catch (e) {
      res.send(e);
    }
  },
  getMatchs: async (req, res) => {
    try {
      const matchs = await MatchsModel.find();
      res.send(matchs);
    } catch (e) {
      res.send(e);
    }
  },
  deleteMatch: async (req, res) => {
    const { id } = req.body;
    try {
      const matchsToDelete = await MatchsModel.findOne({ _id: id });
      const matchs = await MatchsModel.deleteOne({ _id: id });
      if (matchsToDelete.logo1) {
        fs.unlinkSync(`./uploads/logo/${matchsToDelete.logo1}`);
      }
      if (matchsToDelete.logo2) {
        fs.unlinkSync(`./uploads/logo/${matchsToDelete.logo1}`);
      }
      res.send(matchs);
    } catch (e) {
      res.send(e);
    }
  },
};
