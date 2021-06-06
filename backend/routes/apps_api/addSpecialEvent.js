const express = require('express');
const router = express.Router();
const dbTeamSite = require('../../config/specialEvents.model');

// Adding an app to the DB
// URL: http://localhost:5000/app/add
router.post('/add',  function(req, res){
        let newEvent = new dbTeamSite({
            event: req.body.event,
            date: req.body.date
        })
        console.log(newEvent);
        newEvent.save().then(newEvent => {
            res.json('Special Event Created');       
    })
    .catch(err => {
        res.status(400).send("Creation not possible");
    });
});

module.exports = router
