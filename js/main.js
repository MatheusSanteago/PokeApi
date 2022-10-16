import { clearPokedex, generatePokemon, showFilter, typesFilter } from "../scripts/app.js";

let faIcons = document.querySelectorAll('.fa');
let btnSubmit = document.querySelector('#btnFilter');
    
generatePokemon(null,50);

faIcons[0].addEventListener('click', () => {
    showFilter();
});
faIcons[1].addEventListener('click', () => {
    clearPokedex();
});
btnSubmit.addEventListener('click', () => {
    typesFilter();
});
