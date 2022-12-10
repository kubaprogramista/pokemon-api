const gridContainer = document.querySelector(".grid-content");
const pokemonWindow = document.querySelector(".pokemon-window");
const pokemonImage = document.querySelector(".image");
const goBackButton = document.querySelector(".go-back-button");
const searchContainer = document.querySelector(".search-container");
const searchBarInput = document.querySelector(".search");
// `https://pokeapi.co/api/v2/pokemon/2/`

//total pokemons: 898
//total images: 809

searchBarInput.addEventListener("input", (e) => {
  inputData = e.target.value;
  gridContainer.innerHTML = "";
  let newURL = `https://pokeapi.co/api/v2/pokemon/${inputData}/`;
  if (newURL != `https://pokeapi.co/api/v2/pokemon//`) {
    fetchData(newURL);
  } else {
    fetchAllPokemons();
  }
  // currentDataHandler(inputData);
});

const numberOfPokemons = 20; //151

function fetchAllPokemons(newURL) {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemons}`)
    .then((res) => res.json())
    .then((data) => {
      data.results.forEach((pokemon) => {
        fetchData(pokemon.url);
      });
    });
}

window.onload = fetchAllPokemons();

let currentData = [];
let inputData = "";
// let searchURL = `https://pokeapi.co/api/v2/pokemon/${id}/`;

function fetchData(url, newURL) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      gridContainer.innerHTML = "";
      currentDataHandler(inputData);
      currentData.push(data);
    });
}

function currentDataHandler(id) {
  currentData.forEach((data) => {
    renderPokemon(data, id);
  });
}

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
  gridContainer.appendChild(newPokemon);
}

goBackButton.addEventListener("click", () => {
  mainPageStyleHandler();
});

function chosenPokemonHandler(e) {
  let pokemonID = "";
  let pokemonClassName = e.path[1].className.split(" ");
  if (e.path[1].className === "grid-content") {
    pokemonClassName = e.path[0].className.split(" ");
    pokemonID = pokemonClassName[1];
  } else {
    pokemonID = pokemonClassName[1];
  }
  pokemonWindowHandler(pokemonID);
  pokemonWindowStyleHandler();
}

function pokemonWindowStyleHandler() {
  gridContainer.style.filter = `opacity(0%)`;
  setTimeout(() => {
    gridContainer.style.transform = `scale(0%)`;
  }, 300);
  pokemonWindow.style.transform = `translateY(0px)`;
  searchContainer.style.transform = `scale(0%)`;
  setTimeout(() => {
    pokemonImage.style.transform = `translateY(0px)`;
    goBackButton.style.transform = `translateY(0px)`;
  }, 400);
  window.scrollTo(0, 0);
}

function mainPageStyleHandler() {
  document.querySelector("header").style.background = `transparent`;
  document.body.style.overflowY = `hidden`;
  goBackButton.style.transform = `translateY(-100px)`;
  setTimeout(() => {
    gridContainer.style.transform = `scale(100%)`;
    gridContainer.style.filter = `opacity(100%)`;
  }, 300);
  setTimeout(() => {
    searchContainer.style.transform = `scale(100%)`;
  }, 400);
  pokemonWindow.style.transform = `translateY(-1000px)`;
  pokemonImage.style.transform = `translateY(-200px)`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

window.onload = mainPageStyleHandler();
