function fetchAllPokemons() {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemons}`)
    .then((res) => res.json())
    .then((data) => {
      data.results.forEach((pokemon) => {
        fetchData(pokemon.url);
      });
    });
}

function fetchData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      renderPokemon(data);
    });
}

function searchHandler() {
  let renderedDivs = document.querySelectorAll(`#pokemon`);
  renderedDivs = [...renderedDivs];
  const found = renderedDivs.filter((div) => {
    if (div.className.includes(inputData)) {
      let divID = div.classList[0];
      let divName = div.classList[1];
      clearGridContent();
      if (+inputData >= 0) {
        fetchData(`https://pokeapi.co/api/v2/pokemon/${divID}/`);
      } else {
        fetchData(`https://pokeapi.co/api/v2/pokemon/${divName}/`);
      }
      return divName;
    }
  });
  if (found.length === 0) {
    clearGridContent();
    nothingFound.classList.add("active");
  } else {
    nothingFound.classList.remove("active");
  }
}

function clearGridContent() {
  gridContainer.innerHTML = "";
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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

window.onload = mainPageStyleHandler();
window.onload = fetchAllPokemons();
