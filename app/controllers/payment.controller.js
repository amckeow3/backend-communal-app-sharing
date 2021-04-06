const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const mongoose = require('mongoose');

exports.newPayment = (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
            var { card_no, name, exp_month, exp_year, card_type } = req.body;
        User.updateOne({ username: user.username }, 
            { $push: { payments: { card_no, name, exp_month, exp_year, card_type } } }, { safe: true, new: true }, (err, user) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.status(200).send({ message: "Payment method successfully added!" })
            }
        });
    });
};

exports.getPaymentMethods = (req, res) => {
    User.findOne({ username: req.params.username}, (err, user) => {
      if (err) {
        console.log(err);
      } else { 
        res.status(200).json(user);
      }
    })
  }
