const express = require('express');
const router = express.Router();
const dbTeamSite = require('../../config/specialEvents.model');

router.get('/',function(req, res){
    console.log("SPECIALALL")
    dbTeamSite.find({},
        function(err, result){
        if (err){
            res.status(400).send("Not Found");
        }
        else {
            res.json(result);
        }
        
    });
});

module.exports = router;