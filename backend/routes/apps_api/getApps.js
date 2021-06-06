const express = require('express');
const router = express.Router();
const dbTeamSite = require('../../config/app_server.model');

// Get All Apps from Mongodb
// URL: http://localhost:5000/apps
router.get('/',function(req, res){
    dbTeamSite.find(function (err, data) {
        if (err) { 
            res.status(400).send("Problem With DB");
        } else {
            res.json(data);
        }
    });
});

module.exports = router;