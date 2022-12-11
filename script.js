const gridContainer = document.querySelector(".grid-content");
const pokemonWindow = document.querySelector(".pokemon-window");
const pokemonImage = document.querySelector(".image");
const goBackButton = document.querySelector(".go-back-button");
const searchContainer = document.querySelector(".search-container");
const searchBarInput = document.querySelector(".search");
const nothingFound = document.querySelector(".nothing-found");
let inputData = "";

//total pokemons: 898
//total images: 809

const numberOfPokemons = 809;

searchBarInput.addEventListener("input", (e) => {
  inputData = e.target.value;
  searchHandler();
});

function renderPokemon(data) {
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
}

goBackButton.addEventListener("click", () => {
  mainPageStyleHandler();
});
