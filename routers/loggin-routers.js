var express = require('express');
var session = require('express-session');
var usuario = require('../models/loggin');
var router = express.Router();

router.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));
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

/* verificar secion y crear variables de secion*/
 router.post("/login",function(req, res){

    usuario.find({nombreUsuario:req.body.nombreUsuario, password:req.body.password})
    .then((data)=>{
        if (data.length==1){//Significa que si encontro un usuario con las credenciales indicadas
            //Establecer las variables de sesion
            req.session.codigoUsuario = data[0]._id;
            req.session.nombreUsuario =  data[0].nombreUsuario;
            req.session.codigoTipoUsuario = data[0].tipoUsuario;
            res.send({status:1,mensaje:"Usuario autenticado con éxito", usuario:data[0]});
        }else{
            res.send({status:0,mensaje:"Credenciales inválidas"});
        }
        
    })
    .catch(error=>{
        res.send(error);
    }); 
  });

  router.post("/secion",function(req, res){

    res.send(req.session.nombreUsuario)
  });

module.exports = router;