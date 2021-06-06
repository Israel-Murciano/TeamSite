const express = require('express');
const router = express.Router();
const dbTeamSite = require('../../config/app_server.model');

// Find all strings that has the word that the user looked for
// URL: http://localhost:5000/search/:string/
router.get('/:string',function(req, res){
    const string = req.params.string;
    dbTeamSite.find({$or: [
        {app: {$regex: string, $options: 'i'}},
        {url: {$regex: string, $options: 'i'}},
        {site: {$regex: string,$options: 'i'}},
        {description: {$regex: string,$options: 'i'}},
        {dbtype: {$regex: string,$options: 'i'}},
        {servers: {$regex: string,$options: 'i'}},
        {alteon: {$regex: string,$options: 'i'}},
        {ips: {$regex: string,$options: 'i'}},
        {last_switchover_date: {$regex: string,$options: 'i'}},
        {switchover_time: {$regex: string,$options: 'i'}},
        {mevudelet: {$regex: string,$options: 'i'}},
        {tiful: {$regex: string,$options: 'i'}}]}, function (error,data) {
            console.log("data is- " +data);
            if (error) {
                res.status(400).send('Not Found');
            }
            else if (!data.length) {
                res.send('Not Found');
            }
            else {
                console.log("data is- " +data)
                res.json(data);
            }
    })
});

module.exports = router;