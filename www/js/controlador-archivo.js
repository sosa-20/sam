var tipo;
var autor;

if (document.getElementById('bancoArchivo')) {
    archivos();
}
function archivos(){
    var idar='bancoArchivo';
    $.ajax({
        url:"/archivos",
        dataType:"json",
		method:"GET",
		success:function(res){
            console.log(res.length);
            for (let i = 0; i < res.length; i++) {
                anexarArchivo(res[i],idar);
            }
            
			
		},
		error:function(error){
			console.log(error);
		}
	});
}



function subir(){
    var f = new Date();
    var ide='imagePreview';
	fecha= f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
    console.log(fecha);
    console.log("holaa subi");
    console.log(document.getElementById('arc').files[0].name);


    var fileInput = document.getElementById('arc');
    var filePath = fileInput.value;
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    if(!allowedExtensions.exec(filePath)){
        tipo='generico';
    }else{
        tipo='imagen';
    }
    
    console.log(autor+" est es el autor");
    let nombre= document.getElementById('arc').files[0].name;
    let url='uploads/' + nombre;
    let archivo={
        url:url,
        nombreArchivo:nombre,
        fechaSubida: fecha,
        tipo:tipo,
        autor:autor
    }
    let parametros = `url=${archivo.url}&nombreArchivo=${archivo.nombreArchivo}&fechaSubida=${archivo.fechaSubida}&tipo=${tipo}&autor=${archivo.autor}`;
    console.log('Información a enviar: ' + parametros);
    $.ajax({
        url:'archivos/',
        method:'POST',
        data:parametros,
        dataType:'json',
        success:(res)=>{
            console.log("inssrtooo...");
            console.log(res);
            anexarArchivo(res,ide);
        },
        error:(error)=>{
            console.log("eeeerrrrrtttttooo...");
            console.error(error);
        }
    });
}
function anexarArchivo(res, id){
    if (res.tipo=='generico') {
        document.getElementById(id).innerHTML += `<tr id="${res._id}">
        <td><img src="img/genericos.png" style="width: 40px; height: 60px;"/></td>
        <td>${res.autor}</td>
        <td>${res.nombreArchivo}</td>
        <td>${res.fechaSubida}</td>
        <td><button type="button" class="btn btn-danger" onclick="eliminar('${res._id}')"><i class="far fa-trash-alt iconot"></i></button></td>
        </tr>`;
    } else {
        document.getElementById(id).innerHTML += `<tr id="${res._id}">
        <td><img src="${res.url}" style="width: 50px; height: 40px;"/></td>
        <td>${res.autor}</td>
        <td>${res.nombreArchivo}</td>
        <td>${res.fechaSubida}</td>
		<td><button type="button" class="btn btn-danger" onclick="eliminar('${res._id}')"><i class="far fa-trash-alt iconot"></i></button></td>
        </tr>`; 
    }
}

function eliminar(id){
	console.log(id);
    $.ajax({
        url:`archivos/${id}`,
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
nombreUsuario();
function nombreUsuario(){
    $.ajax({
        url:`usuarios/secion`,
        method:'POST',
        success:(res)=>{
            console.log("inssrtooo...");
            document.getElementById('sesion').innerHTML=`${res}`;
            console.log(res);
            autor=res;
        },
        error:(error)=>{
            console.log("eeeerrrrrtttttooo...");
            console.error(error);
        }
    });
  }