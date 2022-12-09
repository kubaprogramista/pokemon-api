const gridContainer = document.querySelector(".grid-content");
const pokemonWindow = document.querySelector(".pokemon-window");
const pokemonImage = document.querySelector(".image");
const goBackButton = document.querySelector(".go-back-button");
const searchContainer = document.querySelector(".search-container");

// const typeColors = {
//   normal: "#A8A77A",
//   fire: "#EE8130",
//   water: "#6390F0",
//   electric: "#F7D02C",
//   grass: "#7AC74C",
//   ice: "#96D9D6",
//   fighting: "#C22E28",
//   poison: "#A33EA1",
//   ground: "#E2BF65",
//   flying: "#A98FF3",
//   psychic: "#F95587",
//   bug: "#A6B91A",
//   rock: "#B6A136",
//   ghost: "#735797",
//   dragon: "#6F35FC",
//   dark: "#705746",
//   steel: "#B7B7CE",
//   fairy: "#D685AD",
// };

//total pokemons: 898
//total images: 809
const numberOfPokemons = 100;

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemons}`)
  .then((res) => res.json())
  .then((data) => {
    data.results.forEach((pokemon) => {
      fetchData(pokemon.url);
    });
  });

function fetchData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      dataHandler(data);
    });
}

function dataHandler(data) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  let name = capitalizeFirstLetter(data.species.name);
  let id = data.id;
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
    document.querySelector("header").style.background = `${typeColor}`;
  });
  newPokemon.style.background = `${typeColor}`;
  gridContainer.appendChild(newPokemon);
}

goBackButton.addEventListener("click", () => {
  mainPageStyleHandler();
});

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

window.onload = mainPageStyleHandler();
