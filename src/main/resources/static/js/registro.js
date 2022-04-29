//POST REQUEST - INSERCION DE USUARIOS
async function registrarse(datos,username,password){
    event.preventDefault();
    if (datos == "" || username == "" || password == ""){
        alert("Por favor, completa todos los campos");
    }else if (password.length < 8){
        alert("La contraseña introducida es demasiado corta");
    }else{
        //No se incluye el ID porque se crea automáticamente siguiendo el orden
        const dataObj = {
            "userData" : datos,
             "userName" : username,
             "userPwd" : password,
             "idPsic" : 0
        };

        let res = await fetch("/api/v1/usuarios",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataObj)
        });

        if (res.status == 201){
            alert("Todo ha ido bien :)");
            //showUsers();
        }else{
            alert("¡Vaya! Parece que algo ha ido mal :(");
        }
    }
}

// GET REQUEST - USUARIOS (para pruebas)
async function showUsers(){

        let res = await fetch("/api/v1/usuarios",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
        }});

        if (res.status == 200){
            const data = await res.json();
            div = document.getElementById("mostrar");
            let content = "";
            for (let i = 0; i<data.length; i++){
                let user = data[i];
                let id = user["id"];
                let userName = user["userName"];
                let userPwd = user["userPwd"];
                let idPsic = user["idPsic"];
                content = content + '<div class="card"><div class="card-body"><h4 class="card-title">' + userName + ', ' + id + '</h4><p class="card-text">Psicólogo: ' + idPsic + '</p></div></div><br>';
            }

            div.innerHTML = content;
        }else{
            alert("¡Vaya! No se ha podido resolver tu petición");
        }
}