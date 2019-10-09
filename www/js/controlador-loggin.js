/*funcion para validar el acceso en el login */
$("#btn-registro").click(function(){
    document.getElementById('error').style.display = 'none';
    console.log($("#datoslog").serialize());
    $.ajax({
        url:"usuarios/login",
        method:"POST",
        data:$("#datoslog").serialize(),
        dataType:"json",
        success:function(res){
            console.log(res);
            if (res.status == 1)
                window.location.href = "/inicio.html";
            else 
            document.getElementById('error').style.display = 'block';  
        },
        error:function(error){
            console.error(error);
        }
    });
});
/*function acceso() {
    document.getElementById('error').style.display = 'none';
    $.ajax({
        url:"/usuarios",
        dataType:"json",
		method:"GET",
		success:function(res){
            console.log(res.length);
            for (let i = 0; i < res.length; i++) {
                if((res[i].nombreUsuario == document.getElementById('inputEmail').value || res[i].email== document.getElementById('inputEmail').value) && (res[i].password == document.getElementById('inputPassword').value)){
                    document.getElementById('error').style.display = 'none';
                    crearSecion(res[i].nombreUsuario);
                    location.href = "inicio.html";
                    console.log(res.length);
                    i=res.length-1;
                }
                else{
                    document.getElementById('error').style.display = 'block';  
                }
            }
            
			
		},
		error:function(error){
			console.log(error);
		}
	});
    /*for (let i = 0; i < usuarios.length; i++) {
        if ((usuarios[i].usuario == document.getElementById('inputEmail').value) && (usuarios[i].password == document.getElementById('inputPassword').value)) {
            location.href = "inicio.html";
        } else {
            document.getElementById('error').style.display = 'block';
        }
    }
}

function crearSecion(usuario){
    let parametros = `usuario=${usuario}`;
    console.log(parametros);
    $.ajax({
        url:`login?usuario=${usuario}`,
        method:'GET',
        success:(res)=>{
            console.log("inssrtooo...");
            console.log(res);
        },
        error:(error)=>{
            console.log("eeeerrrrrtttttooo...");
            console.error(error);
        }
    });
}*/