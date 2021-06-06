const router = require('express').Router();
let SVM = require('../../config/svm.models');

router.route('/').get((req, res) => {
    SVM.find()
    .then(svmRes => res.json(svmRes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const svm_name = req.body.svm_name;

    const newSVM = new SVM({
        svm_name,

    });

    newSVM.save()
        .then(() => res.json('SVM added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    SVM.findById(req.params.id)
    .then(phone => res.json(phone))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    SVM.findByIdAndDelete(req.params.id)
    .then(() => res.json('Phone Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    SVM.findById(req.params.id)
    .then(svm => {
        svm.svm_name = req.body.svm_name;

        svm.save()
        .then(() => res.json('Phone updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;