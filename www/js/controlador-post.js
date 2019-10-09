
var usuarion;
///optener id del post
var URLactual = window.location.search;
var id;
console.log(URLactual);
console.log(window.location.search);
var arrayDeCadenas = window.location.search.split('=');
id=arrayDeCadenas[arrayDeCadenas.length-1];
console.log(id);

if (id) {
  selectPost(id);
  comentarios(id);
}
else{
   todasEntradas();
}

function selectPost(id){
    console.log(id);
    $.ajax({
        url:`entradas/${id}`,
        method:'GET',
        dataType:'json',
        success:(res)=>{
            console.log(res);
            
            anexarEntrada(res);
        },
        error:(error)=>{
            console.error(error);
        }
    });
}
function anexarEntrada(res) {
  if (res.permisoComentario=='1') {
    document.getElementById('entradaReciente').innerHTML +=`
    <div class="card col-12 " style="margin-top: 50px;">
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
      <div class="px-0">
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
    <div class="card col-12 " style="margin-top: 50px;">
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
    
}

function comentar(id){
  var opt= new Date();
  var fecha=opt.getDate()+'/'+(opt.getMonth()+1)+'/'+opt.getFullYear();
  var hora=opt.getHours()+':'+opt.getMinutes()+':'+opt.getSeconds();
  console.log(fecha);
  console.log(hora);
  console.log(document.getElementById(`comentario-post-${id}`).value);
  nombreUsuario();
  if(document.getElementById(`comentario-post-${id}`).value){
    let comentario={
      idEntrada:id,
      autor:usuarion,
      comentario:document.getElementById(`comentario-post-${id}`).value,
    }
    console.log(comentario);
     let parametros = `idEntrada=${comentario.idEntrada}&autor=${comentario.autor}&comentario=${comentario.comentario}&fecha=${fecha}&hora=${hora}`;
      console.log('Información a enviar: ' + parametros);
      $.ajax({
          url:'comentarios/',
          method:'POST',
          data:parametros,
          dataType:'json',
          success:(res)=>{
              console.log("inssrtooo...");
              console.log(res);
              anexarComentario(res ,id);
              document.getElementById(`comentario-post-${id}`).value=``;
          },
          error:(error)=>{
              console.log("eeeerrrrrtttttooo...");
              console.error(error);
          }
      });
  }
}

function anexarComentario(res,id){
  document.getElementById(`comentariosp${id}`).innerHTML +=`
      <p class="card-text"><strong>${res.autor} </strong>${res.comentario}</p>
  `;
  console.log("anexando");
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


function todasEntradas(){
    $.ajax({
        url:"/entradas",
        dataType:"json",
		method:"GET",
		success:function(res){
            console.log(res.length);
            for (let i = res.length; i > 0; i--) {
                anexarEntrada(res[i-1]);
                comentarios(res[i-1]._id);
                console.log(res[i-1]);
            }
            
			
		},
		error:function(error){
			console.log(error);
		}
	});
}
nombreUsuario();
function nombreUsuario(){
    $.ajax({
        
      url:`usuarios/secion`,
      method:'POST',
        success:(res)=>{
            console.log("inssrtooo...");
            if(document.getElementById('sesion')){
                document.getElementById('sesion').innerHTML=`${res}`;
            }
            console.log(res);
            usuarion=res;
        },
        error:(error)=>{
            console.log("eeeerrrrrtttttooo...");
            console.error(error);
        }
    });
  }