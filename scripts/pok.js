let id = localStorage.getItem('Pokemon');
console.log(id);

function generatePokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`,{method : "GET"})
        .then((res) => res.json())
        .then((data) => {console.log(data)});
}

generatePokemon(id);