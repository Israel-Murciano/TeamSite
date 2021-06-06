const express = require('express');
const router = express.Router();
const dbnehalim = require('../../config/nehalim.model');
const fs = require('fs');


router.get('/:filepath/:getpdf',function(req, res){
    var endpath =  '/usr/src/app/Nehalim/' +  req.params.filepath + "/" + req.params.getpdf;
    console.log("total file path os : " + endpath)
    console.log("filepath : " + req.params.filepath)
    console.log("getpdf : " + req.params.getpdf)
    try {
        fs.unlinkSync(endpath)
        console.log("Deleted nohal: " + endpath);
        // file removed
        dbnehalim.deleteOne({"name": req.params.getpdf}, function(err, result) {
            if(err){
                res.status(400).send("Can't delete nohal");
            }
            else {
                console.log("Deleted from mongoDB")
                res.json(result);
            }
        })

    } catch(err) {
        console.log("delet file error: " + err)
    }
});
module.exports = router;