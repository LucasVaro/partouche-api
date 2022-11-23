const dotenv = require("dotenv");
const fs = require("fs");
const AnnexeModel = require("../models/annexe.js");
dotenv.config();

module.exports = {
  createAnnexe: async (req, res) => {
    try {
      const { logo1, logo2, team1, team2, cote, text } = req.body;

      const imgName1 = `${Math.floor(Math.random() * 9999999999999)}.png`;
      fs.writeFileSync(`./uploads/logo/${imgName1}`, logo1, "base64");

      const imgName2 = `${Math.floor(Math.random() * 9999999999999)}.png`;
      fs.writeFileSync(`./uploads/logo/${imgName2}`, logo2, "base64");

      const create = await AnnexeModel.create({
        logo1: imgName1,
        logo2: imgName2,
        team1,
        team2,
        cote,
        text,
      });
      res.send(create);
    } catch (e) {
      res.send(e);
    }
  },
  getAnnexe: async (req, res) => {
    try {
      const annexes = await AnnexeModel.find();
      res.send(annexes);
    } catch (e) {
      res.send(e);
    }
  },
  deleteAnnexe: async (req, res) => {
    const { id } = req.body;
    try {
      const annexesToDelete = await AnnexeModel.findOne({ _id: id });
      const annexes = await AnnexeModel.deleteOne({ _id: id });
      if (annexesToDelete.logo1) {
        fs.unlinkSync(`./uploads/logo/${annexesToDelete.logo1}`);
      }
      if (annexesToDelete.logo2) {
        fs.unlinkSync(`./uploads/logo/${annexesToDelete.logo1}`);
      }
      res.send(annexes);
    } catch (e) {
      res.send(e);
    }
  },
};
