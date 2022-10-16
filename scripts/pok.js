let data = localStorage.getItem("Pokemon");
let pokemonData = document.querySelectorAll(".pokemon__data");
var colors;
let id;

if (data.length == 18) {
  if (data[1].includes(",")) {
    id = data[0];
    colors = "" + data.substring(2);
  } else {
    id = data[0] + data[1];
    colors = "" + data.substring(3);
  }
} else {
  id = data.substring(0, 2);
  colors = "" + data.substring(3);
}

function generatePokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, { method: "GET" })
    .then((res) => res.json())
    .then((pokemon) => {
      pokemonData[0].innerHTML += `
                                        <div class="img__box" style="background-color: ${colors}">
                                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="" class="pokemon__img">
                                        </div>
                                            <div class="stats" style="background-color: ${colors}">
                                            <h1 class="pokemon__name">${pokemon.name[0].toUpperCase() + pokemon.name.substring(1) }</h1>
                                            <p><i class="fa-sharp fa-solid fa-dumbbell"> ${pokemon.weight / 10 + " kg"}</p></i>
                                            <p><i class="fa-solid fa-arrow-up-wide-short"> ${pokemon.height * 10 + " cm"}</i></p>
                                            <h2> Stats </h2>
                                                <p><i class="fa-solid fa-heart"> ${pokemon.stats[0].base_stat}</p></i>
                                                <p><i class="fa-solid fa-burst"> ${pokemon.stats[1].base_stat}</p></i>
                                                <p><i class="fa-solid fa-shield"> ${pokemon.stats[2].base_stat}</p></i>
                                                <p><i class="fa-solid fa-bolt-lightning"> ${pokemon.stats[5].base_stat}</p></i>
                                            <h3>Abilities</h3>
                                               ${generateAbilities(pokemon)}
                                            <h4>Types</h4>
                                            <p>${pokemon.types[0].type.name[0].toUpperCase() + pokemon.types[0].type.name.substring(1)}</p>
                                            <h4> Where to find ? </h4>
                                                ${encouterArea(pokemon.location_area_encounters)}
                                            </div>`;
    });
}
function encouterArea(URL) {
  var places = "";
  var aux = "";

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((e) => {
        aux = e.location_area.name[0].toUpperCase() + e.location_area.name.substring(1);
        aux = aux.replace("-", " ").replace("-", " ");
        aux = aux.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
          return a.toUpperCase();
        });

        if (aux.includes("Area")) {
          aux = aux.substring(aux.indexOf("Area"), 0);
        }

        places += `<p>${aux}</p>`;

      });
        //console.log(places);
      localStorage.setItem("locals", JSON.stringify(places));
      
    });

  return setArea();
}
function setArea() {
  let area = JSON.parse(localStorage.getItem("locals"));
  return area;
}
function generateAbilities(pokemon) {
  var abilitys = "";
      pokemon.abilities.forEach((e, i) => {
        abilitys += `<p>${
          e.ability.name[0].toUpperCase() + e.ability.name.substring(1)
        }</p>`;
      });
      return abilitys;
}

generatePokemon(id);
