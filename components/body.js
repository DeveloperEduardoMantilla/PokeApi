export default {
    showBody(){
        const worker = new Worker('./storage/wsPokemon.js')
        worker.postMessage({type: 'showPokemon'});
        worker.onmessage = function(event) {
            document.querySelector("#pokemones").insertAdjacentHTML("beforeend",event.data)
            worker.terminate();
        };        

        document.querySelector("#siguiente").addEventListener("click",()=>{
            document.querySelector("#pokemones").innerHTML="<h2>Siguiente</h2>"
        })
    }
}