const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const phoneSchema = new Schema({
    name: { type: String, required: true },
    number: { type: String, required: true }
}, {
    timestamps: true,
});

const Phones = mongoose.model('phones', phoneSchema);

module.exports = Phones;