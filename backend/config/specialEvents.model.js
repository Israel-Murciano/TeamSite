const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const specialEvents = new Schema ({
        event: String,
        date: String,       
});

const specials = mongoose.model('specials', specialEvents);
module.exports = specials;
