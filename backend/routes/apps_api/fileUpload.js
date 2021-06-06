// Imports
const express = require("express");
const multiparty = require("multiparty");
const app = express();
const fs = require("fs");
const folder = "/usr/src/app/Nehalim/";
const router = express.Router();
const mongoose = require("mongoose");
const dbnehalim = require("../../config/nehalim.model");
const mv = require('mv');

router.post("/", (req, res) => {

  const form = new multiparty.Form();

  return form.parse(req, (err, fields, files) => {
    //error handling
    if (err) {
      return res.status(400).send({ error: err });
    }

    //path
    const { path } = files.file[0];
    var origiFName = (files.file[0].originalFilename);
    var filefolder = `${folder}${files.file[0].originalFilename}`;
    var systemName = filefolder.substring(filefolder.lastIndexOf("-") + 1);
    systemName = systemName.replace(/\.[^/.]+$/, "").trim();
    var path4System = `${folder}${systemName}`;

    if (!fs.existsSync(path4System)) {
      console.log("Doesn't exists path: " + path4System);
      fs.mkdirSync(path4System);
      console.log("Creating this folder: " + path4System);
    }

    var lastPath = path4System + "/" + files.file[0].originalFilename;
    console.log("LAST: " + lastPath);

    // Checking if document is exists
    dbnehalim.find({'name' : origiFName}, function(err, docs) {
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

    mv(path, `${lastPath}`, function(err){
      if (err){
        console.log(err);
        return res.status(400).send({ error });
      }
      return res.status(200).send({ file: `${filefolder}` });
    })
  });
});

module.exports = router;
