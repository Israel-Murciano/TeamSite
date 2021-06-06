const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let app = new Schema ({
    app: {
        type: String, required: true 
    },
    url: {
        type: String
    },
    site: {
        type: String
    },
    kapat: {
        type: String
    },
    description: {
        type: String
    },
    dbtype: {
        type: String
    },
    servers: {
        type: String
    },
    alteon: {
        type: String
    },
    ips: {
        type: String
    },
    last_switchover_date: {
        type: String
    },
    switchover_time: {
        type: String
    },
    boss: {
        type: String
    },
    phone: {
        type: String
    },
});

module.exports = app;
