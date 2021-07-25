const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const mongoose = require('mongoose');

exports.newPayment = (req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
            var { card_no, name, exp_month, exp_year, card_type, cvc } = req.body;
        User.updateOne({ username: user.username }, 
            { $push: { payments: { card_no, name, exp_month, exp_year, card_type, cvc } } }, { safe: true, new: true }, (err, user) => {
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

  exports.paymentMethodDetails = (req, res) => {
    User.aggregate([
      { "$unwind":  {
                        path: "$payments",
                        includeArrayIndex: "payment"
                      }
      },
      { "$match": { 
          username: req.params.username,
          "payments.card_no": req.params.card_no } },
      {
        "$group": {
          "_id": "$payments._id",
          "card_no": { $first: "$payments.card_no" },
          "card_type": { $first: "$payments.card_type" },
          "username": { $first: "$username" },
          "first_name": { $first: "$first_name" },
          "last_name": { $first: "$last_name" },
          "email": { $first: "$email" },
          "address": { $first: "$address" },
          "zipcode": { $first: "$zipcode" }
        }
      },
      { "$project": { "_id": 1, "card_no": 1, "username": 1, "first_name": 1, "last_name": 1, "email": 1, "address": 1, "zipcode": 1 }
    }], (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      res.status(200).json(data);
    }
  })
}
