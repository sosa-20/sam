

///optener id del post
var URLactual = window.location.search;
var id;
console.log(URLactual);
console.log(window.location.search);
var arrayDeCadenas = window.location.search.split('=');
id=arrayDeCadenas[arrayDeCadenas.length-1];
console.log(id);


selectPost(id);
function selectPost(){
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
    document.getElementById('entradaReciente').innerHTML=`
    <div class="card col-12">
    <img src="${res.imagenId}" class="card-img" style="opacity: 0.7;" alt="...">
    <div class="card-img-overlay">
            <center><h1 class="card-title">${res.titulo}</h5></center>
    </div>
    <div class="card-body">
      <h5 class="card-title">`+ res.descripcion+`</h5>
      <p class="card-text"><strong>Categoria: </strong>${res.idCategoria}</p>
      <p class="card-text"><small class="text-muted">publicado ${res.fechaPublicacion}</small></p>
      <hr>
      <h5 class="card-title">Comentarios</h5>
      <div id="comentariosp">
         
      </div>
      <hr>
      <div class="px-0">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Comment" id="comentario-post-1">
              <div class="input-group-append">
                  <button type="button" onclick="comentar('${res._id}');" class="btn btn-danger">publicar</button>
              </div>
            </div>
          </div>
    </div>
  </div>`;
}

function comentar(id){
  console.log(document.getElementById('comentario-post-1').value);
  if(document.getElementById('comentario-post-1').value){
    let comentario={
      idEntrada:id,
      autor:"soa96",
      comentario:document.getElementById('comentario-post-1').value,
    }
    console.log(comentario);
     let parametros = `idEntrada=${comentario.idEntrada}&autor=${comentario.autor}&comentario=${comentario.comentario}`;
      console.log('Información a enviar: ' + parametros);
      $.ajax({
          url:'comentarios/',
          method:'POST',
          data:parametros,
          dataType:'json',
          success:(res)=>{
              console.log("inssrtooo...");
              console.log(res);
              anexarComentario(res);
          },
          error:(error)=>{
              console.log("eeeerrrrrtttttooo...");
              console.error(error);
          }
      });
  }
}

function anexarComentario(res){
  document.getElementById('comentariosp').innerHTML +=`
      <p class="card-text"><strong>${res.autor} </strong>${res.comentario}</p>
  `;
  console.log("anexando");
}

comentarios();
function comentarios(){
    $.ajax({
        url:"/comentarios",
        dataType:"json",
		method:"GET",
		success:function(res){
            console.log(res.length);
            for (let i = 0; i < res.length; i++) {
                anexarComentario(res[i],i);
            }
            
			
		},
		error:function(error){
			console.log(error);
		}
	});
}