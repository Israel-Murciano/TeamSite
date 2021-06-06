const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const niturSchema = new Schema({
    hint: { type: String, required: true },
    message: { type: String, required: true }
}, {
    timestamps: true,
});

const Niturs = mongoose.model('niturs', niturSchema);

module.exports = Niturs;