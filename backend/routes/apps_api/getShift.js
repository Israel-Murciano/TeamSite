const express = require('express');
const router = express.Router();
const dbTeamSite = require('../../config/shifts.model');


router.get('/:shift',function(req, res){
    var shift = req.params.shift;
    console.log("shift is- " + shift );
    dbTeamSite.findById(shift, function(err, result){
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