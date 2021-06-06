const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const backups = new Schema ({
        nodename: String,
        comment: String,
        name: String,
        instancename: String,
        subclientname: String,
}, {
        timestamps: true,
});

const backup3 = mongoose.model('backupcomments', backups);
module.exports = backup3;
