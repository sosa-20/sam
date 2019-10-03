var express = require('express');
var entrada = require('../models/entradas');
var router = express.Router();

//Guardar una entrada
router.post('/',function(req,res){
    let e = new entrada({

    titulo:req.body.titulo,
    idImagen:req.body.idImagen,
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
module.exports = router;