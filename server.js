const express = require("express");
const router = require("./routes/routes.js");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
mongoose.connect(process.env.MONGODB);

const app = express();
//important :
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "15MB" }));

app.use(router);

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

const PORT = 8009;

app.listen(PORT, () => {
  console.log(`Connexion au serveur sur le port ${PORT}`);
});
