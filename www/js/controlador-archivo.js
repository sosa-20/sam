

function subirArchivo(){
    $.ajax({
        url:"/subir",
        dataType:"json",
		method:"POST",
		success:function(res){
            console.log(res); 
			
		},
		error:function(error){
            console.log("erorrrrrrrrrrr");
			console.log(error);
		}
	});
}