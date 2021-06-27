const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Item = db.item;
const mongoose = require('mongoose');

var jwt = require("jsonwebtoken");

exports.newNotification = (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
            var { item_name, from_dt, to_dt } = req.body;
        User.updateOne({ username: user.username }, 
            { $push: { notifications: { item_name, from_dt, to_dt } } }, { safe: true, new: true }, (err, user) => {
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

  exports.notificationDetails = (req, res) => {
    User.aggregate([
      { "$unwind":  {
        path: "$notifications",
        includeArrayIndex: "notification"
        }
      },
      { "$match": { 
        username: req.params.username,
        "notifications.item_name": req.params.item_name
        }
      },
      {
        "$group": {
          "_id": "$notifications._id",
          "item_name": {$first: "$notifications.item_name"},
          "from_dt": {$first: "$notifications.from_dt" },
          "to_dt": {$first: "$notifications.to_dt" },
          "username": { $first: "$username" },
          "first_name": { $first: "$first_name" },
          "last_name": { $first: "$last_name" },
          "email": { $first: "$email" }
          }
      },
      { "$project": { "_id": 1, "item_name": 1, "from_dt": 1, "to_dt": 1,  "username": 1, "first_name": 1, "last_name": 1, "email": 1 }}
      ], (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.status(200).send(data);
      }
    });
  }
