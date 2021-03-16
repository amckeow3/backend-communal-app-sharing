const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Appliance = db.appliance;

var jwt = require("jsonwebtoken");

exports.applianceRegistration = (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
            var { appliance_name, appliance_desc, available_from_dt, available_to_dt, price_per_day } = req.body;
        User.updateOne({ username: user.username }, 
            { $push: { appliances: { appliance_name, appliance_desc, available_from_dt, available_to_dt, price_per_day } } }, { safe: true, new: true }, (err, user) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.status(200).send({ message: "Appliance was successfully registered!" })
            }

        });
    });
};

exports.getAppliances = (req, res, next) => {
  User.find({ username: { $nin: req.params.username}, zipcode: req.params.zipcode, $expr: { $gt: [{$size: "$appliances"}, 0]}}, (err, users) => {
    if (err) {
      console.log(err);
    } else { 
        res.json({users});
      } 
    })
  }
  
