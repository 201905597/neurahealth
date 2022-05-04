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
        for (let i = 0; i<data.length; i++){
            let user = data[i];
            let userName = user["userName"];
            let pass = user["password"];

            if (userName == username || pass == password){
                valid = true;
                break;
            }
        }
        if (valid){
            location.replace("js/index.html");
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