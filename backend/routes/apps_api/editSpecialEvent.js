const express = require('express');
const router = express.Router();
const dbTeamSite = require('../../config/specialEvents.model');

// Edits a shift
router.post('/:specialEvent',function(req, res) {
    var specialEvent = req.params.specialEvent;
    dbTeamSite.findById(specialEvent, function(err, event){
        console.log("body: " + req.body.newEvent)
        event.event = req.body.newEvent ;
        if (req.body.newEvent == 'deleteMe') {
            event.remove(function(err) {
                if (!err) {
                    res.json('Event deleted')
                }
                else {
                    res.status(200).send(err)
                }
            });
            console.log("DELETED")
        } else {
            event.save().then(event => {
                res.json('Event updated');       
        })
        .catch(err => {
            res.status(400).send("Update not possible");
        });
        }
        
    });
});

module.exports = router;