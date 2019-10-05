
var express = require("express");
var multer  =   require('multer');  
var bodyParser = require("body-parser");
var database = require("./modules/database");

var usuariosRouter = require('./routers/loggin-routers');
var categoriasRouter = require('./routers/categorias-routers');
var archivosRouter = require('./routers/archivos-routers');
var entradasRouter = require('./routers/entradas-routers');
var comentariosRouter = require('./routers/comentarios-routers');

var app = express();

//subir archivo al servidor
var storage =   multer.diskStorage({  
    destination: function (req, file, callback) {  
      callback(null, './www/uploads');  
    },  
    filename: function (req, file, callback) {  
      callback(null, file.originalname);  
    }  
  });  
  var upload = multer({ storage : storage}).single('myfile');
////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//subir archivo al servidor
app.post('/uploadjavatpoint',function(req,res){  
    upload(req,res,function(err) {  
        if(err) {  
            return res.end("error al subir archivo.");  
        }  
        res.end("agregado con exito!");  
    });  
});

//


app.use('/categorias',categoriasRouter);
app.use("/usuarios",usuariosRouter);
app.use("/archivos",archivosRouter);
app.use("/entradas",entradasRouter);
app.use("/comentarios",comentariosRouter);

app.use(express.static("www"));

app.listen(3335,function(){
    console.log("Servidor en linea");
});