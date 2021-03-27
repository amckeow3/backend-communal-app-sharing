const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = new Schema({
    _id: {
        type: Schema.ObjectId
     },
    item_name: {
        type: String
    },
    item_desc: {
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

module.exports = mongoose.model('items', Item);