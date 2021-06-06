const router = require('express').Router();
let Tasks = require('../../config/tasks.models');

router.route('/').get((req, res) => {
    Tasks.find()
    .then(tasksRes => res.json(tasksRes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const description = req.body.description;
    const handler = req.body.handler;
    const story = req.body.story;
    const status = req.body.status;
    const startdate = req.body.startdate;
    const enddate = req.body.enddate;
    const priority = req.body.priority;

    const newTasks = new Tasks({
        description,
        handler,
        story,
        enddate,
        status,
        startdate,
        priority,
    });

    newTasks.save()
        .then(() => res.json('Task added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Tasks.findById(req.params.id)
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Tasks.findByIdAndDelete(req.params.id)
    .then(() => res.json('Task Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Tasks.findById(req.params.id)
    .then(tasks => {
        tasks.description = req.body.description;
        tasks.handler = req.body.handler;
        tasks.story = req.body.story;
        tasks.status = req.body.status;
        tasks.startdate = req.body.startdate;
        tasks.enddate = req.body.enddate;
        tasks.priority = req.body.priority;

        tasks.save()
        .then(() => res.json('Tasks updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;