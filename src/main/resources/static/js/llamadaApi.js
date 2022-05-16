
    function llamadaApi(usertype)
    {
        if (usertype == "user"){
            var userId = sessionStorage.getItem('userId');
            sessionStorage.setItem("userId",userId);
            console.log(userId);
        }else{
            var psicId = sessionStorage.getItem('psicId');
            sessionStorage.setItem("psicId",psicId);
        }

        fetch('https://type.fit/api/quotes')
            .then(function (response) {
            return response.json();
        })
        .then(function (data) {
           api(data);

        })
        .catch(function (err) {
            console.log('error: ' + err);
        });

    }

    function api(data)
    {

        let numero= Math.floor(Math.random()* (1642 - 0) + 0); //elegimos una frase aleatoria de entre toda la lista
        let frase_sin_comillas=data[numero]["text"];
        let frase = '\u0022' + frase_sin_comillas + '\u0022';
        let autor_sin_guion=data[numero]["author"];
        autor="-" + autor_sin_guion;
        console.log(frase,autor);
        document.getElementById("frase").innerHTML = frase;
        document.getElementById("autor").innerHTML = autor;

   	}

   	function cerrarSesion(usertype)
   	{
   	    if (usertype == "user"){
   	        sessionStorage.setItem("userId",null);
            alert("Cierre de sesión correcto");
            location.replace("index.html");
   	    }else{
   	        sessionStorage.setItem("psicId",null);
            alert("Cierre de sesión correcto");
            location.replace("index.html");
   	    }


   	}

