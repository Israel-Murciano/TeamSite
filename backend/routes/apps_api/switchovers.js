const router = require('express').Router();
let Switchovers = require('../../config/switchovers.models');
const dbTeamSite = require('../../config/app_server.model');

router.route('/').get((req, res) => {
    Switchovers.find().sort({switchoverStart: -1})
    .then(switchoverRes => res.json(switchoverRes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getApps').get((req, res) => {
    dbTeamSite.find().select('app -_id')
    .then(appRes => res.json(appRes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Switchovers.findById(req.params.id)
    .then(switchoverRes => res.json(switchoverRes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/remove/:id').post((req, res) => {
    Switchovers.update({},
        {$pull: {Switchovers: {_id: req.params.id}}},
        {multi: true}
        )
    .then(() => res.json('Event Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;