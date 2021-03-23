const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Appliance = db.appliance;
const mongoose = require('mongoose');

var jwt = require("jsonwebtoken");

exports.applianceRegistration = (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
            var { appliance_name, appliance_desc, price_per_day } = req.body;
        User.updateOne({ username: user.username }, 
            { $push: { appliances: { appliance_name, appliance_desc, price_per_day } } }, { safe: true, new: true }, (err, user) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.status(200).send({ message: "Appliance was successfully registered!" })
            }
        });
    });
};

exports.getNearbyAppliances = (req, res) => {
  User.find({ username: { $nin: req.params.username}, zipcode: req.params.zipcode, $expr: { $gt: [{$size: "$appliances"}, 0]}}, (err, users) => {
    if (err) {
      console.log(err);
    } else { 
        res.status(200).json({ users });
      } 
    })
  }

  exports.getAppliances = (req, res) => {
    User.findOne({ username: req.params.username}, (err, user) => {
      if (err) {
        console.log(err);
      } else { 
        res.status(200).json(user);
      }
    })
  }


  exports.applianceDetails = (req, res) => {
    User.aggregate([
      { "$unwind":  {
                        path: "$appliances",
                        includeArrayIndex: "appliance"
                      }
      },
      { "$match": { 
        username: req.params.username,
        "appliances.appliance_name": req.params.appliance_name } },
      {
        "$group": {
          "_id": "$appliances._id",
          "appliance_name": {$first: "$appliances.appliance_name" },
          "appliance_desc": {$first: "$appliances.appliance_desc" },
          "price_per_day": { $first: "$appliances.price_per_day" },
          "username": { $first: "$username" },
          "first_name": { $first: "$first_name" },
          "last_name": { $first: "$last_name" },
          "email": { $first: "$email" }
          }
      },
      { "$project": { "_id": 1, "appliance_name": 1, "appliance_desc": 1, "price_per_day": 1, 
                      "username": 1, "first_name": 1, "last_name": 1, "username": 1, "email": 1 }}
    ], (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.status(200).send(data);
      }
    });
  }

  