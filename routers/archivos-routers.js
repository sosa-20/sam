var express = require('express');
var archivo = require('../models/archivos');
var router = express.Router();



//guardar archivo
router.post('/',function(req,res){
    let a = new archivo({
        url:req.body.url,
        nombreArchivo:req.body.nombreArchivo,
        fechaSubida:req.body.fechaSubida,
        tipo:req.body.tipo
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

//Obtener todos los archivos
router.get('/',function(req,res){
    archivo.find()
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//obtener solo imagenes

router.get('/imagenes',function(req,res){
    archivo.find({
        "tipo": "imagen"
    })
    .then((data)=>{
        res.send(data);
        res.end();
    })
    .catch((error)=>{
        res.send(error);
        res.end();
    });
});

//eliminar archivo
router.delete('/:id',function(req,res){
    archivo.remove({_id:req.params.id})
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