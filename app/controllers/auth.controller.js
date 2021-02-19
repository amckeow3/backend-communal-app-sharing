const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        zipcode: req.body.zipcode,
        phone: req.body.phone
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
        email: req.body.email
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
            email: user.email,
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