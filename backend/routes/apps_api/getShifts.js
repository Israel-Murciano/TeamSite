const express = require('express');
const router = express.Router();
const dbTeamSite = require('../../config/shifts.model');
const dateFormat = require('dateformat');

var date = new Date();
var today = dateFormat(date,"yyyy-mm-dd")

router.get('/',function(req, res){
    dbTeamSite.find({},
        function(err, result){
        if (err){
            res.status(400).send("Not Found");
        }
        else {
            console.log(today)
            res.json(result);
        }
        
    });
});




module.exports = router;