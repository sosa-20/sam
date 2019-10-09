var idedit;
nombreUsuario();
if (document.getElementById('entradaReciente')) {
    console.log("opteniendo");
    ultimaEntrada();
    ctdComentarios();
}else if (document.getElementById('todasEntradas')){
    datosEntradas();
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
             <center><h5 class="card-title">Tu ultima entrada</h5></center>
                <img src="${req.urlImagen}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${req.titulo}</h5>
                  <p class="card-text">`+ req.descripcion + `</p>
                  <a href="entradaCreada.html?id=${req._id}">ver mas...</a>
                </div>
           </div>`;
}







//llenar selec con las imagenes disponibles

if (document.getElementById('categoriaSelect') && document.getElementById('imagenSelect')) {
    imagenesEntradas();
    categorias();
    var usuarion;
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
    document.getElementById('imagenSelect').innerHTML += `<option value="${res.nombreArchivo}">${res.nombreArchivo}</option>`;
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
    nombreUsuario();
       console.log("este es nombre usuario"+usuarion);
    var opt= new Date();
  var fecha=opt.getDate()+'/'+(opt.getMonth()+1)+'/'+opt.getFullYear();
  var hora=opt.getHours()+':'+opt.getMinutes()+':'+opt.getSeconds();
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
       
    let url='uploads/' + document.getElementById('imagenSelect').value;
    console.log(url);
        let entrada={
            titulo: document.getElementById('tituloEntrada').value,
            urlImagen: url,
            idCategoria: document.getElementById('categoriaSelect').value,
            descripcion: document.getElementById('descripcionEntrada').value,
            fechaPublicacion: fecha,
            horaPublicacion: hora,
            autor:usuarion,
            permisoComentario: comentario
        }
        console.log(entrada);
        //Guardar en el servidor
    let parametros = `titulo=${entrada.titulo}&urlImagen=${entrada.urlImagen}&idCategoria=${entrada.idCategoria}&descripcion=${entrada.descripcion}&fechaPublicacion=${entrada.fechaPublicacion}&horaPublicacion=${entrada.horaPublicacion}&autor=${entrada.autor}&permisoComentario=${entrada.permisoComentario}`;
      
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


function datosEntradas(){
    $.ajax({
        url:"/entradas",
        dataType:"json",
		method:"GET",
		success:function(res){
            console.log(res.length);
            for (let i = res.length; i > 0; i--) {
                console.log(res[i-1]._id);
                cantidadComentarios(res[i-1]);
                //anexarEntrada(res[i-1]);
                /*comentarios(res[i-1]._id);
                console.log(res[i-1]);*/
            }
		},
		error:function(error){
			console.log(error);
		}
	});
}

function anexarEntrada(res,ctd){
    
    document.getElementById('todasEntradas').innerHTML += `<tr id="${res._id}">
        <td onclick="verPost('${res._id }')">${res.titulo}</td>
        <td>${res.autor}</td>
        <td>${res.idCategoria}</td>
        <td id="numeroComentarios">${ctd}</td>
        <td>${res.fechaPublicacion}</td>
        <td><button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal" onclick="editarPost('${res._id}')"><i class="far fa-edit iconot"></i></button>
        <button type="button" class="btn btn-danger" onclick="eliminar('${res._id }','${ctd}')"><i class="far fa-trash-alt iconot"></i></button></td>
        </tr>`;
}


function cantidadComentarios(id){
    ctd=0;
    $.ajax({
        url:"/comentarios",
        dataType:"json",
		method:"GET",
		success:function(res){
            console.log(res.length);
            let ctd=0;
            for (let i = 0;i<res.length; i++) {
              if (res[i].idEntrada == id._id) {
                ctd=ctd+1;
              }
            }
            anexarEntrada(id,ctd)
            console.log(id+"cantida de coment"+ctd);
		},
		error:function(error){
			console.log(error);
		}
	});
}
function eliminar(id, ctd){
    console.log(ctd);
    $.ajax({
        url:`entradas/${id}`,
        method:'delete',
        dataType:'json',
        success:(res)=>{
            eliminarComentarios(id);
            console.log(res);
            if (res.ok == 1)
                $(`#${id}`).remove();
        },
        error:(error)=>{
            console.error(error);
        }
    });
}

function eliminarComentarios(id){
    console.log("lleeeeee1");
    $.ajax({
        url:"/comentarios",
        dataType:"json",
		method:"GET",
		success:function(res){
            console.log(res.length);
            let ctd=0;
            for (let i = 0;i<res.length; i++) {
              if (res[i].idEntrada == id) {
                eliminando(res[i]._id);
              }
            }
		},
		error:function(error){
			console.log(error);
		}
	});
   
}
function eliminando(id) {
    console.log("lleeeeee2");
    $.ajax({
        url:`comentarios/${id}`,
        method:'delete',
        dataType:'json',
        success:(res)=>{
            console.log(res);
        },
        error:(error)=>{
            console.error(error);
        }
    });
}

function editarPost(id) {
    document.getElementById('descripcionEntrada').value=``;
    $("#descripcionEntrada").val(''); 
    console.log(id);
    $.ajax({
     url:`entradas/${id}`,
     method:'GET',
     dataType:'json',
     success:(entrada)=>{
        document.getElementById('descripcionEntrada').value=``;
        var arrayDeCadenas = entrada.urlImagen.split('/');
        imag=arrayDeCadenas[arrayDeCadenas.length-1];
        var proce=document.getElementsByName('comentariosOpcion');
        if (entrada.permisoComentario=='1') {
            proce[0].checked;
            document.getElementsByName('comentariosOpcion')[0].checked=true;
            //comentario=proce[0].value;
        }
        if (entrada.permisoComentario=='0') {
            proce[1].checked;
            document.getElementsByName('comentariosOpcion')[1].checked=true;
            //comentario=proce[1].value;
        }
        document.getElementById('tituloEntrada').value=entrada.titulo;
        document.getElementById('imagenSelect').value=imag;
        document.getElementById('categoriaSelect').value=entrada.idCategoria;
        document.getElementById('descripcionEntrada').value=entrada.descripcion;
        //permisoComentario: comentario
    },
    error:(error)=>{
        console.error(error);
    }
});
idedit=id;
}

function actualizar() {
    console.log(idedit);
    var opt= new Date();
  var fecha=opt.getDate()+'/'+(opt.getMonth()+1)+'/'+opt.getFullYear();
  var hora=opt.getHours()+':'+opt.getMinutes()+':'+opt.getSeconds();
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
    console.log("editooo");
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
    let url='uploads/' + document.getElementById('imagenSelect').value;
    console.log(url);
        let entrada={
            titulo: document.getElementById('tituloEntrada').value,
            urlImagen: url,
            idCategoria: document.getElementById('categoriaSelect').value,
            descripcion: document.getElementById('descripcionEntrada').value,
            fechaPublicacion: fecha,
            horaPublicacion: hora,
            autor:"sosa96",
            permisoComentario: comentario
        }
        console.log(entrada);
        //Guardar en el servidor
    let parametros = `titulo=${entrada.titulo}&urlImagen=${entrada.urlImagen}&idCategoria=${entrada.idCategoria}&descripcion=${entrada.descripcion}&fechaPublicacion=${entrada.fechaPublicacion}&horaPublicacion=${entrada.horaPublicacion}&autor=${entrada.autor}&permisoComentario=${entrada.permisoComentario}`;
      
    console.log('Información a enviar: ' + parametros);
    $.ajax({
        url:`entradas/${idedit}`,
        method:'PUT',
        data:parametros,
        dataType:'json',
        success:(res)=>{
            console.log(res);
            document.getElementById('todasEntradas').innerHTML=``;
            datosEntradas();
                        /*if (res._id != undefined)
                anexarFilaTabla(res);*/
                /*document.getElementById('respuesta').innerHTML=``;*/
        },
        error:(error)=>{
            console.error(error);
        }
    });
   }
}

function verPost(id){
    $('#postmodal').modal('show');
    console.log(id);
    $.ajax({
        url:`entradas/${id}`,
        method:'GET',
        dataType:'json',
        success:(res)=>{
            console.log(res);
            
            anexarModal(res);
        },
        error:(error)=>{
            console.error(error);
        }
    });
   
}
function anexarModal(res) {
    document.getElementById('entradaPost').innerHTML =``;
    if (res.permisoComentario=='1') {
      document.getElementById('entradaPost').innerHTML +=`
      <div class="card col-12 ">
      <img src="${res.urlImagen}" class="card-img" style="opacity: 0.7;" alt="...">
      <div class="card-img-overlay">
              <center><h1 class="card-title">${res.titulo}</h5></center>
      </div>
      <div class="card-body">
        <h5 class="card-title">`+ res.descripcion+`</h5>
        <p class="card-text"><strong>Categoria: </strong>${res.idCategoria}</p>
        <p class="card-text"><small class="text-muted">publicado ${res.fechaPublicacion}</small></p>
        <hr>
        <h5 class="card-title">Comentarios</h5>
        <div id="comentariosp${res._id}">
           
        </div>
        <hr>
        <div class="px-0" style="display: none">
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Comment" id="comentario-post-${res._id}">
                <div class="input-group-append">
                    <button type="button" onclick="comentar('${res._id}');" class="btn btn-danger">Comentar</button>
                </div>
              </div>
            </div>
      </div>
    </div><br>`;
    }else{
      document.getElementById('entradaReciente').innerHTML +=`
      <div class="card col-12 ">
      <img src="${res.urlImagen}" class="card-img" style="opacity: 0.7;" alt="...">
      <div class="card-img-overlay">
              <center><h1 class="card-title">${res.titulo}</h5></center>
      </div>
      <div class="card-body">
        <h5 class="card-title">`+ res.descripcion+`</h5>
        <p class="card-text"><strong>Categoria: </strong>${res.idCategoria}</p>
        <p class="card-text"><small class="text-muted">publicado ${res.fechaPublicacion}</small></p>
        <hr>
        <h5 class="card-title" style="display: none">Comentarios</h5>
        <div id="comentariosp${res._id}">
           
        </div>
        <hr style="display: none">
        <div class="px-0"  style="display: none">
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Comment" id="comentario-post-${res._id}">
                <div class="input-group-append">
                    <button type="button" onclick="comentar('${res._id}');" class="btn btn-danger">Comentar</button>
                </div>
              </div>
            </div>
      </div>
    </div><br>`;
    }
    comentarios(res._id); 
  }

  function comentarios(id){
    console.log("este es un id "+id);
      $.ajax({
          url:"/comentarios",
          dataType:"json",
          method:"GET",
          success:function(res){
              console.log(res.length);
              for (let i = res.length; i >0 ; i--) {
                if (res[i-1].idEntrada == id) {
                  anexarComentario(res[i-1],id);
                }
              }
          },
          error:function(error){
              console.log(error);
          }
      });
  }
  function anexarComentario(res,id){
    document.getElementById(`comentariosp${id}`).innerHTML +=`
        <p class="card-text"><strong>${res.autor} </strong>${res.comentario}</p>
    `;
    console.log("anexando");
  }

  function nombreUsuario(){
    $.ajax({
        url:`usuarios/secion`,
        method:'POST',
        success:(res)=>{
            console.log("inssrtooo...");
            document.getElementById('sesion').innerHTML=`${res}`;
            console.log(res);
            usuarion=res;
        },
        error:(error)=>{
            console.log("eeeerrrrrtttttooo...");
            console.error(error);
        }
    });
  }
  function ctdComentarios(){
    $.ajax({
        url:"/comentarios",
        dataType:"json",
		method:"GET",
		success:function(res){
            console.log(res.length);
            ctd=res.length;
            document.getElementById('ctdComentarios').innerHTML=`<i class="fas fa-arrow-right"></i> (${ctd})
            <a href="#">comentarios</a>`;
		},
		error:function(error){
			console.log(error);
		}
    });
    
    $.ajax({
        url:"/usuarios",
        dataType:"json",
		method:"GET",
		success:function(res){
           ctd=res.length;
           document.getElementById('ctdUsuarios').innerHTML=`<i class="fas fa-arrow-right"></i> (${ctd})
            <a href="#">Usuarios</a>`;
		},
		error:function(error){
			console.log(error);
		}
    });
    $.ajax({
        url:"/entradas",
        dataType:"json",
		method:"GET",
		success:function(res){
            ctd=res.length;
           document.getElementById('ctdEntradas').innerHTML=`<i class="fas fa-arrow-right"></i> (${ctd})
            <a href="#">Entradas</a>`;
		},
		error:function(error){
			console.log(error);
		}
    });
    $.ajax({
        url:"/categorias",
        dataType:"json",
		method:"GET",
		success:function(res){
            ctd=res.length;
           document.getElementById('ctdCategorias').innerHTML=`<i class="fas fa-arrow-right"></i> (${ctd})
            <a href="#">Categorias</a>`;
		},
		error:function(error){
			console.log(error);
		}
	});
}