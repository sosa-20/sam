var express = require('express');
var usuario = require('../models/loggin');
var router = express.Router();

//Guardar un usuario
router.post('/',function(req,res){
    let u = new usuario({
        nombre:req.body.nombre,
        password:req.body.password,
        email:req.body.email,
        apellido:req.body.apellido,
        nombreUsuario: req.body.nombreUsuario,
        tipoUsuario: req.body.tipoUsuario,
        imagenPerfil: req.body.imagenPerfil
    }); 

    //Promesa
    u.save()
    .then(function(obj){
        res.send(obj);
        res.end();
    })
    .catch(function(error){
        res.send(error);
        res.end();
    });
});



//Obtener todos los usuarios
router.get('/',function(req,res){
    usuario.find()
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//eliminar usuario
router.delete('/:id',function(req,res){
    usuario.remove({_id:req.params.id})
    .then((result)=>{
        res.send(result);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//optener usuario
router.get('/:id',function(req,res){
    usuario.find({_id:req.params.id})
    .then((data)=>{
        res.send(data[0]);//Se le pone 0 para que solo envie un json y no un arreglo con un json
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//actualiza usuario
router.put('/:id',function(req,res){
    usuario.update(
        {_id:req.params.id},
        {
            nombre:req.body.nombre,
            password:req.body.password,
            email:req.body.email,
            apellido:req.body.apellido,
            nombreUsuario: req.body.nombreUsuario,
            tipoUsuario: req.body.tipoUsuario,
            imagenPerfil: req.body.imagenPerfil
         }
    )
    .then((result)=>{
         res.send(result);
         res.end();
    })
    .catch((error)=>{
         res.send(error);
         res.end();
    });
 });

module.exports = router;