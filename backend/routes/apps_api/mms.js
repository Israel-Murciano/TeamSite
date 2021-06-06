const router = require('express').Router();
let MMS = require('../../config/mms.model');

router.route('/').get((req, res) => {
    MMS.find()
    .then(mmsRes => res.json(mmsRes))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;