const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let act = new Schema ({
    app: {
        type: String
    },
    url: {
        type: String
    },
    
});

module.exports = dbTeamSite = mongoose.model("active_site", act) ;
//asdasd