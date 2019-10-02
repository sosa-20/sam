var express = require('express');
var archivo = require('../models/archivos');
var router = express.Router();



//guardar archivo
router.post('/',function(req,res){
    let a = new archivo({
        url:req.body.url
    }); 

    //Promesa
    a.save()
    .then(function(obj){
        res.send(obj);
        res.end();
    })
    .catch(function(error){
        res.send(error);
        res.end();
    });
});


module.exports = router;