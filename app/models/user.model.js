const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Appliance = '../models/appliance.model.js';

const User = new Schema({
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
    },
    appliances: [Appliance]
});

module.exports = mongoose.model('users', User);