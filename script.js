const allContent = document.querySelector("body");
const gridContainer = document.querySelector(".grid-content");
const pokemonWindow = document.querySelector(".pokemon-window");
const pokemonImage = document.querySelector(".image");
const goBackButton = document.querySelector(".go-back-button");
const searchContainer = document.querySelector(".search-container");
const searchBarInput = document.querySelector(".search");
const nothingFound = document.querySelector(".nothing-found");

allContent.style.filter = "opacity(0%)";

let inputData = "";
//total pokemons: 898
//total images: 809

const numberOfPokemons = 809; //151

let count = 0;
let isLoaded = false;

function renderPokemon(data) {
  ++count;
  let name = capitalizeFirstLetter(data.species.name);
  let id = 0;

  id = data.id;

  if (id < 100) {
    id = `0${id}`;
  }
  if (id < 10) {
    id = `0${id}`;
  }

  //BACKUP IMAGES: https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${id}.png

  let imageLink = `https://pokedex.hybridshivam.com/assets/thumbnails-compressed/${id}.png`;
  let types = data.types;
  let typeName = types[0].type.name;
  let typeColor = typeColors[typeName];

  const newPokemon = document.createElement("div");
  newPokemon.id = `pokemon`;
  newPokemon.className = ` ${data.id} ${name.toLowerCase()}`;
  newPokemon.innerHTML = `
    <p>#${id}</p>
    <p>${name}</p>
    <img src="${imageLink}" alt="">
    `;
  newPokemon.addEventListener("click", (e) => {
    chosenPokemonHandler(e);
    document.querySelector("header").style.background = `${typeColor}`;
  });
  newPokemon.style.background = `${typeColor}`;
  gridContainer.appendChild(newPokemon);
  if (count === numberOfPokemons) {
    isLoaded = true;
    allContent.style.filter = "opacity(100%)";
  }
}

searchBarInput.addEventListener("input", (e) => {
  if (isLoaded) {
    const allDivs = document.querySelectorAll("#pokemon");
    inputData = e.target.value;
    searchHandler(allDivs);
  }
});

goBackButton.addEventListener("click", () => {
  mainPageStyleHandler();
});
