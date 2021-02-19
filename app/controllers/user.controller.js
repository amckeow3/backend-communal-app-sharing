exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userHome = (req, res) => {
    res.status(200).send("User Content.");
  };

