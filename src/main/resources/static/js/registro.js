//POST REQUEST - INSERCION DE USUARIOS
async function registrarse(datos,username,email,password,validu){
    event.preventDefault();
    if (datos == "" || username == "" || password == "" || email == ""){
        alert("Por favor, completa todos los campos");
    }else if (password.length < 8){
        alert("La contraseña introducida es demasiado corta");
    }else if(!validarEmail(email)){
        alert("El email introducido no es válido");
    }else{

        // Comprobación de validez del nombre de usuario
        let uservalido = await validUsername(username);

        if (uservalido){
            //No se incluye el ID porque se crea automáticamente siguiendo el orden
            const dataObj = {
                "userData" : datos,
                 "userName" : username,
                 "userPwd" : password,
                 "userEmail" : email,
                 "idPsic" : 0
            };

            // Inserción del nuevo usuario
            let res = await fetch("/api/v1/usuarios",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataObj)
            });

            validu.innerHTML = "";

            if (res.status == 201){
                alert("Todo ha ido bien :)");
            }else{
                alert("¡Vaya! Parece que algo ha ido mal :(");
            }

        }else{
            validu.innerHTML = '<p style="color:red;">Ya existe un usuario con este nombre</p>';
        }
    }
}

// GET REQUEST - GET USERNAMES (para ver si está disponible el username)
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

//FUNCION PARA VALIDAR EL EMAIL
function validarEmail(email){
    //REGEXP EMAIL
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

// POST REQUEST - INSERCION DE PSICOLOGOS
async function registrarsePsic(nombre,psicname,pass,centro,validp){
    event.preventDefault();
    if (nombre == "" || psicname == "" || pass == "" || centro == ""){
        alert("Por favor, completa todos los campos");
    }else if (pass.length < 8){
        alert("La contraseña introducida es demasiado corta");
    }else{

        // Comprobación de validez del nombre de usuario
        let uservalido = await validUsernameP(psicname);

        if (centro == "Soy Freelance"){
            centro = 0;
        }

        if (uservalido){
            //No se incluye el ID porque se crea automáticamente siguiendo el orden
            const dataObj = {
                "psicData" : nombre,
                 "psicName" : psicname,
                 "psicPwd" : pass,
                 "employerId" : centro
            };

            // Inserción del nuevo psicólogo
            let res = await fetch("/api/v1/psicologos",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataObj)
            });

            validp.innerHTML = "";

            if (res.status == 201){
                alert("Todo ha ido bien :)");
            }else{
                alert("¡Vaya! Parece que algo ha ido mal :(");
            }

        }else{
            validp.innerHTML = '<p style="color:red;">Ya existe un psicólogo con este nombre</p>';
        }
    }
}

// GET REQUEST - GET PSIC USERNAMES (para ver si está disponible el username)
async function validUsernameP(usernamev){

        let res = await fetch("/api/v1/psicologos",{
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
                let psicName = user["psicName"];
                if (psicName == usernamev){
                    valid = false;
                }
            }

            return valid;

        }else{
            alert("¡Vaya! No se ha podido resolver tu petición");
            return false;
        }
}
