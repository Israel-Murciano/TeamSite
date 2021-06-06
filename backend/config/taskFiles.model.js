const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let taskFile = new Schema ({
        name: String,
        filename: String
});

module.exports = taskFile = mongoose.model("tasksFiles", taskFile);