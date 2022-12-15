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

function searchHandler(divs) {
  const found = divs.filter((div) => {
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
  pokemonWindow.style.transform = `translateY(-1000px)`;
  pokemonImage.style.transform = `translateY(-500px)`;
  goBackButton.style.transform = `translateY(-500px)`;
  setTimeout(() => {
    gridContainer.style.transform = `scale(100%)`;
    gridContainer.style.filter = `opacity(100%)`;
    searchContainer.style.transform = `scale(100%)`;
  }, 300);
}

function pokemonWindowStyleHandler() {
  gridContainer.style.filter = `opacity(0%)`;
  pokemonWindow.style.transform = `translateY(0px)`;
  searchContainer.style.transform = `scale(0%)`;
  setTimeout(() => {
    gridContainer.style.transform = `scale(0%)`;
  }, 300);
  setTimeout(() => {
    pokemonImage.style.transform = `translateY(0px)`;
    goBackButton.style.transform = `translateY(0px)`;
  }, 700);
  window.scrollTo(0, 0);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

window.onload = mainPageStyleHandler();
window.onload = fetchAllPokemons();
