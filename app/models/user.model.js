const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Appliance = new Schema({
    appliance_name: {
        type: String
    },
    appliance_desc: {
        type: String
    },
    available_from_dt: {
        type: Date
    },
    available_to_dt: {
        type: Date
    },
    price_per_day: {
        type: Number
    }
});

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