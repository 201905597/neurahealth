// VERIFICAR CREDENCIALES DE USUARIO
async function verificarUser(username,password,error){
    event.preventDefault();
    let valid = false;

    let res = await fetch("/api/v1/usuarios",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
    }});

    if (res.status == 200){
        const data = await res.json();
        console.log(data);
        let userId = "";
        for (let i = 0; i<data.length; i++){
            let user = data[i];
            let userName = user["userName"];
            let pass = user["password"];
            userId = user["id"];

            if (userName == username || pass == password){
                valid = true;
                break;
            }
        }
        if (valid){
            location.replace("userIndex.html");
            console.log("hola");
            let userId2 = document.getElementById("userId");
            userId2.innerHTML = userId;
        }else{
            error.innerHTML = '<p style="color:red;">Hay algún error en los datos introducidos.</p>';
        }
    }else{
        alert("¡Vaya! No se ha podido resolver tu petición");
    }
}

// VERIFICAR CREDENCIALES DE PSICÓLOGO
async function verificarPsic(psicname,password){
}