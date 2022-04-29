
    function llamadaApi()
    {

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
        let frase=data[numero]["text"];
        let autor=data[numero]["author"];
        console.log(frase,autor);
        document.getElementById("frase").innerHTML = frase;
        document.getElementById("autor").innerHTML = autor;

   	}

