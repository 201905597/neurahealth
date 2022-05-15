let divObjetivo;
let divs = ["cambiarUN","cambiarPASS","cambiarPSICO","MostrarEnviar"];

let cambiado="nada";

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
                            "idPsic" : psicNuevo
                        };



                    //comprobaciones:
                     if (passwNuevo.length < 8){
                            alert("La contraseña introducida es demasiado corta");
                     }
                    //(2) Comprobar que la nueva contraseña es de mínimo 8 caracteres
                     let uservalido = await validUsername(userNameNuevo);

                     let api = "/api/v1/usuarios/" + userId.toString();

                        let res = await fetch(api,{
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(dataObj)
                    });

                    console.log(res);
                    if (res.status == 200 && uservalido==true){
                        alert("Cambios guardados correctamente");
                    }
                    else if (res.status != 200)
                    {
                        alert("¡Vaya! No se ha podido resolver tu petición.");
                    }


        } //por si el usuario no cambia nada, se guarda como ya estaba
        else{
            alert("¡Vaya! No se ha podido resolver tu petición.")
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
                    alert("Ese nombre de usuario ya existe. Por favor, escoja otro");
                }
            }


            return valid;

        }else{
            alert("¡Vaya! No se ha podido resolver tu petición");
            return false;
        }
}
