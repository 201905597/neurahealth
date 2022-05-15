//
function configurar(){

    // Se configura la variable del ID de usuario
    var userId = sessionStorage.getItem('userId');
    sessionStorage.setItem("userId",userId);
}

//GET REQUEST - ESTADOS DE ÁNIMO GUARDADOS
async function getAnimos(mmyyyyp,portada,diasmes){
    event.preventDefault();

    const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    const numdias = [31,28,31,30,31,30,31,31,30,31,30,31];

    var userId = sessionStorage.getItem('userId');
    //sessionStorage.setItem("userId",userId);

    let mmyyyy = mmyyyyp.options[mmyyyyp.selectedIndex].text;
    let api = "/api/v1/emotiondates/" + userId.toString() + "/" + mmyyyy.toString();

    let res = await fetch(api,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }});

    if (res.status == 200){
        //Se obtienen los datos del GET REQUEST
        const data = await res.json();
        console.log(data);

        //Se guardan las emociones si las hay
        var hashmap = new Map(); //fecha (dia) -> emotionName
        for (let j = 0; j < data.length; j++){
            let savedEmotion = data[j];
            let emotionName = savedEmotion["emotionName"];
            let fecha = savedEmotion["fecha"]; //yyyy-mm-dd
            fecha = fecha.toString();
            let dia = parseInt(fecha.substring(8,10));
            hashmap.set(dia,emotionName);
        }

        //Se pinta el calendario de el mes elegido por el usuario (mmyyyy)
        let mes = parseInt(mmyyyy.substring(0,2));
        let month = meses[mes-1];
        let diastotales = numdias[mes-1];
        let year = mmyyyy.substring(3,7);
        if ((year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0))){
            //Si el año es bisiesto Febrero tiene 29 días
            numdias[1] = 29;
        }

        //Se pinta la portada del mes
        portada.innerHTML = month + '<br><span style="font-size:18px">' + year + '</span>';

        //Se pintan los días del mes
        let diasmescontent = "";
        for (let i = 0; i < diastotales; i++){
            let numero = i+1;
            let emotion = hashmap.get(numero);
            if (emotion != null){
                diasmescontent = diasmescontent + '<li id="' + numero + '"><span class="' + emotion + '">' + numero + '</span></li>';
            }else{
                diasmescontent = diasmescontent + '<li>' + numero +'</li>';
            }
        }
        diasmes.innerHTML = diasmescontent;

    }else{
        alert("¡Vaya! No se ha podido resolver tu petición");
    }
    //pinto el calendario de ese mes y ese año
}

// GET REQUEST - se puede añadir ánimo o no
async function checkAnimo(animos){

    event.preventDefault();

    var userId = sessionStorage.getItem('userId');

    //Se obtiene la fecha de hoy para saber a qué día se puede añadir un ánimo
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    // Se comprueba si se ha añadido una emoción hoy (true) o no (false)
    let api = "/api/v1/emotiondates/" + userId.toString() + "/" + today;
    let res = await fetch(api,{
        method: 'GET',
        });

    //Se muestran las emociones posibles o un aviso si ya se ha añadido hoy
    if(res.status == 200){
        const data = await res.text(); //true si ya está relleno, false si no
        let data2 = data.toString();
        console.log(data2);
        let emotion2day = false;
        if (data2 == "true"){
            emotion2day = true;
        }
        console.log(emotion2day);

        if (emotion2day){
            animos.innerHTML = '<p style="color:red;">Ya has añadido un estado de ánimo hoy</p>';
            animos.style.display = "block";
        }else{
            console.log("hola3");
            let feliz = "feliz";
            animos.innerHTML = '<p>Selecciona tu estado de ánimo de hoy</p><br>'
                                + '<div class="row">'
                                    + '<div class="col">'
                                        + '<button class="bfeliz" onclick="addAnimo(this)">Feliz</button>'
                                    + '</div>'
                                    + '<div class="col">'
                                         + '<button class="bcansado" onclick="addAnimo(this)">Cansad@</button>'
                                    + '</div>'
                                    + '<div class="col">'
                                         + '<button class="btriste" onclick="addAnimo(this)">Triste</button>'
                                    + '</div>'
                                + '</div>'
                                + '<div class="row">'
                                    + '<div class="col">'
                                        + '<button class="bproductivo" onclick="addAnimo(this)">Productiv@</button>'
                                    + '</div>'
                                    + '<div class="col">'
                                         + '<button class="bestresado" onclick="addAnimo(this)">Estresad@</button>'
                                    + '</div>'
                                    + '<div class="col">'
                                         + '<button class="benfadado" onclick="addAnimo(this)">Enfadado</button>'
                                    + '</div>'
                                + '</div>';
            animos.style.display = "block";
        }
    }else{
        alert("¡Vaya! No se ha podido resolver tu petición");
    }
}

// POST REQUEST - añadir ánimo
async function addAnimo(animobtn){
    event.preventDefault();

    divAnimos = document.getElementById('animos');

    let animo = animobtn.textContent;
    animo = animo.toString();
    animo = animo.toLowerCase();
    let ult = animo.slice(-1); // último char del string animo
    if (ult == '@'){
        let aux = animo.substring(0,animo.length-1);
        animo = aux + 'o';
    }

    var userId = sessionStorage.getItem('userId'); //string
    userId = parseInt(userId);

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    //today = Date.parse(today);

    const dataObj = {
        "emotionName" : animo,
        "fecha" : today,
        "userId" : userId
    };

   // Inserción del nuevo ánimo
   let res = await fetch("/api/v1/emotiondates",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObj)
   });

   if (res.status == 201){
        animos.innerHTML = '<p style="color:#39993C;">Se ha registrado tu estado de ánimo de hoy</p>';
        alert("Todo ha ido bien :)");
   }else{
        alert("¡Vaya! Parece que algo ha ido mal :(");
   }
}
