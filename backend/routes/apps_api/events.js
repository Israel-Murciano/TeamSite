const router = require('express').Router();
let Events = require('../../config/events.models');

router.get('/',function(req, res){
    Events.find()
    .then(eventsRes => res.json(eventsRes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const system = req.body.system;
    const domain = req.body.domain;
    const description = req.body.description;
    const startdate = req.body.startdate;
    const starttime = req.body.starttime;
    const name = req.body.name;
    const handler = req.body.handler;
    const story = req.body.story;
    const effect = req.body.effect;
    const closedate = req.body.closedate;
    const closetime = req.body.closetime;
    const status = req.body.status;

    const newEvents = new Events({
        system,
        domain,
        description,
        startdate,
        starttime,
        name,
        handler,
        story,
        effect,
        closedate,
        closetime,
        status,
    });

    newEvents.save()
        .then(() => res.json('Events added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Events.findById(req.params.id)
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Events.findByIdAndDelete(req.params.id)
    .then(() => res.json('Event Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Events.findById(req.params.id)
    .then(events => {
        events.system = req.body.system;
        events.domain = req.body.domain;
        events.description = req.body.description;
        events.startdate = req.body.startdate;
        events.starttime = req.body.starttime;
        events.name = req.body.name;
        events.handler = req.body.handler;
        events.story = req.body.story;
        events.effect = req.body.effect;
        events.closedate = req.body.closedate;
        events.closetime = req.body.closetime;
        events.status = req.body.status;

        events.save()
        .then(() => res.json('Events updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;