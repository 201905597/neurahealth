//MOSTRAR LOS PACIENTES DEL PSICÓLOGO - !!!! FALTA CASO VACÍO (0 pacientes)
async function getPacientes(divpacientes){

    event.preventDefault();
    var idPsic = sessionStorage.getItem('psicId');

    //Fetch de los usuarios con ese psicólogo asignado
    let api = "/api/v1/usuarios/conpsic/" + idPsic.toString();
    let res = await fetch(api,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
    }});

    //Control de errores
    if (res.status == 200){

        const data = await res.json();
        console.log(data);

        //Visualización de los pacientes en HTML
        let content = "";
        if (data.length == 0){
            content = '<p>No tienes pacientes asignados.</p>'
                       +'<p>Puedes escribir a administración para comenzar a ayudar a usuarios de NeuraHealth.</p><br>'
                       +'<form action="mailto:someone@example.com" method="post" enctype="text/plain">'
                       +'Tu nombre:<br>'
                       +'<input type="text" name="name"><br><br>'
                       +'Tu E-mail:<br>'
                       +'<input type="text" name="mail"><br><br>'
                       +'Escribe aquí tu comentario:<br>'
                       +'<input type="text" name="comment" size="50"><br><br>'
                       +'<input class="button" type="submit" value="Send">'
                       +'<input class="button" type="reset" value="Reset">'
                       +'</form>';
        }else{
            for (let i = 0; i < data.length; i++){
                let usuario = data[i];
                let userData = usuario["userData"];
                let userName = usuario["userName"];
                let userEmail = usuario["userEmail"];
                let userId = usuario["id"];
                content = content + '<div class="card">'
                                         + '<div class="card-body">'
                                            + '<div class="row">'
                                                + '<div class="col-sm-3"><img src="images/user.png" alt="Dispute Bills" style="width:50px;"></div>'
                                                + '<div class="col-sm-6">'
                                                    + '<h4 class="card-title">' + userData + '</h4>'
                                                    + '<p class="card-text">' + userName + '</p>'
                                                +'</div>'
                                                +'<div class="col-sm-3">'
                                                    +'<button class="button" onclick="mostrarSeguimiento(this)" id="' + userId.toString() + '">Ver Seguimiento</button>'
                                                +'</div>'
                                            + '</div>'
                                         + '</div>'
                                      + '</div>'
                                      + '<div align="center" style="display: none; padding-left: 10%; padding-right: 10%;" id="' + userId.toString() + "show" + '">'
                                        + '<table class="table table-dark table-hover" id="' + userId.toString() + "table" + '"></table>'
                                      + '</div>'
                                      +'<div align="center" style="display: none; padding-left: 10%; padding-right: 10%;" id="' + userId.toString() + "email" + '">'
                                          +'<p>Puedes enviar un mail a tu paciente para programar una sesión.</p>'
                                          +'<form action="mailto:' + userEmail.toString() + '" method="post" enctype="text/plain">'
                                          +'<input class="button" type="submit" value="Send">'
                                          +'</form>'
                                      +'</div>';
            }
        }
        divpacientes.innerHTML = content;

    }else{
        alert("¡Vaya! No se ha podido resolver tu petición");
    }
}

//VER SEGUIMIENTO DE CADA PACIENTE
async function mostrarSeguimiento(boton){

    event.preventDefault();
    let userId = boton.id;
    boton.innerHTML = "Ver Seguimiento";
    userId = userId.toString();

    //DIV en el que está la tabla
    let divShow = document.getElementById(userId + "show");

    //DIV para enviar mail
    let divMail = document.getElementById(userId + "email");

    if (divShow.style.display == "block"){
        divShow.style.display = "none";
        divMail.style.display = "none";
    }else{
        boton.innerHTML = "Ocultar";
        divShow.style.display = "block";
        divMail.style.display = "block";
    }

    //Fetch de las emociones guardadas del usuario
    let api = "/api/v1/emotiondates/" + userId.toString();
    let res = await fetch(api,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });

    //Control de errores
    if (res.status == 200){

        const data = await res.json();
        console.log(data);

        //Visualización de los estados de ánimo del paciente - TABLA
        if (data.length == 0){
            divShow.innerHTML = '<p align="center">No tiene emociones registradas</p>';
        }else{

            let table = document.getElementById(userId + "table");

            //Borro lo anterior
            table.innerHTML = "";

            //Tabla de dos columnas (FECHA, ESTADO DE ÁNIMO)
            let thead = document.createElement('thead');
            let tbody = document.createElement('tbody');
            table.appendChild(thead);
            table.appendChild(tbody);

            //Primera fila de la tabla
            let row_1 = document.createElement('tr');
            let heading_1 = document.createElement('th');
            heading_1.innerHTML = "FECHA";
            let heading_2 = document.createElement('th');
            heading_2.innerHTML = "ESTADO DE ÁNIMO";
            row_1.appendChild(heading_1);
            row_1.appendChild(heading_2);
            thead.appendChild(row_1);

            //Body de la tabla
            for (let i = 0; i < data.length; i++){
                let emotion = data[i];
                let emotionName = emotion["emotionName"];
                let fecha = emotion["fecha"];
                //FECHA (primera columna)
                let row = document.createElement('tr');
                let row_data1 = document.createElement('td');
                row_data1.innerHTML = fecha.toString();
                //ESTADO DE ÁNIMO (segunda columna)
                let row_data2 = document.createElement('td');
                row_data2.innerHTML = emotionName.toString();

                row.appendChild(row_data1);
                row.appendChild(row_data2);

                tbody.appendChild(row);
            }
        }

    }else{
        alert("¡Vaya! No se ha podido resolver tu petición");
    }
}
function cerrarSesion()
{

    sessionStorage.setItem("userId",null);
    if(sessionStorage.getItem('userId')==null)
    {
        alert("Cierre de sesión correcto");
        location.replace("index.html");

    }

}