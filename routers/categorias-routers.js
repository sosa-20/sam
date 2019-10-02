var express = require('express');
var categoria = require('../models/categorias');
var router = express.Router();



//Guardar un categoria
router.post('/',function(req,res){
    let c = new categoria({
        nombreCategoria:req.body.nombreCategoria,
        descripcion:req.body.descripcion
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

//Obtener todos las categorias
router.get('/',function(req,res){
    categoria.find()
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});


//eliminar categoria
router.delete('/:id',function(req,res){
    categoria.remove({_id:req.params.id})
    .then((result)=>{
        res.send(result);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});


//optener categoria
router.get('/:id',function(req,res){
    categoria.find({_id:req.params.id})
    .then((data)=>{
        res.send(data[0]);//Se le pone 0 para que solo envie un json y no un arreglo con un json
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//actualiza categoria
router.put('/:id',function(req,res){
    categoria.update(
        {_id:req.params.id},
        {
            nombreCategoria:req.body.nombreCategoria,
            descripcion:req.body.descripcion,
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