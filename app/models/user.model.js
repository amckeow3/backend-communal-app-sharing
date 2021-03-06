const mongoose = require("mongoose");

const User = mongoose.model(
    "users",
    new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    address: {
        type: String
    },
    zipcode: {
        type: String
    },
    phone: {
        type: String
    }
  })
);

module.exports = User;