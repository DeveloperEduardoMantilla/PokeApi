const llamadoApi= async()=>{
    try{
        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281")
        const data = await respuesta.json()
        
        let resultado=[]
        
        for(i=0; i<data.count;i++){
            const pokemon = await fetch("https://pokeapi.co/api/v2/pokemon/"+i)
            const data1 = await pokemon.json()

            resultado.unshift(data1.results[i])
        }

        return resultado
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