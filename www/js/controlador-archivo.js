var tipo;
function subir(){
    console.log("holaa subi");
    console.log(document.getElementById('arc').files[0].name);


    var fileInput = document.getElementById('arc');
    var filePath = fileInput.value;
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    if(!allowedExtensions.exec(filePath)){
        tipo=false;
    }else{
        tipo=true;
    }


    let nombre= document.getElementById('arc').files[0].name;
    let url='uploads/' + nombre;
    let parametros = `url=${url}`;
    console.log('Información a enviar: ' + parametros);
    $.ajax({
        url:'archivos/',
        method:'POST',
        data:parametros,
        dataType:'json',
        success:(res)=>{
            console.log("inssrtooo...");
            console.log(res);
            anexarArchivo(url,nombre,res);
        },
        error:(error)=>{
            console.log("eeeerrrrrtttttooo...");
            console.error(error);
        }
    });
}
function anexarArchivo(url,nombre,res){
    if (tipo==false) {
        document.getElementById('imagePreview').innerHTML += `<tr>
        <td><i class="fas fa-file-pdf"></i></td>
        <td>${nombre}</td>
        <td><button type="button" class="btn btn-danger" onclick="eliminar('${res._id}')"><i class="far fa-trash-alt iconot"></i></button></td>
        </tr>`;
    } else {
        document.getElementById('imagePreview').innerHTML += `<tr>
        <td><img src="${url}" style="width: 50px; height: 40px;"/></td>
		<td>${nombre}</td>
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
			document.getElementById('imagePreview').innerHTML='';
            if (res.ok == 1)
                $(`#${id}`).remove();
        },
        error:(error)=>{
            console.error(error);
        }
    });
}