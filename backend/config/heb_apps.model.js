const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let heb = new Schema ({
    heb_apps : [{
        appHeb: String,
        appEng: String
    }]
});

module.exports = heb;