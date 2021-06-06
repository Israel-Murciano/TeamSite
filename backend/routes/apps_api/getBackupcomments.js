const express = require('express');
const router = express.Router();
const dbTeamSite = require('../../config/backupcomments.model');
let backup3 = require('../../config/backupcomments.model');
var dateformat = require('dateformat');

router.route('/:nodename').get((req, res) => {
    backup3.find({'nodename' : req.params.nodename })
    .then(backupRes => res.json(backupRes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    backup3.findById(req.params.id)
    .then(backups => res.json(backups))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const nodename = req.body.nodename;
    const instancename = req.body.instancename;
    const subclientname = req.body.subclientname;
    const comment = req.body.comment;
    const name = req.body.name;

    const newBackup = new backup3({
        nodename,
        instancename,
        subclientname,
        comment,
        name,
    });

    newBackup.save()
        .then(() => res.json('Phone added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    backup3.findById(req.params.id)
    .then(backups => {
        backups.nodename = req.body.nodename;
        backups.comment = req.body.comment;
        backups.name = req.body.name;

        backups.save()
        .then(() => res.json('Backups updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;