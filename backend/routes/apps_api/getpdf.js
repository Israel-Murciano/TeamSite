const express = require('express');
const router = express.Router();
const dbnehalim = require('../../config/nehalim.model');
const fs = require('fs');


router.get('/:filepath/:getpdf',function(req, res){
    var endpath =  '/usr/src/app/Nehalim/' +  req.params.filepath + "/" + req.params.getpdf;
    console.log("total file path os : " + endpath)
    console.log("filepath : " + req.params.filepath)
    console.log("getpdf : " + req.params.getpdf)
    var readStream = fs.createReadStream(endpath);
    readStream.on('open', function () {
        readStream.pipe(res);
        console.log("read from FS");
    });

    readStream.on('error', function(err) {
        res.end(err);
    });
    
    
});
module.exports = router;
