
    async function recomendarLibros()
    {
          event.preventDefault();
           var userId = sessionStorage.getItem('userId');
           sessionStorage.setItem("userId",userId);

          let api = "/api/v1/emotiondates/" + userId.toString();

              let res = await fetch(api,{
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
              }});
           if (res.status == 200){
                   const data = await res.json();
                   console.log(data);
                    for (let i = 0; i<data.length; i++){
                       let datos_emociones = data[i];
                       let emocion = datos_emociones["emotionName"];

                    }


           }

            let api2 = "/api/v1/libros";

             let res2 = await fetch(api2,{
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json',
                     'Accept': 'application/json',
             }});
          if (res2.status == 200){

                  const data2 = await res2.json();
                  console.log(data2);
                  let emocion="estresado"; //BORRAR ESTO
                for (let j = 0; j<data2.length; j++){
                  let libro = data2[j];
                  let titulo_libro = libro["titulo"];
                  let autor_libro = libro["autor"];
                  let fecha_libro = libro["fecha_pub"];
                  let emocion_libro = libro["emocion"];


                  if(emocion=="triste" && emocion_libro=="triste")
                  {

                        if(j==0)
                        {
                            document.getElementById("libro1_titulo").innerHTML = titulo_libro;
                            document.getElementById("libro1_autor").innerHTML = autor_libro;
                            document.getElementById("libro1_fecha").innerHTML = fecha_libro;
                        }
                         if(j==1)
                        {
                            document.getElementById("libro2_titulo").innerHTML = titulo_libro;
                            document.getElementById("libro2_autor").innerHTML = autor_libro;
                            document.getElementById("libro2_fecha").innerHTML = fecha_libro;
                        }
                         if(j==2)
                        {
                            document.getElementById("libro3_titulo").innerHTML = titulo_libro;
                            document.getElementById("libro3_autor").innerHTML = autor_libro;
                            document.getElementById("libro3_fecha").innerHTML = fecha_libro;
                        }

                  }
                  if(emocion=="cansado" && emocion_libro=="cansado")
                  {


                        if(j==0)
                        {

                            document.getElementById("libro1_titulo").innerHTML = titulo_libro;
                            document.getElementById("libro1_autor").innerHTML = autor_libro;
                            document.getElementById("libro1_fecha").innerHTML = fecha_libro;
                        }
                         if(j==1)
                        {
                            document.getElementById("libro2_titulo").innerHTML = titulo_libro;
                            document.getElementById("libro2_autor").innerHTML = autor_libro;
                            document.getElementById("libro2_fecha").innerHTML = fecha_libro;
                        }
                         if(j==2)
                        {
                            document.getElementById("libro3_titulo").innerHTML = titulo_libro;
                            document.getElementById("libro3_autor").innerHTML = autor_libro;
                            document.getElementById("libro3_fecha").innerHTML = fecha_libro;
                        }
}
                  if(emocion=="estresado" && emocion_libro=="estresado")
                  {
                        alert(hola);
                        if(j==0)
                        {
                            document.getElementById("libro1_titulo").innerHTML = titulo_libro;
                            document.getElementById("libro1_autor").innerHTML = autor_libro;
                            document.getElementById("libro1_fecha").innerHTML = fecha_libro;
                        }
                         if(j==1)
                        {
                            document.getElementById("libro2_titulo").innerHTML = titulo_libro;
                            document.getElementById("libro2_autor").innerHTML = autor_libro;
                            document.getElementById("libro2_fecha").innerHTML = fecha_libro;
                        }
                         if(j==2)
                        {
                            document.getElementById("libro3_titulo").innerHTML = titulo_libro;
                            document.getElementById("libro3_autor").innerHTML = autor_libro;
                            document.getElementById("libro3_fecha").innerHTML = fecha_libro;
                        }
                  }

                }
          }




        }



