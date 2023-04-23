const llamadoApi= async()=>{
    
    try{
        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281")
        const data = await respuesta.json()
        let resultado="";
        for(i=0; i<12;i++){
            const pokemon = await fetch(data.results[i].url);
            const data1 = await pokemon.json();
            let plantilla = `
                <div class="pokemon">
                    <div class="cont">
                        <img src="${data1.sprites.other.dream_world.front_default}" alt="">
                    </div>
                    <div class="info">
                        <div class="name">
                        <h3>${data1.name}</h3>
                        </div>
                        <div class="detailes">
                        <div class="detail">
                            <h2>Ability</h2>
                            <h3>${data1.abilities[0].ability.name}</h3>
                        </div>
                        <div class="detail">
                            <h2>Experience</h2>
                            <h3>${data1.base_experience}</h3>
                        </div>
                        <div class="detail">
                            <h2>Species</h2>
                            <h3>${data1.species.name}</h3>
                        </div>
                        </div>
                    </div>
                </div>
                `;
            resultado+=(plantilla)
        }
        return resultado
    }catch(e){
        return "Error al mostrar la data "+e;
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