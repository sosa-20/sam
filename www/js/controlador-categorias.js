var categ;
var idcat;

categorias();
document.getElementById('categoriasr').innerHTML=``;
function categorias(){
    $.ajax({
        url:"/categorias",
        dataType:"json",
		method:"GET",
		success:function(res){
            console.log(res.length);
            for (let i = 0; i < res.length; i++) {
                anexarCategoria(res[i],i);
            }
            
			
		},
		error:function(error){
			console.log(error);
		}
	});
}



function validarCategoria() {
    if (document.getElementById('categorias').value) {
        document.getElementById('mex').style.display = 'block';
        document.getElementById('mese').style.display = 'none';
         categ = {
            nombre: document.getElementById('categorias').value,
            descripcion: document.getElementById('descripcion').value,
        }
    return true; 
    } else {
        document.getElementById('mese').style.display = 'block';
        document.getElementById('mex').style.display = 'none';
    }
}

function anexarCategoria(res) {
    document.getElementById('categoriasr').innerHTML += `<tr>
        <th scope="row">${res.nombreCategoria}</th>
        <td>${res.descripcion}</td>
        <td><button type="button" class="btn btn-danger" onclick="eliminarCategoria('${res._id}');"><i class="far fa-trash-alt"></i></button>
            <button type="button" class="btn btn-warning" onclick="editarCategoria('${res._id}');"><i class="far fa-edit"></i></button></td>
            </tr>`;
}

function registrarCategoria() {
    if (validarCategoria()) {
        let parametros = `nombreCategoria=${categ.nombre}&descripcion=${categ.descripcion}`;
    console.log('Información a enviar: ' + parametros);
    $.ajax({
        url:'categorias/',
        method:'POST',
        data:parametros,
        dataType:'json',
        success:(res)=>{
            console.log("inssrtooo...");
            console.log(res);
            anexarCategoria(res);
        },
        error:(error)=>{
            console.log("eeeerrrrrtttttooo...");
            console.error(error);
        }
    });
    }
    
}
function eliminarCategoria(id){
    console.log(id); 
    $.ajax({
        url:`categorias/${id}`,
        method:'delete',
        dataType:'json',
        success:(res)=>{
            console.log(res);
            document.getElementById('categoriasr').innerHTML=``;
            categorias();
            if (res.ok == 1)
                $(`#${id}`).remove();
        },
        error:(error)=>{
            console.error(error);
        }
    }); 
}
function editarCategoria(id){
   console.log(id);
   $.ajax({
    url:`categorias/${id}`,
    method:'GET',
    dataType:'json',
    success:(categoria)=>{
        console.log(categoria);
        document.getElementById('categorias').value = categoria.nombreCategoria;
        document.getElementById('descripcion').value = categoria.descripcion;
        document.getElementById('btn-actualizar').style.display = 'block';
        document.getElementById('btn-limpiar').style.display = 'block';
        document.getElementById('btn-cat').style.display = 'none';
    },
    error:(error)=>{
        console.error(error);
    }
});
idcat=id;
}

function actualizar(){
  if(validarCategoria()){
    let parametros = `nombreCategoria=${categ.nombre}&descripcion=${categ.descripcion}`;
    console.log('Información a enviar: ' + parametros);
    $.ajax({
        url:`categorias/${idcat}`,
        method:'PUT',
        data:parametros,
        dataType:'json',
        success:(res)=>{
            console.log(res);
            /*if (res._id != undefined)
                anexarFilaTabla(res);*/
                document.getElementById('categoriasr').innerHTML=``;
                categorias();
        },
        error:(error)=>{
            console.error(error);
        }
    });
  }
}
function limpiar(){
    document.getElementById('categorias').value = ``;
        document.getElementById('descripcion').value = ``;
        document.getElementById('btn-actualizar').style.display = 'none';
        document.getElementById('btn-limpiar').style.display = 'none';
        document.getElementById('btn-cat').style.display = 'block';
}
nombreUsuario();
function nombreUsuario(){
    $.ajax({
        url:`usuarios/secion`,
        method:'POST',
        success:(res)=>{
            console.log("inssrtooo...");
            document.getElementById('sesion').innerHTML=`${res}`;
            console.log(res);
        },
        error:(error)=>{
            console.log("eeeerrrrrtttttooo...");
            console.error(error);
        }
    });
  }