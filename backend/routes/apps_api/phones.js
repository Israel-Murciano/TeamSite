const router = require('express').Router();
let Phones = require('../../config/phones.models');

router.route('/').get((req, res) => {
    Phones.find()
    .then(phoneRes => res.json(phoneRes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const number = req.body.number;

    const newPhone = new Phones({
        name,
        number,

    });

    newPhone.save()
        .then(() => res.json('Phone added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Phones.findById(req.params.id)
    .then(phone => res.json(phone))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Phones.findByIdAndDelete(req.params.id)
    .then(() => res.json('Phone Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Phones.findById(req.params.id)
    .then(phones => {
        phones.name = req.body.name;
        phones.number = req.body.number;

        phones.save()
        .then(() => res.json('Phone updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;