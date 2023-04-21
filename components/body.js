export default {
    showBody(){

        const worker = new Worker('./storage/wsPokemon.js')
        worker.postMessage({type: 'showPokemon'});
        worker.onmessage = function(event) {
            //document.querySelector("#App").insertAdjacentHTML("beforeend", event.data);
            console.log(event.data);
            worker.terminate();

        };
    }
}