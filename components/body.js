export default {
    
    showBody(){

        const worker = new Worker('./storage/wsPokemon.js')
        worker.postMessage({type: 'showPokemon'});
        worker.onmessage = function(event) {
        document.querySelector("#pokemones").insertAdjacentHTML("beforeend",event.data)
        worker.terminate();
        }; 

        document.querySelector("#buscador").addEventListener("click",()=>{
            let val= document.querySelector("#txt-busqueda").value;
            const worker = new Worker('./storage/wsPokemon.js')
            worker.postMessage({type: 'findPokemon', data:val});
            worker.onmessage = function(e) {
                document.querySelector("#pokemones").innerHTML= ""+e.data
                worker.terminate();
            };      
            
        })
        /* document.querySelector("#txt-busqueda").addEventListener("change",(e)=>{

            if(e.target.value===""){
                    const worker = new Worker('./storage/wsPokemon.js')
                    worker.postMessage({type: 'showPokemon'});
                    worker.onmessage = function(event) {
                    document.querySelector("#pokemones").innerHTML=event.data
                    worker.terminate();
                    }
    
                
            }
        }) */
    }
}