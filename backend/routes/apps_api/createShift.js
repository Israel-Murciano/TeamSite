const express = require('express');
const router = express.Router();
const dbTeamSite = require('../../config/shifts.model');

// Edits a shift
router.route('/').post((req, res) => {
    const name = req.body.newName
    const shift = req.body.newShift
    const date = req.body.newDate
    dbTeamSite.find({'name' : name, 'date' : date}, function(err, newDoc) {
        if (!newDoc.length) {
            try {
                const name = req.body.newName
                const shift = req.body.newShift
                const date = req.body.newDate
                let newShift = new dbTeamSite({
                    name,
                    shift,
                    date
                    
                })
                newShift.save();
                console.log("Shift Saved")
                return res.status(200).send( "Saved!" );
            } catch(err) {
                return res.status(400).send({ error });
            }
        }
        else {
            return res.status(300).send( "Already exists!" );
        }
      })
    
});

module.exports = router;



/* 












 


*/
































































































