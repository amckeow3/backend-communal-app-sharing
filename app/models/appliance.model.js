const mongoose = require("mongoose");

const Appliance = mongoose.model(
    "appliances",
    new mongoose.Schema({
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
    })
);

module.exports = Appliance;