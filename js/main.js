import { clearPokedex, generatePokemon, showFilter, typesFilter } from "../scripts/app.js";

let faIcons = document.querySelectorAll('.fa');
let btnSubmit = document.querySelector('#btnFilter');

generatePokemon(null);

function getID(e) {
    e.classList;
    localStorage.setItem(
      "Pokemon",
      `${e.classList},${e.parentNode.style.backgroundColor}`
    );
    localStorage.setItem("Color", `${e.parentNode.style.backgroundColor}`);
};

faIcons[0].addEventListener('click', () => {
    showFilter();
});
faIcons[1].addEventListener('click', () => {
    clearPokedex();
});
btnSubmit.addEventListener('click', () => {
    typesFilter();
});
