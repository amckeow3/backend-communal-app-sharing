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

module.exports = mongoose.model('appliances', Appliance);