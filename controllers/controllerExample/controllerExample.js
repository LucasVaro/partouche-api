const ExampleModel = require("../../models/example-model.js");

module.exports = {
  ExampleController: async (req, res) => {
    try {
      // const dataRec = req.body.data;
      // const data = await ExampleModel.find({ dataRec });
      const data = "oui mon frero";
      res.send(data);
    } catch (e) {
      res.status(400).send(e);
    }
  },
};
