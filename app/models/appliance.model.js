const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = '../models/user.model.js';

const Appliance = new Schema({
    _id: {
       type: Schema.Types.ObjectId
    },
    appliance_name: {
        type: String
    },
    appliance_desc: {
        type: String
    },
    price_per_day: {
        type: Number
    },
    image: {
        type: String,
        data: Buffer
    }
});

module.exports = mongoose.model('appliances', Appliance);