// VERIFICAR CREDENCIALES DE USUARIO
async function verificarUser(username,password,validu){
    event.preventDefault();
    let valid = false;
    console.log(username);
    console.log(password);

    if (username == "" || password == ""){
        alert("Por favor, rellena todos los campos");
    }else{
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
                let pass = user["userPwd"];
                userId = user["id"];
                console.log(userName);
                console.log(pass);
                //SET del parámetro user ID
                sessionStorage.setItem("userId",userId);
                console.log(valid);
                if (userName == username && pass == password){
                    valid = true;
                    break;
                }
            }
            if (valid){
                location.replace("userIndex.html");
            }else{
                validu.innerHTML = '<p style="color:red;">Hay algún error en los datos introducidos.</p>';
            }
        }else{
            alert("¡Vaya! No se ha podido resolver tu petición");
        }
    }


}

// VERIFICAR CREDENCIALES DE PSICÓLOGO
async function verificarPsic(psicname,pass,error){
    event.preventDefault();
    let valid = false;
    console.log(psicname);
    console.log(pass);

    if (psicname == "" || pass == ""){
        alert("Por favor, rellena todos los campos");
    }else{
        let res = await fetch("/api/v1/psicologos",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
        }});

        if (res.status == 200){
            const data = await res.json();
            console.log(data);
            let psicId = "";
            for (let i = 0; i<data.length; i++){
                let psic = data[i];
                let psicData = psic["psicData"];
                let psicName = psic["psicName"];
                let password = psic["psicPwd"];
                psicId = psic["id"];
                console.log(psicName);
                console.log(password);
                //SET del parámetro user ID
                sessionStorage.setItem("psicId",psicId);
                console.log(valid);
                if (psicName == psicname && password == pass){
                    valid = true;
                    break;
                }
            }
            if (valid){
                location.replace("psicIndex.html");
            }else{
                error.innerHTML = '<p style="color:red;">Hay algún error en los datos introducidos.</p>';
            }
        }else{
            alert("¡Vaya! No se ha podido resolver tu petición");
        }
    }
}