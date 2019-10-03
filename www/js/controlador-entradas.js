
if (document.getElementById('entradaReciente')) {
    console.log("opteniendo");
    ultimaEntrada();
}

function ultimaEntrada(){
    $.ajax({
        url:"entradas/ultima",
        dataType:"json",
		method:"GET",
		success:function(res){
            console.log(res);
            anexarUltima(res[0]);
		},
		error:function(error){
			console.log(error);
		}
	});
}

function anexarUltima(req){
    document.getElementById('entradaReciente').innerHTML +=`
             <div class="card col-6 iniciopag" style="margin-top: 50px;">
                <img src="./${req.imagenId}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${req.titulo}</h5>
                  <p class="card-text">`+ req.descripcion + `</p>
                  <a href="entradaCreada.html?id=${req._id}">ver mas...</a>
                </div>
           </div>`;
}

















var comentariost = ['Manzana', 'Banana'];
//llenar selec con las imagenes disponibles

if (document.getElementById('categoriaSelect') && document.getElementById('imagenSelect')) {
    imagenesEntradas();
    categorias();
}

function imagenesEntradas(){
    $.ajax({
        url:"archivos/imagenes",
        dataType:"json",
		method:"GET",
		success:function(res){
            document.getElementById('imagenSelect').innerHTML =``;
            console.log(res.length);
            for (let i = 0; i < res.length; i++) {
                anexarimagenes(res[i]);
            }
            
			
		},
		error:function(error){
			console.log(error);
		}
	});
}
function anexarimagenes(res){
    document.getElementById('imagenSelect').innerHTML += `<option value="${res.url}">${res.nombreArchivo}</option>`;
    console.log(res._id);
}



//llenar select con las categorias

function categorias(){
    document.getElementById('categoriaSelect').innerHTML =``;
    $.ajax({
        url:"/categorias",
        dataType:"json",
		method:"GET",
		success:function(res){
            console.log(res.length);
            for (let i = 0; i < res.length; i++) {
                llenarCategorias(res[i]);
            }
            
			
		},
		error:function(error){
			console.log(error);
		}
	});
}
function llenarCategorias(res) {
        document.getElementById('categoriaSelect').innerHTML += `<option value="${res.nombreCategoria}">${res.nombreCategoria}</option>`;

}

entradas = [
    { id: 'tituloEntrada', valido: false },
    { id: 'categoriaSelect', valido: false },
    { id: 'imagenSelect', valido: false },
];

function registrarEntrada() {
    var f = new Date();
    var comentario;
    var proce=document.getElementsByName('comentariosOpcion');
    if (proce[0].checked) {
        comentario=proce[0].value;
    }
    if (proce[1].checked) {
        comentario=proce[1].value;
    }
    console.log(comentario + " seleciono no");
    var insertar;
    document.getElementById('editor').innerHTML=document.getElementById('descripcionEntrada').value;
    console.log("editooo");
    console.log( document.getElementById('editor').value);
    document.getElementById('entradaError').style.display = 'none';
    document.getElementById('entradaExito').style.display = 'none';
    console.log("holaaa");
    for (let i = 0; i < entradas.length; i++)
        entradas[i].valido = validarCampoVacio(entradas[i].id);
     
    console.log(entradas);
    for (let i = 0; i < entradas.length; i++) {
        if (!entradas[i].valido) {
            document.getElementById('entradaError').style.display = 'block';
            return;
        }
        else{
            insertar='si';
            console.log("si se puede");
        }
    }
   if (insertar=='si') {
        let entrada={
            titulo: document.getElementById('tituloEntrada').value,
            imagenId: document.getElementById('imagenSelect').value,
            idCategoria: document.getElementById('categoriaSelect').value,
            descripcion: document.getElementById('descripcionEntrada').value,
            fechaPublicacion: f,
            comentarios: comentariost,
            autor:"sosa96",
            permisoComentario: comentario
        }
        console.log(entrada);
        //Guardar en el servidor
    let parametros = `titulo=${entrada.titulo}&imagenId=${entrada.imagenId}&idCategoria=${entrada.idCategoria}&descripcion=${entrada.descripcion}&fechaPublicacion=${entrada.fechaPublicacion}&comentarios=${entrada.comentarios}&autor=${entrada.autor}&permisoComentario=${entrada.permisoComentario}`;
      
    console.log('Información a enviar: ' + parametros);
    $.ajax({
        url:'entradas/',
        method:'POST',
        data:parametros,
        dataType:'json',
        success:(res)=>{
            console.log("inssrtooo...");
            console.log(res);
           // document.getElementById('respuesta').innerHTML=``;
            //usuarios();
        },
        error:(error)=>{
            console.log("eeeerrrrrtttttooo...");
            console.error(error);
        }
    });
    }
    document.getElementById('entradaError').style.display = 'none';
    document.getElementById('entradaExito').style.display = 'block';
}

function validarCampoVacio(id) {
    let resultado = (document.getElementById(id).value == "") ? false : true;
    marcarInput(id, resultado);
    return resultado;

}

function marcarInput(id, valido) {
    if (valido) {
        document.getElementById(id).classList.remove('is-invalid');
        document.getElementById(id).classList.add('is-valid');
    } else {
        document.getElementById(id).classList.remove('is-valid');
        document.getElementById(id).classList.add('is-invalid');
    }
}

