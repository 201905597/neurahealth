let divObjetivo;
let divs = ["cambiarUN","cambiarPASS","cambiarPSICO","MostrarEnviar"];

let cambiado="nada";

let datosPsic;

function showInfo()
{

    if(document.getElementById("seleccion").value=="Nombre de usuario")
    {
        divObjetivo = document.getElementById("cambiarUN");
        cambiado="cambiado_NU";
    }
    else if(document.getElementById("seleccion").value=="Contraseña")
    {
        divObjetivo = document.getElementById("cambiarPASS");
        cambiado="cambiado_PSW";
    }
    else if(document.getElementById("seleccion").value=="Psicologo")
    {
        divObjetivo = document.getElementById("cambiarPSICO");
        cambiado="cambiado_PSI";
    }

    console.log("DIV OBJETIVO:");
    console.log(divObjetivo.id);

    if (divObjetivo.style.display === "none"){
        for (let i=0;i<divs.length-1;i++){
            divAEsconder = document.getElementById(divs[i]);
            divAEsconder.style.display = "none"; //Se esconde
        }
        divObjetivo.style.display = "block"; //Se muestra
        console.log("print del array de divs y del div de mostrar2")

        //divs[3].style.display = "block"; //Se muestra el boton de enviar siempre //esto daba error pk divs[3] es un string
        //CAMBIOS DE CLAU
        //let divMostrarEnviar = document.getElementById(divs[3]);
        //divMostrarEnviar.style.display = "block"; //Se muestra el boton de enviar siempre -> esto estaría bien pero ese div no existe asi que no hace nada esta linea

    } else {
        divObjetivo.style.display = "none"; //Se esconde si estaba mostrado
    }
}




async function updateUsuario(){

    event.preventDefault();
    console.log("dentro de updateUsuario");

    var userId = sessionStorage.getItem('userId');
    sessionStorage.setItem("userId",userId);
    console.log(userId);

    let api2 = "/api/v1/usuarios/" + userId.toString();

        let res2 = await fetch(api2,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
         }});
        if (res2.status == 200){
            console.log("status del get es 200");
            const data2 = await res2.json(); //Es un único usuario (no hay que recorrerlo con un for)
            //console.log(data2);
            let userData = data2["userData"];
            let userNameNuevo = data2["userName"];
            let passwNuevo = data2["userPwd"];
            let mailNuevo = data2["userEmail"];
            let psicNuevo = data2["idPsic"];

            //Si el fetch ha ido bien, seguimos con el update
            console.log(cambiado);

            if(cambiado=="cambiado_NU")
            {
                userNameNuevo = document.getElementById("userNameChange").value;
                //userNameNuevo = userName.toString(); //esto haría que no se cambie el nombre de usuario!
                console.log("Nuevo username: " + userNameNuevo);
            }

             else if(cambiado=="cambiado_PSW")
             {
                passwNuevo = document.getElementById("userPasswChange").value;
                passwNuevo = passwNuevo.toString();

            }
            else if(cambiado=="cambiado_PSI")
            {
                psicNuevo = document.getElementById("psicIdChange").value;
                psicNuevo = psicNuevo.toString();
            }



                const dataObj = {
                            "id" : userId,
                            "userData": userData,
                            "userName" : userNameNuevo,
                            "userPwd" : passwNuevo,
                            "userEmail" : mailNuevo,
                            "idPsic" : psicNuevo
                        };

                    //VALIDO EL USERNAME NUEVO (dará false si lo que se ha cambiado es el username)
                    let uservalido = await validUsername(userNameNuevo);
                    console.log("USER VALIDO: " + uservalido);
                    console.log("cambiado: " + cambiado);
                    //Comprobaciones:
                     if (passwNuevo.length < 8){
                        alert("La contraseña introducida es demasiado corta");
                     }else if(!uservalido && cambiado == "cambiado_NU"){ //Username ya existe y es lo que se pretende cambiar
                        console.log("ELSE IF");
                        alert("Ese nombre de usuario ya existe. Por favor, escoja otro");
                     }else{ //Si lo anterior es correcto se hace el cambio

                         let api = "/api/v1/usuarios/" + userId.toString();

                            let res = await fetch(api,{
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(dataObj)
                        });

                        console.log(res);
                        if (res.status == 200){
                            alert("Cambios guardados correctamente");
                        }
                        else if (res.status != 200)
                        {
                            alert("¡Vaya! No se ha podido resolver tu petición.");
                        }
                    }

        } //por si el usuario no cambia nada, se guarda como ya estaba
        else{
            alert("¡Vaya! No se ha podido resolver tu petición.");
        }


}
async function validUsername(usernamev){

        let res = await fetch("/api/v1/usuarios",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
        }});

        let valid = true;
        if (res.status == 200){
            const data = await res.json();

            for (let i = 0; i<data.length; i++){
                let user = data[i];
                let userName = user["userName"];
                if (userName == usernamev){
                    valid = false;

                }
            }


            return valid;

        }else{
            alert("¡Vaya! No se ha podido resolver tu petición");
            return false;
        }

    }
     function cerrarSesion()
    {
        sessionStorage.setItem("userId",null);

        alert("Cierre de sesión correcto");
        location.replace("index.html");

    }

    async function showUserData(divdatos,divpsic){
        var userId = sessionStorage.getItem("userId");

        let api = "/api/v1/usuarios/" + userId.toString();
        let res = await fetch(api,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }});

        if (res.status == 200){
            //Se obtienen los datos de usuario de la petición
            const data = await res.json();
            //console.log(data);
            let userData = data["userData"];
            let userName = data["userName"];
            let userEmail = data["userEmail"];
            let psicId = data["idPsic"];
            //Se muestran sus datos en el HTML
            let content = '<div class="card">'
                                + '<div class="card-body">'
                                    + '<div class="row">'
                                        + '<div class="col-sm-3"><img src="images/user.png" alt="Dispute Bills" style="width:70px;"></div>'
                                        + '<div class="col-sm-6">'
                                            + '<h4 class="card-title">' + userData + ' (ID: ' + userId + ')' + '</h4>'
                                            + '<p class="card-text">' + userName + '</p>'
                                        +'</div>'
                                        +'<div class="col-sm-3">'
                                            + '<img src="images/email.png" alt="Dispute Bills" style="width:50px;">'
                                            + '<p class="card-text">' + userEmail + '</p>'
                                        +'</div>'
                                    + '</div>'
                                + '</div>'
                           + '</div>';
            divdatos.innerHTML = content;

            //Se muestran los datos del psicólogo del usuario - JOIN DE PSICOLOGOS Y CENTROS
            let content2 = "";
            if (psicId == 0){ //No tiene psicólogo asociado
                content2 = '<div align="center">'
                            + '<button class="button" onclick="showPsics()">Conoce a los psicólogos de NeuraHealth</button>'
                           +'</div>'
                           +'<div id="psicologos">'
                           +'</div>';;
            }else{ //Tiene psicólogo asociado

                let api2 = "/api/v1/psicologos/joincentros";
                let res2 = await fetch(api2,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }});

                if (res2.status == 200){
                    const datat = await res2.json();
                    console.log(datat);
                    datosPsic = datat;
                    for (let n = 0; n < datat.length; n++){
                        let data2 = datat[n];
                        let id = data2["psicId"];
                        //console.log(id);
                        //console.log(psicId);
                        if (id == psicId){
                            let psicData = data2["psicData"];
                            let psicName = data2["psicName"];
                            let employerName = data2["employerName"];
                            //console.log(employerName);
                            let postalCode = data2["postalCode"];
                            if (employerName == null){
                                employerName = "Freelance";
                                postalCode = "(No asociado a ningún centro)";
                            }
                            content2 = '<div class="card">'
                                                + '<div class="card-body">'
                                                    + '<div class="row">'
                                                        + '<div class="col-sm-3"><img src="images/psic.png" alt="Dispute Bills" style="width:70px;"></div>'
                                                        + '<div class="col-sm-6">'
                                                            + '<h4 class="card-title">' + psicData + ' (ID: ' + psicId + ')' + '</h4>'
                                                            + '<p class="card-text">' + psicName + '</p>'
                                                        +'</div>'
                                                        +'<div class="col-sm-3">'
                                                            + '<p class="card-title">' + employerName + '</p>'
                                                            + '<p class="card-text">' + postalCode + '</p>'
                                                        +'</div>'
                                                    + '</div>'
                                                + '</div>'
                                           + '</div>'
                                           + '<div align="center">'
                                                + '<button class="button" onclick="showAllPsics()">Conoce a otros psicólogos de NeuraHealth</button>'
                                           +'</div>'
                                           +'<div id="psicologos">'
                                           +'</div>';
                            break;
                        }
                    }

                }else{
                    content2 = '<p align="center" style="color:red">Problema de conexión. No se han podido obtener los datos. Inténtalo de nuevo más tarde.</p>';
                    alert("¡Vaya! No se ha podido resolver tu petición.");
                }
            }
            divpsic.innerHTML = content2;
        }else{
            divdatos.innerHTML = '<p align="center" style="color:red">Problema de conexión. No se han podido obtener tus datos. Inténtalo de nuevo más tarde.</p>';
            alert("¡Vaya! No se ha podido resolver tu petición.");
        }
    }

     async function showPsics(){
        event.preventDefault();
        let divpsicologos = document.getElementById('psicologos');
        let api2 = "/api/v1/psicologos/joincentros";
        let res2 = await fetch(api2,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }});

        if (res2.status == 200){
            const datosPsic = await res2.json();
            console.log(datosPsic);
            let content = "";
            for (let i = 0; i < datosPsic.length; i++){
                    let psic = datosPsic[i];
                    let id = psic["psicId"];
                    let psicData = psic["psicData"];
                    let psicName = psic["psicName"];
                    let employerName = psic["employerName"];
                    let postalCode = psic["postalCode"];
                    if (employerName == null){
                        employerName = "Freelance";
                        postalCode = "(No asociado a ningún centro)";
                    }
                    content = content + '<div class="card">'
                                                    + '<div class="card-body">'
                                                        + '<div class="row">'
                                                            + '<div class="col-sm-3"><img src="images/otherpsic.png" alt="Dispute Bills" style="width:70px;"></div>'
                                                            + '<div class="col-sm-6">'
                                                                + '<h4 class="card-title">' + psicData + ' (ID: ' + id + ')' + '</h4>'
                                                                + '<p class="card-text">' + psicName + '</p>'
                                                            +'</div>'
                                                            +'<div class="col-sm-3">'
                                                                + '<p class="card-title">' + employerName + '</p>'
                                                                + '<p class="card-text">' + postalCode + '</p>'
                                                            +'</div>'
                                                        + '</div>'
                                                    + '</div>'
                                               + '</div>'
            }
            if (divpsicologos.innerHTML == content){
                divpsicologos.innerHTML = ""; //"ESCONDO" si ya está mostrado
            }else{
                divpsicologos.innerHTML = content;
            }
            }
     }

    async function showAllPsics(){
        event.preventDefault();
        let divpsicologos = document.getElementById('psicologos');
        let content = "";
        for (let i = 0; i < datosPsic.length; i++){
                let psic = datosPsic[i];
                let id = psic["psicId"];
                let psicData = psic["psicData"];
                let psicName = psic["psicName"];
                let employerName = psic["employerName"];
                let postalCode = psic["postalCode"];
                if (employerName == null){
                    employerName = "Freelance";
                    postalCode = "(No asociado a ningún centro)";
                }
                content = content + '<div class="card">'
                                                + '<div class="card-body">'
                                                    + '<div class="row">'
                                                        + '<div class="col-sm-3"><img src="images/otherpsic.png" alt="Dispute Bills" style="width:70px;"></div>'
                                                        + '<div class="col-sm-6">'
                                                            + '<h4 class="card-title">' + psicData + ' (ID: ' + id + ')' + '</h4>'
                                                            + '<p class="card-text">' + psicName + '</p>'
                                                        +'</div>'
                                                        +'<div class="col-sm-3">'
                                                            + '<p class="card-title">' + employerName + '</p>'
                                                            + '<p class="card-text">' + postalCode + '</p>'
                                                        +'</div>'
                                                    + '</div>'
                                                + '</div>'
                                           + '</div>'
        }
        if (divpsicologos.innerHTML == content){
            divpsicologos.innerHTML = ""; //"ESCONDO" si ya está mostrado
        }else{
            divpsicologos.innerHTML = content;
        }
    }

    //FUNCIÓN PARA ELIMINAR UN USUARIO Y SUS DATOS GUARDADOS DE LA BBDD
    async function darseDeBaja(){

        event.preventDefault();
        var userId = sessionStorage.getItem("userId");
        console.log(userId);

        //ELIMINACIÓN DE LAS EMOCIONES DEL USUARIO DE LA TABLA EMOTIONDATES
        let api = "/api/v1/emotiondates/" + userId;
        let res = await fetch(api,{
            method: 'DELETE',
        });
        console.log(res);

        if (res.status == 204){
            console.log(res);

            //ELIMINACIÓN DEL USUARIO DE LA TABLA USUARIOS
            let api2 = "/api/v1/usuarios/" + userId;
            let res2 = await fetch(api2,{
                method: 'DELETE',
            });
            console.log(res2);

            if (res2.status == 204){
                console.log(res2);
                sessionStorage.setItem("userId",null);
                location.replace("index.html");
            }else{
                alert("¡Vaya! No se ha podido resolver tu petición");
            }
        }else{
            alert("¡Vaya! No se ha podido resolver tu petición");
        }

    }



