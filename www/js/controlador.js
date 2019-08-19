var campos = [
    { id: 'nombre', valido: false },
    { id: 'apellido', valido: false },
    { id: 'email', valido: false },
    { id: 'usuario', valido: false },
    { id: 'password', valido: false },
    { id: 'tipoUsuario', valido: false },
];


/*arreglo de json para almacenar usuarios */
var usuarios = [];
var i = 2;

uno = {
    nombre: 'Samuel',
    apellido: 'Sosa',
    email: 'samuels@gmail.com',
    usuario: 'sosa96',
    password: 'sosa96',
    tipoUsuario: 'aministrador'
};
dos = {
    nombre: 'Samy',
    apellido: 'Sosa',
    email: 'samuelsosa@gmail.com',
    usuario: 'samy',
    password: 'asd.456',
    tipoUsuario: 'Registrado',
};

/*llamaar funcion pra verificar el usuario que inicio secion*/
if (document.getElementById('sesion'))
    sesionUsuario(uno);


usuarios[0] = uno;
usuarios[1] = dos;
if (document.getElementById('respuesta')) {
    document.getElementById('respuesta').innerHTML = ``;
    llenarUsuarios();
}



function validarRegistro() {
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
        usuario: document.getElementById('usuario').value,
        password: document.getElementById('password').value,
        tipoUsuario: document.getElementById('tipoUsuario').value,
    }
    console.log(persona);
    console.log(i);
    usuarios[i] = persona;
    anexarUsuario(i);
    i++;
    if (i == 4) {
        imprimirUsuarios();
    }
    document.getElementById('exito').style.display = 'block';
    return persona;

}

function validarCampoVacio(id) {
    let resultado = (document.getElementById(id).value == "") ? false : true;
    marcarInput(id, resultado);
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

function imprimirUsuarios() {
    for (let i = 0; i < usuarios.length; i++) {
        console.log(usuarios[i]);
    }
}

function llenarUsuarios() {

    for (let i = 0; i < usuarios.length; i++) {
        anexarUsuario(i);
    }
}
/*llenar las targenats de usuarios */
function anexarUsuario(i) {
    document.getElementById('respuesta').innerHTML += `
    <div class="card mb-3 col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <img src="img/3.png" class="card-img-top" alt="...">
        <div class="card-body">
            <p class="card-text">${usuarios[i].nombre} ${usuarios[i].apellido}</p>
            <p class="card-text">${usuarios[i].email}</p>
            <p class="card-text">${usuarios[i].tipoUsuario}</p>
            <p>
                <a data-toggle="collapse" href="#opciones${i}" role="button" aria-expanded="false" aria-controls="opciones${i}">opciones</a>
            </p>
            <div class="collapse multi-collapse" id="opciones${i}">
                <div class="card-text">
                    <button type="button" class="btn btn-danger"><i class="far fa-trash-alt iconot"></i></button>
                    <button type="button" class="btn btn-warning"><i class="far fa-edit iconot"></i></button>
                </div>
            </div>
        </div>
    </div>`;
}

/*arreglo de json para las categorias */
var categoriasTabla = [];
var k = 2;
cate = {
    nombre: 'las mejores',
    descripcion: 'esta categoria esta dedicada a los mejores ',
}
cate1 = {
    nombre: 'para clientes',
    descripcion: 'esta categoria esta dedicada a los clientes ',
}

categoriasTabla[0] = cate;
categoriasTabla[1] = cate1;

/*funcion para validar las caregorias */
function validarCategoria() {
    if (document.getElementById('categorias').value) {
        document.getElementById('mex').style.display = 'block';
        document.getElementById('mese').style.display = 'none';
        var categ = {
            nombre: document.getElementById('categorias').value,
            descripcion: document.getElementById('descripcion').value,
        }
        categoriasTabla[k] = categ;
        anexarCategoria(k);
        k++;
    } else {
        document.getElementById('mese').style.display = 'block';
        document.getElementById('mex').style.display = 'none';
    }
}
/*llamar funcion para llenar select de categorias para crear nueva entrada */
if (document.getElementById('categoriaSelect')) {
    llenarSelectCategorias();
}


function registrarCategoria() {
    validarCategoria();
}


/*funcion para validar el acceso en el login */
function acceso() {
    for (let i = 0; i < usuarios.length; i++) {
        if ((usuarios[i].usuario == document.getElementById('inputEmail').value) && (usuarios[i].password == document.getElementById('inputPassword').value)) {
            location.href = "inicio.html";
        } else {
            document.getElementById('error').style.display = 'block';
        }
    }
}

/* llnar las categorias en la pagina de agregar categoria */
if (document.getElementById('categoriasr')) {
    llenarCategorias();
}

/* llnar las categorias en la pagina de agregar categoria */
function llenarCategorias() {
    document.getElementById('categoriasr').innerHTML = '';
    for (let i = 0; i < categoriasTabla.length; i++) {
        anexarCategoria(i);
    }
}

function anexarCategoria(k) {
    document.getElementById('categoriasr').innerHTML += `<tr>
        <th scope="row">${categoriasTabla[k].nombre}</th>
        <td>${categoriasTabla[k].descripcion}</td>
        <td><button type="button" class="btn btn-danger" onclick="eliminarCategoria(${k})"><i class="far fa-trash-alt"></i></button>
            <button type="button" class="btn btn-warning" onclick="editarCategoria(${k})"><i class="far fa-edit"></i></button></td>
            </tr>`;
}


var archivos = [];
var conta = 0;
/*para subir imagenes*/
function fileValidation() {
    // document.getElementById('imagePreview').innerHTML = '';
    var fileInput = document.getElementById('customFile');
    var filePath = fileInput.value;
    var allowedExtensions = /(.mp4|.pdf|.jpg|.jpeg|.png|.gif)$/i;
    console.log(filePath);
    console.log(allowedExtensions);
    if (!allowedExtensions.exec(filePath)) {
        alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
        fileInput.value = '';
        return false;
    } else {
        //Image preview
        if (fileInput.files && fileInput.files[0]) {
            console.log(fileInput.files);
            console.log(fileInput.files[0]);
            console.log(fileInput.files[0].type);
            var reader = new FileReader();
            if (fileInput.files[0].type == "application/pdf") {
                reader.onload = function(e) {

                    document.getElementById('imagePreview').innerHTML += `<tr>
                    <td><i class="fas fa-file-pdf"></i></td>
                    <td>${fileInput.files[0].name}</td>
                </tr>`;
                };
            } else {
                reader.onload = function(e) {
                    document.getElementById('imagePreview').innerHTML = `<tr>
                    <td><img src="${e.target.result}" style="width: 50px; height: 40px;"/></td>
                    <td>` + fileInput.files[0].name + `</td>
                </tr>`;
                    // llenarArchivos(fileInput.files[0].name, e.target.result);
                };
            }
            archivos[conta] = fileInput.files[0];
            console.log(archivos[conta]);
            conta++;
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
}
/*funcion llenar select categorias en nueva entrada */
function llenarSelectCategorias() {
    //document.getElementById('categoriaSelect').innerHTML = ``;
    for (let i = 0; i < categoriasTabla.length; i++) {
        document.getElementById('categoriaSelect').innerHTML += `<option>${categoriasTabla[i].nombre}</option>`;
    }

}

function eliminarCategoria(key) {
    console.log(key);
    document.getElementById('categorias').value = categoriasTabla[key].nombre;
}

function llenarArchivos(name, ruta) {
    console.log(ruta);
    document.getElementById('imagePreview').innerHTML = `<tr>
                    <td><img src="${ruta}" style="width: 50px; height: 40px;"/></td>
                    <td>` + name + `</td>
                </tr>`;
    for (let index = 0; index < archivos.length; index++) {
        console.log("este es" + index);
        console.log(archivos[index]);
    }
}
/* imprimir el nombre de usuario que inicio secion*/
function sesionUsuario(x) {
    document.getElementById('sesion').innerHTML = `<h6>Hola ${x.usuario}</h6> <a><i class="far fa-user" style="font-size: 1.2rem; background-color: #1df7d1;"></i></a>`;
}

/*validacion de las entradas */
entradas = [
    { id: 'tituloEntrada', valido: false },
    { id: 'categoriaSelect', valido: false },
];

function registrarEntrada() {
    console.log("holaaa");
    for (let i = 0; i < entradas.length; i++)
        entradas[i].valido = validarCampoVacio(entradas[i].id);

    console.log(entradas);
    for (let i = 0; i < entradas.length; i++) {
        if (!entradas[i].valido) {
            document.getElementById('entradaError').style.display = 'block';
            return;
        }
    }
    document.getElementById('entradaExito').style.display = 'block';
}