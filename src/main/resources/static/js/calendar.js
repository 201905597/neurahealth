//GET REQUEST - ESTADOS DE ÁNIMO GUARDADOS
async function getAnimos(mmyyyyp){
    event.preventDefault();
    console.log(mmyyyyp.options[mmyyyyp.selectedIndex].text);
    let mmyyyy = mmyyyyp.options[mmyyyyp.selectedIndex].text;
    let api = "/api/v1/emotiondates/10001/" + mmyyyy.toString();

    let res = await fetch(api,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }});

    //FALTA
    // - CASO EMPTY
    // - PASARLE EL ID EN OTRO PARAMETRO!
    if (res.status == 200){
        const data = await res.json();
        console.log(data);
    }else{
        alert("¡Vaya! No se ha podido resolver tu petición");
    }
    //pinto el calendario de ese mes y ese año
}