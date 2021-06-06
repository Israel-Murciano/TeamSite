const express = require('express');
const router = express.Router();
const dbTeamSite = require('../../config/backups.model');
let Backups = require('../../config/backups.model');
var dateformat = require('dateformat');

router.route('/').get((req, res) => {
    Backups.find()
    .then(backupRes => res.json(backupRes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Backups.findById(req.params.id)
    .then(backups => res.json(backups))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Backups.findById(req.params.id)
    .then(backups => {
        backups.nodename = req.body.nodename;
        backups.failurereason = req.body.FailedJobs;
        backups.comment = req.body.comment;
        backups.name = req.body.name;

        backups.save()
        .then(() => res.json('Backups updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;