const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Image = new Schema({
    id: {
        type: String
    },
    imageUrl: {
        type: String
    }, 
    imageTitle: {
        type: String
    },
    imageDesc: {
        type: String
    },
    uploaded: { 
        type: Date, default: Date.now 
    }
});

module.exports = mongoose.model('images', Image);