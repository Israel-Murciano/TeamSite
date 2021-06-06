const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let activitySchema = new Schema({
    activityTitle:{
        type:String
    },
    description:{
        type:String
    },
    activityStartDate:{
        type: Date
    },
    activityEndDate:{
        type: Date
    },
    team:{
        type:String
    },
    status:{
        type:String
    } 
})

module.exports = dbTeamSiteActivities = mongoose.model("activities",activitySchema) ;