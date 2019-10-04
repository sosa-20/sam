var express = require('express');
var entrada = require('../models/entradas');
var router = express.Router();

//Guardar una entrada
router.post('/',function(req,res){
    let e = new entrada({

    titulo:req.body.titulo,
    urlImagen:req.body.urlImagen,
    idCategoria:req.body.idCategoria,
    descripcion:req.body.descripcion,
    fechaPublicacion:req.body.fechaPublicacion,
    autor:req.body.autor,
    permisoComentario:req.body.permisoComentario
    }); 

    //Promesa
    e.save()
    .then(function(obj){
        res.send(obj);
        res.end();
    })
    .catch(function(error){
        res.send(error);
        res.end();
    });
});
//optener la ultima entrada
router.get('/ultima',function(req,res){
    entrada.find().limit(1).sort({$natural:-1})
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//optener todas las entradas
router.get('/',function(req,res){
    entrada.find()
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//optener entrada
router.get('/:id',function(req,res){
    entrada.find({_id:req.params.id})
    .then((data)=>{
        res.send(data[0]);//Se le pone 0 para que solo envie un json y no un arreglo con un json
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});




module.exports = router;

