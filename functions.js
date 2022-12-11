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
