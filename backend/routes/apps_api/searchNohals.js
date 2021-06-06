const express = require('express');
const router = express.Router();
const dbnehalim = require('../../config/nehalim.model');

router.get('/:getSearch',function(req, res){
    const getSearch = req.params.getSearch;
    dbnehalim.find({'name': {$regex: getSearch, $options: 'i'}},
        function (error,data) {
                if (error) {
                    res.status(400).send('Not Found');
                }
                else if (!data.length) {
                    res.send('Not Found');
                }
                else {
                    res.json(data);
                }
        })
}); 
module.exports = router;