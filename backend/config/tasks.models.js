const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    description: { type: String, required: true },
    handler: { type: String, required: true },
    story: { type: String, required: true },
    status: { type: String, required: true },
    startdate: { type: String, required: true },
    enddate: { type: String },
    priority: { type: String, required: true },
    randomID: { type: String },
}, {
    timestamps: true,
});

const Tasks = mongoose.model('tasks', tasksSchema);

module.exports = Tasks;