const recorrerData= async(data)=>{
    let resultado =""
    data.forEach(element=>{
        resultado+= element
    })
    return resultado
}
const llamadoApi= async()=>{
    try{
        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281")
        const data = await respuesta.json()
        
        return recorrerData(data)
    }catch(e){
        return "Error al mostrar la data";
    }
}

self.addEventListener('message', async function(event){
    const data = event.data;
    let result;
    
    switch(data.type){
        case 'showPokemon':
            result= await llamadoApi();
            break;
        default:
            result="False"
    }

    self.postMessage(result);

});