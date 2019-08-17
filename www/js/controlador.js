var campos = [
    { id: 'nombre', valido: false },
    { id: 'apellido', valido: false },
    { id: 'email', valido: false },
    { id: 'usuario', valido: false },
    { id: 'password', valido: false },
    { id: 'tipoUsuario', valido: false },
];
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
        document.getElementById('respuesta').innerHTML += `
                    <div class="card mb-3 col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                        <img src="img/carrusel/3.png" class="card-img-top" alt="...">
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
}



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


function registrarCategoria() {
    validarCategoria();
}

function acceso() {
    for (let i = 0; i < usuarios.length; i++) {
        if ((usuarios[i].usuario == document.getElementById('inputEmail').value) && (usuarios[i].password == document.getElementById('inputPassword').value)) {
            location.href = "inicio.html";
        } else {
            document.getElementById('error').style.display = 'block';
        }
    }
}
if (document.getElementById('categoriasr')) {
    llenarCategorias();
}

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
        <td><button type="button" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
            <button type="button" class="btn btn-warning"><i class="far fa-edit"></i></button></td>
            </tr>`;
}


document.getElementById('image1').onchange = function() {
    console.log(this.value);
    document.getElementById('fichero').innerHTML = document.getElementById('image1').files[0].name;
}