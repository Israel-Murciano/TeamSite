const express = require('express');
const router = express.Router();
const dbTeamSite = require('../../config/shifts.model');

// Edits a shift
router.post('/:shiftUpdate',function(req, res) {
    var shiftUpdate = req.params.shiftUpdate;
    dbTeamSite.findById(shiftUpdate, function(err, shift){
        shift.shift = req.body.futureShift ;
        shift.save().then(shift => {
                res.json('Shift updated');       
        })
        .catch(err => {
            res.status(400).send("Update not possible");
        });
    });
});

module.exports = router;