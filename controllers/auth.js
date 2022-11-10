const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const UsersModel = require("../models/users.js");
dotenv.config();

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "604800s",
  });
};

module.exports = {
  login: async (req, res) => {
    try {
      const { password } = req.body;
      const email = req.body.email.toLowerCase();
      const user = await UsersModel.findOne({ email });
      if (user) {
        const pass = user.password;
        const match = await bcrypt.compare(password, pass);
        if (match) {
          const userToken = {
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
          };
          const accessToken = generateAccessToken(userToken);
          res.send({ accessToken });
        } else {
          res.status(401).send("Invalid password");
          return;
        }
      } else {
        res.status(401).send("Invalid login");
        return;
      }
    } catch (e) {
      res.status(400).send(e);
    }
  },
  register: async (req, res) => {
    const { password } = req.body;
    const email = req.body.email.toLowerCase();
    if (email && email != "" && password && password != "") {
      const checkLoginExist = await UsersModel.findOne({ email });
      if (checkLoginExist) {
        if (checkLoginExist.email === email) {
          res.send("Email déjà utilisé");
          return;
        }
      }
      let salt = await bcrypt.genSalt(10);
      let passwordHashed = await bcrypt.hash(password, salt);
      const createUser = await UsersModel.create({
        email,
        password: passwordHashed,
        isAdmin: false,
        date: new Date(),
      });
      const user = {
        _id: createUser._id,
        email,
        isAdmin: false,
      };
      const _id = createUser._id;
      const accessToken = generateAccessToken(user);
      res.send({ _id, accessToken, refreshToken });
    } else {
      res.status(402).send("Veuillez remplir tous les champs");
    }
  },
  userMe: async (req, res) => {
    try {
      console.log("eeeee");
      const getUser = await UsersModel.findOne({ _id: req.user._id });
      res.send({
        id: getUser._id,
        email: getUser.email,
        isAdmin: getUser.isAdmin,
      });
    } catch (e) {
      res.send(e).status(400);
    }
  },
};
