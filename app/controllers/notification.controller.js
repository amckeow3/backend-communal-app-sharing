const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Item = db.item;
const mongoose = require('mongoose');

var jwt = require("jsonwebtoken");

exports.newNotification = (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
            var { from_dt, to_dt } = req.body;
        User.updateOne({ username: user.username }, 
            { $push: { notifications: { from_dt, to_dt } } }, { safe: true, new: true }, (err, user) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.status(200).send({ message: "Notification was successfully sent!" })
            }
        });
    });
};


exports.getNotifications = (req, res) => {
    User.findOne({ username: req.params.username}, (err, user) => {
      if (err) {
        console.log(err);
      } else { 
        res.status(200).json(user);
      }
    })
  }