const express = require('express');
const router = express.Router();
const dbTeamSite = require('../../config/app_server.model');

// Get data on specific app
// URL: http:localhost:5000/app/:app
router.get('/:app',function(req, res){
    var app = req.params.app;
    console.log("app is- " + app );
    dbTeamSite.findOne({"app": {$regex : app, $options: 'i'}}, function(err, result){
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