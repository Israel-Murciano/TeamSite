const express = require('express');
const router = express.Router();
const switchovers = require('../../config/switchovers.models');

// Adding an app to the DB
// URL: http://localhost:3000/api/switchovers/add
router.post('/add', function (req, res) {
    switchovers.findOneAndUpdate({"app": {$regex : req.body.app, $options: 'i'}}, 
        {
            $push: {
                "Switchovers" : {
                    switchoverStartDate: req.body.switchoverStartDate,
                    switchoverStartTime: req.body.switchoverStartTime,
                    switchoverEndDate: req.body.switchoverEndDate,
                    switchoverEndTime: req.body.switchoverEndTime,
                    switchoverDuration: req.body.switchoverDuration,
                    originSite: req.body.originSite,
                    destinationSite: req.body.destinationSite,
                    details: req.body.details,
                    origin: req.body.origin
                }
            },
        },
    function (err, success) {
        if (err) {
            return res.status(400).send("Can't add switchover! " + err);
        }
        else {
            res.status(200).send("Switchover added!");
        }
    })      
})

module.exports = router




/*
 $push: {
                "Switchovers": {
                    $each: [{ switchoverStartDate: req.body.switchoverStartDate }, {details: req.body.details}],
                    $position: 0
                },
            },


                        {switchoverEndDate: req.body.switchoverEndDate },
                        {switchoverEndTime: req.body.switchoverEndTime },
                        {switchoverDuration: req.body.switchoverDuration },
                        {originSite: req.body.originSite },
                        {destinationSite: req.body.destinationSite },
                        {details: req.body.details},
            */