const express = require("express");
const router = express.Router();
const dbTeamSite = require("../../config/humans.model");
const dbShifts = require('../../config/shifts.model');

router.post("/add", function(req, res) {
  let newHuman = new dbTeamSite({
    name: req.body.name
  });
    newHuman.remove(function(err) {
      if (!err) {
        res.json("Member deleted");
      } else {
        res.status(200).send(err);
      }
    });
    console.log(newHuman);
    newHuman
      .save()
      .then(newHuman => {
        res.json("Human Created");
      })
      .catch(err => {
      });
});

router.post("/delete", function(req, res) {
  var name = req.body.name
  dbTeamSite.deleteOne({"name": name}, function(err, result) {
    if(err){
        res.status(400).send("Can't delete member");
    }
    else {
        console.log("Member deleted")
        res.json(result);
    }
})

  dbShifts.deleteMany({"name": name}, function(err,result) {
    if(err) {
      res.status(400).send("Can't delete shifts of " + name);
    }
    else {
      console.log("Shifts of " + name + " deleted")
  }
  })
})

module.exports = router;
