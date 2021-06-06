const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const backups = new Schema ({
        nodename: String,
        instancename: String,
        subclientname: String,
        starttime: String,
        endtime: String,
        status: String,
        failurereason: String,
        comment: String,
        name: String
});

const backup = mongoose.model('backups', backups);
module.exports = backup;
