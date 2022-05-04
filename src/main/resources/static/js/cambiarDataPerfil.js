let divObjetivo;
let divs = ["cambiarUN","cambiarPASS","cambiarPSICO","MostrarEnviar"];

let cambiado="nada";

function showInfo()
{


    if(document.getElementById("seleccion").value=="Nombre de usuario")
    {
        divObjetivo = document.getElementById("cambiarUN");
        cambiado="cambiado_NU"
    }
    else if(document.getElementById("seleccion").value=="Contraseña")
    {
        divObjetivo = document.getElementById("cambiarPASS");
        cambiado="cambiado_PSW"
    }
    else if(document.getElementById("seleccion").value=="Psicologo")
    {
        divObjetivo = document.getElementById("cambiarPSICO");
        cambiado="cambiado_PSI"
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

    if(cambiado=="cambiado_NU")
    {
        userNameNuevo = document.getElementById("userNameChange").value;
         userNameNuevo = userName.toString();
    }

     if(cambiado="cambiado_PSW")
     {
        passwNuevo = document.getElementById("userPasswChange").value;
        passwNuevo = passwNuevo.toString();
    }
    if(cambiado="cambiado_PSI")
    {
        psicNuevo = document.getElementById("psicIdChange").value;
        psicNuevo = psicNuevo.toString();
    }

    let userInfo = await getUserById(userId);

    console.log("userInfo content");
    console.log(userInfo);

    if (userInfo != null){
        //let user = userInfo[0];
        //console.log(user);
        let userData = userInfo["userData"];

        const dataObj = {
                    "id" : userId,
                    "userData": userData,
                    "userName" : userNameNuevo,
                    "userPwd" : passwNuevo,
                    "idPsic" : psicNuevo
                };

            let res = await fetch("/api/v1/usuarios/10005",{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataObj)
            });

            console.log(res);
            showUsers();
    }else{
        alert("¡Vaya! No se ha podido resolver tu petición");
    }

}
