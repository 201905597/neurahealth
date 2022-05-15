
    async function recomendarLibros()
    {


          let emociones = [];
          let datos_emociones=[];
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
                       datos_emociones = data[i];
                       emociones[i] = datos_emociones["emotionName"];

                    }
                    numero= Math.floor(Math.random()*(emociones.length-1-0+1)+0); //elegimos una emocion aleatoria del usuario
                    if(datos_emociones.length==0)
                    {
                        alert("Registra alguna emocion para poder hacerle una recomendacion");
                        location.replace("userIndex.html");
                    }
                    else
                    {
                        emocion=emociones[numero];
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


                  let m=0;

                for (let j = 0; j<data2.length; j++){
                  let libro = data2[j];
                  let titulo_libro = libro["titulo"];
                  let autor_libro = libro["autor"];
                  let fecha_libro = libro["fecha_pub"];
                  let emocion_libro = libro["emocion"];

                  /*

                  if(emocion=="triste")
                  {
                    document.getElementById("titulo_emocion").innerHTML = "Libros para combatir la tristeza";
                  }
                  else if(emocion=="cansado")
                  {

                       document.getElementById("titulo_emocion").innerHTML = "Libros para combatir el cansancio";
                  }
                  else if(emocion=="estresado")
                  {
                      document.getElementById("titulo_emocion").innerHTML = "Libros para combatir el estres";

                  }
                  */


                  if(emocion==emocion_libro)
                  {


                        if(m==0)
                        {
                            document.getElementById("libro1_titulo").innerHTML = titulo_libro;
                            document.getElementById("libro1_autor").innerHTML = autor_libro;
                            document.getElementById("libro1_fecha").innerHTML = fecha_libro;

                        }
                         if(m==1)
                        {
                            document.getElementById("libro2_titulo").innerHTML = titulo_libro;
                            document.getElementById("libro2_autor").innerHTML = autor_libro;
                            document.getElementById("libro2_fecha").innerHTML = fecha_libro;

                        }
                         if(m==2)
                        {
                            document.getElementById("libro3_titulo").innerHTML = titulo_libro;
                            document.getElementById("libro3_autor").innerHTML = autor_libro;
                            document.getElementById("libro3_fecha").innerHTML = fecha_libro;
                        }
                        m=m+1;

                  }



                }
          }




        }



