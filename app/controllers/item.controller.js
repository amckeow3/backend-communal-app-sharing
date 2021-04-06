const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Item = db.item;
const mongoose = require('mongoose');

var jwt = require("jsonwebtoken");

exports.itemRegistration = (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
            var { item_name, item_desc, price_per_day } = req.body;
            var registered = new Date().toISOString().slice(0,10);
        User.updateOne({ username: user.username }, 
            { $push: { items: { item_name, item_desc, price_per_day, registered } } }, { safe: true, new: true }, (err, user) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.status(200).send({ message: "Item was successfully registered!" })
            }
        });
    });
};

exports.getNearbyItems = (req, res) => {
  User.find({ username: { $nin: req.params.username}, zipcode: req.params.zipcode, $expr: { $gt: [{$size: "$items"}, 0]}}, (err, users) => {
    if (err) {
      console.log(err);
    } else { 
        res.status(200).json({ users });
        
      } 
    })
  }

  exports.getItems = (req, res) => {
    User.findOne({ username: req.params.username}, (err, user) => {
      if (err) {
        console.log(err);
      } else { 
        res.status(200).json(user);
      }
    })
  }


  exports.itemDetails = (req, res) => {
    User.aggregate([
      { "$unwind":  {
                        path: "$items",
                        includeArrayIndex: "item"
                      }
      },
      { "$match": { 
        username: req.params.username,
        "items.item_name": req.params.item_name } },
      {
        "$group": {
          "_id": "$item._id",
          "item_name": {$first: "$items.item_name" },
          "item_desc": {$first: "$items.item_desc" },
          "price_per_day": { $first: "$items.price_per_day" },
          "username": { $first: "$username" },
          "first_name": { $first: "$first_name" },
          "last_name": { $first: "$last_name" },
          "email": { $first: "$email" }
          }
      },
      { "$project": { "_id": 1, "item_name": 1, "item_desc": 1, "price_per_day": 1, 
                      "username": 1, "first_name": 1, "last_name": 1, "email": 1 }}
    ], (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        res.status(200).send(data);
      }
    });
  }

  exports.deleteItem = (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
      var item_name = req.body.item_name;
  User.updateOne({ username: user.username }, 
      { $pull: { items: { item_name }}}, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send({ message: "Item was successfully deleted!" })
        }
    });
  });
}