const db = require("../models");
const User = db.user;

checkDuplicateUsername = (req, res, next) => {
    //Check for duplicate username -- if found, signup error occurs
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user) {
            res.status(400).send({ message: "Signup failed! Username is already in use!" });
            return;
        }

        next();
    })
};

const verifySignUp = { 
    checkDuplicateUsername
};

module.exports = verifySignUp;