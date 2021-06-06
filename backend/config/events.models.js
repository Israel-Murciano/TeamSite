const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventsSchema = new Schema({
    system: { type: String, required: true },
    domain: { type: String, required: true },
    description: { type: String, required: true },
    startdate: { type: String, required: true },
    starttime: { type: String, required: true },
    name: { type: String, required: true },
    handler: { type: String, required: true },
    story: { type: String, required: true },
    effect: { type: String, required: true },
    closedate: { type: String },
    closetime: { type: String },
    status: { type: String, required: true },
}, {
    timestamps: true,
});

const Events = mongoose.model('events', eventsSchema);

module.exports = Events;