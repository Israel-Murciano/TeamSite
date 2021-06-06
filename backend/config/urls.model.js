const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UrlsSchema = new Schema ({
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = Urls = mongoose.model("urls", UrlsSchema) ;