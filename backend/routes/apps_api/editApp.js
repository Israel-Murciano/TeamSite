const express = require('express');
const router = express.Router();
const dbTeamSite = require('../../config/app_server.model');

// Edits an app
// URL: http://localhost:5000/update/:appSearch
router.post('/:appSearch',function(req, res) {
    var appSearch = req.params.appSearch;
    dbTeamSite.findOne({"app" : appSearch}, function(err, app) {
        app.app = req.body.app;
        app.url = req.body.url;
        app.site = req.body.site;
        app.kapat = req.body.kapat;
        app.description = req.body.description;
        app.dbtype = req.body.dbtype;
        app.servers = req.body.servers;
        app.alteon = req.body.alteon;
        app.boss = req.body.boss;
        app.phone = req.body.phone;
        app.ips = req.body.ips;
        app.last_switchover_date = req.body.last_switchover_date;
        app.switchover_time = req.body.switchover_time;
        app.mevudelet = req.body.mevudelet;
        app.tiful = req.body.tiful;
        app.save().then(app => {
                res.json('App updated');       
        })
        .catch(err => {
            res.status(400).send("Update not possible");
        });
    });
});

module.exports = router;