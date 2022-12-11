const gridContainer = document.querySelector(".grid-content");
const pokemonWindow = document.querySelector(".pokemon-window");
const pokemonImage = document.querySelector(".image");
const goBackButton = document.querySelector(".go-back-button");
const searchContainer = document.querySelector(".search-container");
const searchBarInput = document.querySelector(".search");

let currentData = [];
let inputData = "";
// `https://pokeapi.co/api/v2/pokemon/2/`

//total pokemons: 898
//total images: 809

searchBarInput.addEventListener("input", (e) => {
  inputData = e.target.value;

  let newURL = `https://pokeapi.co/api/v2/pokemon/${inputData}/`;
  if (newURL != `https://pokeapi.co/api/v2/pokemon//`) {
    currentData = [];
    fetchData(newURL);
  } else {
    fetchAllPokemons();
  }
  // currentDataHandler(inputData);
});

const numberOfPokemons = 20; //151

function fetchAllPokemons() {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemons}`)
    .then((res) => res.json())
    .then((data) => {
      data.results.forEach((pokemon) => {
        fetchData(pokemon.url);
      });
    });
}

// let searchURL = `https://pokeapi.co/api/v2/pokemon/${id}/`;

function fetchData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      currentData.push(data);

      currentDataHandler(inputData);
    });
}

function clearGridContent() {
  gridContainer.innerHTML = "";
}

function currentDataHandler(id) {
  clearGridContent();
  currentData.forEach((data) => {
    renderPokemon(data, id);
  });
}

let renderedPokemons = [];

function renderPokemon(data, inputID) {
  let name = capitalizeFirstLetter(data.species.name);
  let id = 0;

  if (inputID) {
    id = inputID;
  } else {
    id = data.id;
  }

  if (id < 100) {
    id = `0${id}`;
  }
  if (id < 10) {
    id = `0${id}`;
  }
  if (id == 662) {
    id = "662r";
  }
  if (id == 740) {
    id = "740le";
  }
  let imageLink = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${id}.png`;
  let types = data.types;
  let typeName = types[0].type.name;
  let typeColor = typeColors[typeName];

  const newPokemon = document.createElement("div");
  newPokemon.className = `pokemon ${data.id}`;
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
  renderedPokemons.push(newPokemon);
  gridContainer.appendChild(newPokemon);
}

function idHandler(id) {}

goBackButton.addEventListener("click", () => {
  mainPageStyleHandler();
});

window.onload = fetchAllPokemons();
