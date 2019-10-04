var express = require('express');
var comentario = require('../models/comentarios');
var router = express.Router();


//Guardar una comentario
router.post('/',function(req,res){
    let c = new comentario({

    idEntrada:req.body.idEntrada,
    autor:req.body.autor,
    comentario:req.body.comentario
    }); 

    //Promesa
    c.save()
    .then(function(obj){
        res.send(obj);
        res.end();
    })
    .catch(function(error){
        res.send(error);
        res.end();
    });
});

//Obtener todos los comentarios
router.get('/',function(req,res){
    comentario.find()
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});



module.exports = router;