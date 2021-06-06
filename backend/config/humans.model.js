const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const humans = new Schema ({
        name: String
});

const people = mongoose.model('humans', humans);
module.exports = people;
