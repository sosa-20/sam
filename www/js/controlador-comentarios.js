nombreUsuario();
comentarios();
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

function comentarios(){
    $.ajax({
        url:"/comentarios",
        dataType:"json",
        method:"GET",
        success:function(res){
            console.log(res.length);
            for (let i = res.length; i >0 ; i--) {
                datosEntradas(res[i-1]);
                //anexarComentario(res[i-1]);
            }
        },
        error:function(error){
            console.log(error);
        }
    });
}
function anexarComentario(res, entrada){
    document.getElementById('comentarios').innerHTML +=`
        <div class="comentarios col-12 col-sm-6 col-lg-4 col-xl-4" id="${res._id}">
            <div class="card mb-3">
                <div class="card-text">
                    <div class="btn-group">
                        <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-danger float-left"><i class="fas fa-ellipsis-v"></i></button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Aprobar</a>
                            <a class="dropdown-item" href="#">Reportar</a>
                            <a class="dropdown-item" onclick="eliminar('${res._id}')" href="#">Eliminar</a>
                        </div>
                    </div>
                </div>
                <div class="row no-gutters">
                    <div class="col-md-1">
                        <a><i class="far fa-user" style="font-size: 2rem; padding-top: 20px;"></i></a>
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h6 class="card-title">${res.autor}</h6>
                            <p class="card-text"><strong>samuelsosaaleman@gmail.com</strong></p>
                            <p class="card-text">${res.comentario}</p>
                            <p class="card-text"><strong>Publicacion:</strong>${entrada.titulo}</p>
                            <p class="card-text"><small class="text-muted">${res.fecha} a las ${res.hora}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}



function datosEntradas(res){
    let id=res.idEntrada;
    console.log(id);
    $.ajax({
        url:`entradas/${id}`,
        method:'GET',
        dataType:'json',
        success:(entrada)=>{
            console.log(entrada);
            anexarComentario(res, entrada);
        },
        error:(error)=>{
            console.error("errror"+error);
        }
    });
}
function eliminar(id){
    console.log("eliminando... "+id);
    $.ajax({
        url:`comentarios/${id}`,
        method:'delete',
        dataType:'json',
        success:(res)=>{
            console.log(res);
            if (res.ok == 1)
                $(`#${id}`).remove();
        },
        error:(error)=>{
            console.error(error);
        }
    });
}