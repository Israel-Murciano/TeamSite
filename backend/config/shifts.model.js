const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mivzaiShifts = new Schema ({
        name: String,
        shift: String,
        day: String,
        date: String,       
});

const shifts = mongoose.model('shifts', mivzaiShifts);
module.exports = shifts;
