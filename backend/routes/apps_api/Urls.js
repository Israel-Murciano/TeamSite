const express = require('express');
const router = express.Router();
const dbTeamSite = require('../../config/urls.model');

// Get all the urls from the DB
router.get('/',function(req, res){
    dbTeamSite.find(function (err, data) {
        if (err) { 
            res.status(400).send("Problem With DB");
        } else {
            res.json(data);
        }
    });
});



// Adding a url to the DB
router.post('/add',  function(req, res){
        let newUrl = new dbTeamSite({
            url: req.body.url,
            name: req.body.name
        })

        newUrl.save().then(newUrl => {
            res.json('Url Created');       
    })
    .catch(err => {
        res.status(400).send("Creation not possible");
    });
});

module.exports = router
