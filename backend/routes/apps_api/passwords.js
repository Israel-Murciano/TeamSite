const router = require('express').Router();
const Passwords = require('../../config/passwords.model');

router.route('/').get((req, res) => {
    Passwords.find()
    .then(passwords => res.json(passwords))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Adding an app to the DB
// URL: http://localhost:5000/passwords/add
router.route('/add').post((req, res) => {
    const component = req.body.component;
    const username = req.body.username;
    const password = req.body.password;
    
    const newPassword = new Passwords({
        component,
        username,
        password,
    });

    newPassword.save()
        .then(() => res.json('Password added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Passwords.findById(req.params.id)
    .then(passwords => res.json(passwords))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Passwords.findByIdAndDelete(req.params.id)
    .then(() => res.json('Password Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Passwords.findById(req.params.id)
    .then(passwords => {
        passwords.component = req.body.component;
        passwords.username = req.body.username;
        passwords.password = req.body.password;
        
        passwords.save()
        .then(() => res.json('Passwords updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;