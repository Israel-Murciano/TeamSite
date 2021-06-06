const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mmsSchema = new Schema({
    appname: { type: String, required: true },
    starttime: { type: String, required: false },
    expiredtime: { type: String, required: true },
    isok: { type: String, required: false },
}, {
    timestamps: true,
});

const MMS = mongoose.model('mms', mmsSchema);

module.exports = MMS;