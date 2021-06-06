const router = require('express').Router();
let Niturs = require('../../config/niturs.models');

router.route('/').get((req, res) => {
    Niturs.find()
    .then(niturRes => res.json(niturRes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const hint = req.body.hint;
    const message = req.body.message;

    const newNitur = new Niturs({
        hint,
        message,

    });

    newNitur.save()
        .then(() => res.json('Nitur added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Niturs.findById(req.params.id)
    .then(nitur => res.json(nitur))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Niturs.findByIdAndDelete(req.params.id)
    .then(() => res.json('Nitur Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Niturs.findById(req.params.id)
    .then(niturs => {
        niturs.hint = req.body.hint;
        niturs.message = req.body.message;

        niturs.save()
        .then(() => res.json('Niturs updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;