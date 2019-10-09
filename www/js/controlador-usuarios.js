var idedit;

usuarios();
function usuarios(){
    $.ajax({
        url:"/usuarios",
        dataType:"json",
		method:"GET",
		success:function(res){
            console.log(res.length);
            for (let i = 0; i < res.length; i++) {
                anexarUsuario(res[i],i);
            }
            
			
		},
		error:function(error){
			console.log(error);
		}
	});
}


function anexarUsuario(req,i) {
    document.getElementById('respuesta').innerHTML += `
    <div class="card mb-3 col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <img src="${req.imagenPerfil}" class="card-img-top" alt="...">
        <div class="card-body">
            <p class="card-text">${req.nombre} ${req.apellido}</p>
            <p class="card-text">${req.email}</p>
            <p class="card-text">${req.tipoUsuario}</p>
            <p>
                <a data-toggle="collapse" href="#opciones${i}" role="button" aria-expanded="false" aria-controls="opciones${i}">opciones</a>
            </p>
            <div class="collapse multi-collapse" id="opciones${i}">
                <div class="card-text">
                    <button type="button" class="btn btn-danger" onclick="eliminar('${req._id}')"><i class="far fa-trash-alt iconot"></i></button>
                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal" onclick="editar('${req._id}')"><i class="far fa-edit iconot"></i></button>
                </div>
            </div>
        </div>
    </div>`;
}



var campos = [
    { id: 'nombre', valido: false },
    { id: 'apellido', valido: false },
    { id: 'email', valido: false },
    { id: 'nombreUsuario', valido: false },
    { id: 'password', valido: false },
    { id: 'tipoUsuario', valido: false },
];


function registrarUsuario(){
    document.getElementById('btn-actualizar').style.display = 'none';
        document.getElementById('btn-limpiar').style.display = 'none';
        document.getElementById('btn-registro').style.display = 'block';
    console.log(document.getElementById('tipoUsuario').value + "holaaaa numero");
    let persona = validarCampos();
    if (persona==null || persona == undefined)
        return;
    

    //Guardar en el servidor
    let parametros = `nombre=${persona.nombre}&password=${persona.password}&email=${persona.email}&apellido=${persona.apellido}&nombreUsuario=${persona.nombreUsuario}&tipoUsuario=${persona.tipoUsuario}&imagenPerfil=${persona.imagenPerfil}`;
    console.log('Información a enviar: ' + parametros);
    $.ajax({
        url:'usuarios/',
        method:'POST',
        data:parametros,
        dataType:'json',
        success:(res)=>{
            console.log("inssrtooo...");
            console.log(res);
            document.getElementById('respuesta').innerHTML=``;
            usuarios();
        },
        error:(error)=>{
            console.log("eeeerrrrrtttttooo...");
            console.error(error);
        }
    });
}
function validarCampos() {
    
    for (let i = 0; i < campos.length; i++)
        campos[i].valido = validarCampoVacio(campos[i].id);

    console.log(campos);
    for (let i = 0; i < campos.length; i++)
        if (!campos[i].valido)
            return;

    let persona = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        nombreUsuario: document.getElementById('nombreUsuario').value,
        password: document.getElementById('password').value,
        tipoUsuario: document.getElementById('tipoUsuario').value,
        imagenPerfil: "img/3.png"
    }
    
    document.getElementById('exito').style.display = 'block';
    return persona;

}

function validarCampoVacio(idc) {
    console.log("validandoccccc...");
    let resultado
    if (document.getElementById(idc).value == "") {
        resultado=false;
    } else {
        resultado=true;
    }
    //let resultado = (document.getElementById(idc).value == "")?false:true;
    marcarInput(idc, resultado);
    return resultado;

}

function validarCorreo(correo) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let resultado = re.test(correo.value);
    marcarInput(correo.id, resultado);
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

function eliminar(id){
    console.log(id);
    $.ajax({
        url:`usuarios/${id}`,
        method:'delete',
        dataType:'json',
        success:(res)=>{
            console.log(res);
            document.getElementById('respuesta').innerHTML=``;
            usuarios();
            if (res.ok == 1)
                $(`#${id}`).remove();
        },
        error:(error)=>{
            console.error(error);
        }
    });
}
function editar(id){
    console.log(id);
   $.ajax({
    url:`usuarios/${id}`,
    method:'GET',
    dataType:'json',
    success:(persona)=>{
        console.log(persona);
        document.getElementById('nombre').value = persona.nombre;
        document.getElementById('apellido').value = persona.apellido;
        document.getElementById('email').value = persona.email;
        document.getElementById('password').value = persona.password;
        document.getElementById('nombreUsuario').value = persona.nombreUsuario;
        document.getElementById('tipoUsuario').value = persona.tipoUsuario;
        document.getElementById('btn-actualizar').style.display = 'block';
        document.getElementById('btn-limpiar').style.display = 'block';
        document.getElementById('btn-registro').style.display = 'none';
    },
    error:(error)=>{
        console.error(error);
    }
});
 idedit=id;
}

function actualizar(){
    console.log(idedit);
    let persona = validarCampos();
    if (persona==null || persona == undefined)
        return;
    

    //Guardar en el servidor
    let parametros = `nombre=${persona.nombre}&password=${persona.password}&email=${persona.email}&apellido=${persona.apellido}&nombreUsuario=${persona.nombreUsuario}&tipoUsuario=${persona.tipoUsuario}&imagenPerfil=${persona.imagenPerfil}`;
    console.log('Información a enviar: ' + parametros);
    $.ajax({
        url:`usuarios/${idedit}`,
        method:'PUT',
        data:parametros,
        dataType:'json',
        success:(res)=>{
            console.log(res);
            /*if (res._id != undefined)
                anexarFilaTabla(res);*/
                document.getElementById('respuesta').innerHTML=``;
                usuarios();
        },
        error:(error)=>{
            console.error(error);
        }
    });
}

function limpiar(){
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('nombreUsuario').value = '';
    document.getElementById('tipoUsuario').value = '';
    document.getElementById('btn-actualizar').style.display = 'none';
        document.getElementById('btn-limpiar').style.display = 'none';
        document.getElementById('btn-registro').style.display = 'block';
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