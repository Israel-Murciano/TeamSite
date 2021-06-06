const express = require('express');
const router = express.Router();
const activity = require('../../config/activity.model');
const moment = require('moment');

router.get('/',(req, res) => {
    activity.find(function(err, data){
        if (err){
            res.status(400).send("Not Found");
        }
        else {
            res.json(data);
        }
    });
});

router.get("/:id",(req,res) => {
    activity.findById(req.params.id)
    .then(foundActivity => res.json(foundActivity))
    .catch(err => res.status(400).json('Error:' + err));
})

router.route('/update/:id').post((req, res) => {
    activity.findById(req.params.id)
    .then(foundActivity => {
        foundActivity.activityTitle = req.body.activityTitle;
        foundActivity.description = req.body.description;
        foundActivity.activityStartDate = req.body.activityStartDate;
        foundActivity.activityEndDate = req.body.activityEndDate;
        foundActivity.team = req.body.team;
        foundActivity.status = req.body.status;

        foundActivity.save()
        .then(() => res.json('Activity updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/add",(req,res) => {

    var activityStartDate = moment(req.body.activityStartDate,"D/MM/yyyy");
    var activityEndDate = moment(req.body.activityEndDate, "D/MM/yyyy");
    const activityTitle = req.body.activityTitle;
    const description = req.body.description;
    const team = req.body.team;
    const status = req.body.status;

    const newActivity = new activity({
        activityTitle,
        description,
        activityStartDate,
        activityEndDate,
        team,
        status
    }); 
    newActivity.save()
        .then(() => res.json("Activity Added Successfully!"))
        .catch((err) => res.status(400).json('Error: ' + err));
});

router.delete("/delete/:id",(req, res) => {
    activity.findByIdAndDelete(req.params.id)
    .then(() => res.json('activity Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

