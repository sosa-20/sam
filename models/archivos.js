var mongoose = require('mongoose');

//Schema: Define la estructura de los objetos que se guardaran en una coleccion.
var esquema = new mongoose.Schema({
    url:String,
    nombreArchivo:String,
    fechaSubida:String,
    tipo:String,
    autor:String
});

//El primer parametro tiene que ser el nombre de la coleccion en mongo (puede ser el singular)
module.exports = mongoose.model('archivos',esquema);