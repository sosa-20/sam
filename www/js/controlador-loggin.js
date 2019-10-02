/*funcion para validar el acceso en el login */
function acceso() {
    $.ajax({
        url:"/usuarios",
        dataType:"json",
		method:"GET",
		success:function(res){
            console.log(res.length);
            for (let i = 0; i < res.length; i++) {
                if((res[i].nombreUsuario == document.getElementById('inputEmail').value || res[i].email== document.getElementById('inputEmail').value) && (res[i].password == document.getElementById('inputPassword').value)){
                    document.getElementById('error').style.display = 'none';
                    location.href = "inicio.html";
                    console.log(res.length);
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
    }*/
}