const llamadoApi= async()=>{ 
    try{
        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281")
        const data = await respuesta.json()
        let resultado="";
        for(i=0; i<8;i++){
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

const buscarPokemon= async(textoBuscar)=>{ 
    try{
        const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/"+textoBuscar)
        const data = await respuesta.json()
        let plantilla = `
                <div class="pokemon">
                    <div class="cont">
                        <img src="${data.sprites.other.dream_world.front_default}" alt="">
                    </div>
                    <div class="info">
                        <div class="name">
                        <h3>${data.name}</h3>
                        </div>
                        <div class="detailes">
                        <div class="detail">
                            <h2>Ability</h2>
                            <h3>${data.abilities[0].ability.name}</h3>
                        </div>
                        <div class="detail">
                            <h2>Experience</h2>
                            <h3>${data.base_experience}</h3>
                        </div>
                        <div class="detail">
                            <h2>Species</h2>
                            <h3>${data.species.name}</h3>
                        </div>
                        </div>
                    </div>
                </div>
                `;
        return plantilla
    }catch(e){
        return "<h2>Pokemon no encontrado :( </h2>";
    }
}

self.addEventListener('message', async function(event){
    const data = event.data;
    let result;
    
    switch(data.type){
        case 'showPokemon':
            result= await llamadoApi();
            break;   
        case 'findPokemon':
            result= await buscarPokemon(data.data);
            break; 
        default:
            result="False"
    }

    self.postMessage(result);

});