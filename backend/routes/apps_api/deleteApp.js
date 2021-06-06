const express = require('express');
const router = express.Router();
const dbTeamSite = require('../../config/app_server.model');

// Delets an App from DB
// URL: http://localhost:5000/delete/:app
router.post('/:app',function(req, res){
    var app = req.params.app;
    console.log("app search is- " +app);
    dbTeamSite.deleteOne({"app": {$regex : app}}, function(err, result){
        if (err){
            res.status(400).send("Update not possible");
        }
        else {
            res.json(result);
        }
    });
});


module.exports = router;
