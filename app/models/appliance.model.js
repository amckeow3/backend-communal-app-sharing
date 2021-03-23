const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Image = '../models/image.model.js';

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
    registered: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('appliances', Appliance);