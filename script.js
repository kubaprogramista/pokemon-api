const gridContainer = document.querySelector(".grid-content");
const pokemonWindow = document.querySelector(".pokemon-window");
const pokemonImage = document.querySelector(".image");
const goBackButton = document.querySelector(".go-back-button");
const searchContainer = document.querySelector(".search-container");
const searchBarInput = document.querySelector(".search");

let currentData = [];
let inputData = "";
let count = 0;
// `https://pokeapi.co/api/v2/pokemon/2/`

//total pokemons: 898
//total images: 809

searchBarInput.addEventListener("input", (e) => {
  inputData = e.target.value;

  if (+inputData >= 0) {
    //if input is number
    const renderedDivs = document.querySelectorAll(`#pokemon`);
    renderedDivs.forEach((div) => {
      let renderedPokemonName = div.classList[0];
      if (renderedPokemonName.includes(inputData)) {
        clearGridContent();
        fetchData(`https://pokeapi.co/api/v2/pokemon/${renderedPokemonName}/`);
      } else {
        clearGridContent();
        gridContainer.innerHTML = `Nothing found...`;
      }
    });

    let newURL = `https://pokeapi.co/api/v2/pokemon/${inputData}/`;
    clearGridContent();
    if (newURL != `https://pokeapi.co/api/v2/pokemon//`) {
      currentData = [];
      fetchData(newURL);
    } else {
      renderedPokemons = [];
      fetchAllPokemons();
    }
  } else {
    const renderedDivs = document.querySelectorAll(`#pokemon`);
    renderedDivs.forEach((div) => {
      let renderedPokemonName = div.classList[1];
      if (renderedPokemonName.includes(inputData.toLowerCase())) {
        clearGridContent();
        fetchData(`https://pokeapi.co/api/v2/pokemon/${renderedPokemonName}/`);
      } else {
        clearGridContent();
        gridContainer.innerHTML = `Nothing found...`;
      }
    });
  }
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
let i = 0;
function fetchData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      currentData.push(data);
      // currentDataHandler(inputData);
      renderPokemon(data, inputData);
      i++;
    });
}

function clearGridContent() {
  gridContainer.innerHTML = "";
}

// function currentDataHandler(id) {
//   clearGridContent();
//   currentData.forEach((data) => {
//     renderPokemon(data, id);
//   });
// }

let renderedPokemons = [];

function renderPokemon(data, inputID) {
  let name = capitalizeFirstLetter(data.species.name);
  let id = 0;

  if (!inputID) {
    id = data.id;
  } else if (+inputID >= 0) {
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
  renderedPokemons.push(newPokemon);

  // console.log(renderedPokemons);
  gridContainer.appendChild(newPokemon);
}

goBackButton.addEventListener("click", () => {
  mainPageStyleHandler();
});

window.onload = fetchAllPokemons();
