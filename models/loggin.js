var mongoose = require('mongoose');

//Schema: Define la estructura de los objetos que se guardaran en una coleccion.
var esquema = new mongoose.Schema({
    nombre:String,
    password:String,
    email:String,
    apellido:String,
    nombreUsuario: String,
    tipoUsuario: String,
    imagenPerfil: String
});

//El primer parametro tiene que ser el nombre de la coleccion en mongo (puede ser el singular)
module.exports = mongoose.model('usuarios',esquema);

/*
Tipos de datos:
Array
Boolean
Buffer
Date
Mixed (Otro JSON o algun tipo de dato flexible)
Number
ObjectId
String
*/