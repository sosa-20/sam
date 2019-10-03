

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
      <p class="card-text">${res.comentarios[0]}</p>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <hr>
      <div class="px-0">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Comment" id="comentario-post-1">
              <div class="input-group-append">
                  <button type="button" onclick="comentar(${res._id});" class="btn btn-danger">publicar</button>
              </div>
            </div>
          </div>
    </div>
  </div>`;
}