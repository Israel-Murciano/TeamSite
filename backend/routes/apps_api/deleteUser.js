const express = require('express');
const router = express.Router();
const dbnehalim = require('../../config/user.model');
const fs = require('fs');

router.post("/:username", (req, res) => {
    var username = req.params.username;
    console.log(username)
    dbnehalim.deleteOne({ username: username }, function(err, result) {
      if (err) {
        res.status(400).send("Can't delete user");
      } else {
        console.log("Deleted from mongoDB");
        res.json(result);
      }
    });
  });

module.exports = router;



