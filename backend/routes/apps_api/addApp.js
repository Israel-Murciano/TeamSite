const express = require('express');
const router = express.Router();
const dbTeamSite = require('../../config/app_server.model');
const dbactive = require('../../config/active_site.model');

// Adding an app to the DB
// URL: http://localhost:5000/app/add
router.post('/add',  function(req, res){
    try {
        let active_site = new dbactive({
            app: req.body.app,
            url: req.body.url
        })
        console.log(active_site);
         active_site.save();
        let app = new dbTeamSite(req.body)
         app.save();
    } catch(err) {
        console.log("ERROR:" + err);
    }
  
/*
    active_site.save()
        .then(active_site => {
            res.status(200).json({'active_site': 'active_site added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new active_site failed');
        });
    

    console.log("in add");
    app.save()  
        .then(app => {
            res.status(200).json({'app': 'app added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new app failed');
        });
        */
});

module.exports = router

/*
  var json = '{"app":' +  req.body.app + ', "url":' + req.body.url + '}';
    console.log(json);
    //var obj = JSON.parse(json);
    var active_site = new dbactive(json);
    console.log("test:" + active_site);

    */