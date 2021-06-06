const express = require('express');
const router = express.Router();
const dbTeamSite = require('../../config/specialEvents.model');


router.get('/:event',function(req, res){
    var event = req.params.event;
    console.log("shift is- " + event );
    dbTeamSite.findById(event, function(err, result){
        if (err){
            res.status(400).send("Not Found");
        }
        else {
            console.log(result);
            res.json(result);
        }
        
    });
});

module.exports = router;