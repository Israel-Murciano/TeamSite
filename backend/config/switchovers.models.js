const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let switchoverScehma  = new Schema({
    app: String,
    Switchovers: [{
    switchoverStartDate: String,
    switchoverEndDate: String,
    switchoverStartTime: String,
    switchoverEndTime: String,
    switchoverDuration: String,
    originSite: String,
    destinationSite: String,
    details: String,
    }]
});

module.exports = switchovers = mongoose.model('switchovers', switchoverScehma);