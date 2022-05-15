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



    if (divObjetivo.style.display === "none"){
        for (let i=0;i<divs.length-1;i++){
            divAEsconder = document.getElementById(divs[i]);
            divAEsconder.style.display = "none"; //Se esconde
        }
        divObjetivo.style.display = "block"; //Se muestra
        divs[3].style.display = "block"; //Se muestra el boton de enviar siempre
    } else {
        divObjetivo.style.display = "none"; //Se esconde si estaba mostrado
    }
}




async function updateUsuario(){



    var userId = sessionStorage.getItem('userId');
    sessionStorage.setItem("userId",userId);

    let api2 = "/api/v1/usuarios/" + userId.toString();

        let res2 = await fetch(api2,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
         }});
        if (res2.status == 200){

               const data2 = await res2.json();
                for (let j = 0; j<data2.length; j++){
                     let usuario = data2[j];
                     let userData = usuario["userData"];
                     let userName = usuario["userName"];
                     let userPwd = usuario["userPwd"];
                     let psicNuevo = usuario["idPsic"];
                     console.log(usuario);
             }
        } //por si el usuario no cambia nada, se guarda como ya estaba



    if(cambiado=="cambiado_NU")
    {
        userNameNuevo = document.getElementById("userNameChange").value;
        userNameNuevo = userName.toString();
    }

     else if(cambiado="cambiado_PSW")
     {
        passwNuevo = document.getElementById("userPasswChange").value;
        passwNuevo = passwNuevo.toString();

    }
    else if(cambiado="cambiado_PSI")
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

             let api = "/api/v1/usuarios/" + userId.toString();

                let res = await fetch(api,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataObj)
            });

            console.log(res);
            showUsers();

    }
