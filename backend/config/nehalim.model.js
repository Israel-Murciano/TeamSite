const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let nohal = new Schema ({
        name: String,
        filename: String
});

module.exports = nohal = mongoose.model("nehalims", nohal) ;