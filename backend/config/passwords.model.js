const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const passwordSchema = new Schema({
    component: { type: String, required: true},
    username: { type: String, required: true},
    password: { type: String, required: true},
},{
    timestamps: true,
});
const Passwords = mongoose.model('Passwords', passwordSchema);

module.exports = Passwords;
