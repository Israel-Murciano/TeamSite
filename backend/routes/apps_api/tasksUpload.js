const express = require("express");
const multer = require("multer");
const cors = require("cors");
const router = express.Router();
const dbtaskFiles = require("../../config/taskFiles.model");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "TasksFiles/temp");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).array("file");

router.post("/", function(req, res) {
  upload(req, res, function(err) {
    // Loop on each file.
    for (var i = 0; i < res.req.files.length; i++) {
      var ID = res.req.files[i].filename.substr(0,res.req.files[i].filename.indexOf("~"));
      var realFileName = res.req.files[i].filename.split("~")[1];
      var oldPath = '/usr/src/app/TasksFiles/tmp/' + res.req.files[i].filename
      var newPath = '/usr/src/app/TasksFiles/' + ID + '/' + res.req.files[i].filename
      fs.rename(oldPath, newPath, function(err) {
        if (err) {
          throw err;
        } else {
          console.log("Moved");
        }
      });
      /*
      // Checking if document is exists
      dbtaskFiles.find({ name: fileName }, function(err, docs) {
        if (!docs.length) {
          console.log("Document Not exists!");
          // Inserting documents to MongoDB
          var doc = new dbnehalim({
            name: fileName,
            filename: fileName
          });
          doc.save(function(err, document) {
            if (err) return console.error(err);
            console.log(document.name + " saved");
          });
        } else {
          console.log("Document Already exists!");
        }
      });
      */
    }
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

/*
dbtaskFiles.find({'name' : file.originalFilename}, function(err, docs) {
    if(!docs.length) {
      console.log("Document Not exists!")
      // Inserting documents to MongoDB
      var doc = new dbnehalim({ name: (files.file[0].originalFilename), filename: `${systemName}/${files.file[0].originalFilename}` });
      doc.save(function(err, document) {
      if (err) return console.error(err);
      console.log(document.name + " saved");
    });

    } else {
      console.log("Document Already exists!")
    }
  })
*/

module.exports = router;
