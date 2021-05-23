const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const Item = '../models/item.model.js';

const Payment = new Schema({
    card_no: {
        type: String
    },
    name: {
        type: String
    },
    exp_month: {
        type: String
    }, 
    exp_year: {
        type: String
    },
    card_type: {
        type: String
    },
    cvc: {
        type: String
    }
});

const Item = new Schema({
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

const Notification = new Schema({
    from_dt: {
        type: String
    },
    to_dt: {
        type: String
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
    items: [Item],
    payments: [Payment],
    notifications: [Notification]
});

module.exports = mongoose.model('users', User);