const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userHome = (req, res) => {
    res.status(200).send("User Content.");
  };

  exports.getUser = (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
        if(err) {
            return res.status(500).send(err);
        }
        res.status(200).send({
            username: user.username
        });
    });
};

exports.deleteUser = (req, res) => {
    User.findOne({ username: req.params.username}, (err, user) => {
        if (err) {
            return res.status(500).send(err);
        }
            User.deleteOne({ username: user.username}, (err, user) => {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.status(200).send({ message: "Account was successfully deleted."})
                }
        });
    });
}

exports.updateEmail = (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
        let newData = {$set: { email: req.body.email }};
        if(err) {
            return res.status(500).send(err);
        }
        User.updateOne({ username: user.username }, newData, (err, user) => {
            if (err) {
                console.log("Unable to update data in your collection")
            } else {
                console.log(user)
                res.status(200).send({ message: "User profile successfully updated!" })
            }
        });
    })
}

exports.updateFirstName = (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
        let newData = {$set: { first_name: req.body.first_name }};
        if(err) {
            return res.status(500).send(err);
        }
        User.updateOne({ username: user.username }, newData, (err, user) => {
            if (err) {
                console.log("Unable to update data in your collection")
            } else {
                console.log(user)
                res.status(200).send({ message: "User profile successfully updated!" })
            }
        });
    })
}

exports.updateLastName = (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
        let newData = {$set: { last_name: req.body.last_name }};
        if(err) {
            return res.status(500).send(err);
        }
        User.updateOne({ username: user.username }, newData, (err, user) => {
            if (err) {
                console.log("Unable to update data in your collection")
            } else {
                console.log(user)
                res.status(200).send({ message: "User profile successfully updated!" })
            }
        });
    })
}

exports.updateZipcode = (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
        let newData = {$set: { zipcode: req.body.zipcode }};
        if(err) {
            return res.status(500).send(err);
        }
        User.updateOne({ username: user.username }, newData, (err, user) => {
            if (err) {
                console.log("Unable to update data in your collection")
            } else {
                console.log(user)
                res.status(200).send({ message: "User profile successfully updated!" })
            }
        });
    })
}

exports.updateAddress = (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
        let newData = {$set: { address: req.body.address }};
        if(err) {
            return res.status(500).send(err);
        }
        User.updateOne({ username: user.username }, newData, (err, user) => {
            if (err) {
                console.log("Unable to update data in your collection")
            } else {
                console.log(user)
                res.status(200).send({ message: "User profile successfully updated!" })
            }
        });
    })
}

exports.updatePhone = (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
        let newData = {$set: { phone: req.body.phone }};
        if(err) {
            return res.status(500).send(err);
        }
        User.updateOne({ username: user.username }, newData, (err, user) => {
            if (err) {
                console.log("Unable to update data in your collection")
            } else {
                console.log(user)
                res.status(200).send({ message: "User profile successfully updated!" })
            }
        });
    })
}

  

