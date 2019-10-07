var campos = [
    { id: 'nombre', valido: false },
    { id: 'apellido', valido: false },
    { id: 'email', valido: false },
    { id: 'nombreUsuario', valido: false },
    { id: 'password', valido: false },
];


function registrarUsuario(){
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
            /*if (res._id != undefined)
                anexarFilaTabla(res);*/
        },
        error:(error)=>{
            console.log("eeeerrrrrtttttooo...");
            console.error(error);
        }
    });
}
function validarCampos() {
    console.log("validando...");
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
        tipoUsuario: '1',
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