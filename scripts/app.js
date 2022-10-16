let checked = false;
let pokedex = document.getElementById("poked");
let filterPage = document.querySelector("#filter");
let fliped = true;
let cards = document.querySelectorAll(".card");

function getID(e) {
  e.classList;

  localStorage.setItem(
    "Pokemon",
    `${e.classList},${e.parentNode.style.backgroundColor}`
  );
  localStorage.setItem("Color", `${e.parentNode.style.backgroundColor}`);
}
function showFilter() {
  if(!checked){
    filterPage.style.display = 'flex';
    swipFilter(filterPage, '-200px','0px');
    checked = true;
  } else {
    swipFilter(filterPage, '0px','-200px');
    setTimeout(()=>{
      filterPage.style.display = 'none';
    }, 500);
    checked = false;
  }
}
function swipFilter(element, start, end){
  element.animate([
    {top: start},
    {top: end}
  ],{
    duration: 700,
    iterations: 1
  })
}

function typesFilter(e) {
  var inputData = document.querySelectorAll('input[type="radio"]');
  inputData.forEach((element) => {
    if (element.checked) {
      console.log("Type select = " + element.value);
      clearPokedex();
      generatePokemon(element.value);
    }
  });
}
function clearPokedex() {
  pokedex.innerHTML = "";
}
function generatePokemon(type) {
  for (i = 1; i < 50; i++) {
    let aux = i;
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (type) {
          console.log("Type OK");
          errorSpan = document.getElementById("erromsg");
          if (data.types[0].type.name != type) {
          } else {
            createCard(data, aux);
          }
        } else {
          createCard(data, aux);
        }
      });
  }
};
let isArray = [];

function createCard(data, id) {
  let pokemonName = data.name;
  isArray.push(Object.entries(data));
  pokedex.innerHTML += `<div class="card ${id}" style="background-color: ${colors(data.types[0].type.name)};">
                            <a href="/profile.html" onclick="getID(this)" target="_blank" class="${id}">"<h3 class="card__text">${pokemonName[0].toUpperCase() + pokemonName.substring(1)}</h3></a>
                            <div class="tt" style="background-image: linear-gradient(white,${colors(data.types[0].type.name)},${colors(data.types[0].type.name)},silver);"><p class="type_text">${data.types[0].type.name}</p></div>
                            <img class="pokemon__img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png">
                            <p class=id_p>${data.id}</p>
                                <div class="stats">
                                <p><i class="fa-solid fa-heart tooltip"> ${
                                  data.stats[0].base_stat}<span class="tooltiptext">HP</span></p></i>
                                <p><i class="fa-solid fa-burst tooltip"> ${
                                  data.stats[1].base_stat}<span class="tooltiptext">Ataque</span></p></i>
                                <p><i class="fa-solid fa-shield tooltip"> ${
                                  data.stats[2].base_stat}<span class="tooltiptext">Defesa</span></p></i>
                                <p><i class="fa-solid fa-bolt-lightning tooltip"> ${
                                  data.stats[5].base_stat}<span class="tooltiptext">Velocidade</span></p></i>
                                </div>
                            </div>
                            </div>`;
};
function colors(types) {
  switch (types) {
    case "grass":
      return "#147B3D";
      break;
    case "fire":
      return "#A92021";
      break;
    case "electric":
      return "#E3E32B";
      break;
    case "water":
      return "#1552E2";
      break;
    case "ground":
      return "#A9702C";
      break;
    case "rock":
      return "#48180B";
      break;
    case "bug":
      return "#1C4B29";
      break;
    case "poison":
      return "#5E2D88";
      break;
    case "dragon":
      return "#448B95";
      break;
    case "psychic":
      return "#F81C91";
      break;
    case "flying":
      return "#4A677D";
      break;
    case "fighting":
      return "#EF6138";
      break;
    case "normal":
      return "#75515B";
      break;
    case "ice":
      return "#B8E6F7";
      break;
    case "ghost":
      return "#33336B";
      break;
    case "fairy":
      return "#C41A5B";
      break;

    default:
      break;
  }
};
generatePokemon(null);
