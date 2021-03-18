const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const mongoose = require('mongoose');

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
      var ObjectId = require('mongodb').ObjectId;
      User.find({ username: req.params.username , "appliance.id": req.params._id }, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data)
        }
      })
    }
  

