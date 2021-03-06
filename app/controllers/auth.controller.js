const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Appliance = db.appliance;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        zipcode: req.body.zipcode,
        phone: req.body.phone,

    });

    newUser.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        else {
            console.log(user);
            res.send({ message: "User was registered successfully!" });
        }
    });
};

exports.login = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .populate("-__v")
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        
        if (!user) {
            return res.status(404).send({ message: "User not found."});
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password."
            });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            address: user.address,
            zipcode: user.zipcode,
            phone: user.phone,
            accessToken: token
          });
    });
};

exports.loginRequired = function(req, res, next) {
    if (req.user) {
      next();
    } else {
  
      return res.status(401).json({ message: 'Unauthorized user!!' });
    }
};

exports.profile = function(req, res, next) {
    if (req.user) {
      res.send(req.user);
      next();
    } 
    else {
     return res.status(401).json({ message: 'Invalid token' });
    }
  };

exports.applianceRegistration = (req, res) => {
    const newAppliance = new Appliance({
        appliance_name: req.body.appliance_name,
        appliance_desc: req.body.appliance_desc,
        available_from_dt: req.body.available_from_dt,
        available_to_dt: req.body.available_to_dt,
        price_per_day: req.body.price_per_day
    });

    newAppliance.save((err, appliance) => {
        if (err) {
            res.status(500).send({ message: err });
        }
        else {
            console.log(appliance);
            res.send({ message: "Appliance was registered successfully!" });
        }
    });
};

exports.getAppliance = function (req, res) {
    User.findById(User, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        console.log(user.appliances);
        data = user.appliances;
        res.json({ data });
      }
    });
  };
