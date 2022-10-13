const welcome = (req, res) => {
  res.send("Example Message").status(200);
};

exports.welcome = welcome;
