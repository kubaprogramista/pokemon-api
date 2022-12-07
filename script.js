const mainContainer = document.querySelector("main");

const typeColors = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

//total pokemons: 898
//total images: 809
let currentID = 1;
const numberOfPokemons = 20;

let promises = [];

for(let currentID = 1; currentID <= numberOfPokemons; currentID++){
    promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${currentID}`))
}
Promise.all(promises)
.then(function handleData(data) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${currentID}`) // should be returned 1 time
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(data => {
        console.log(data);
        dataHandler(data);
      })
  })
  .catch(function handleError(error) {
    console.log("Error " + error);
  });

    // fetch(`https://pokeapi.co/api/v2/pokemon/${currentID}`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    // .then(res => res.json())
    // .then(data => {
    //     console.log(data);
    //     dataHandler(data);
    // })


function dataHandler(data) {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    let name = capitalizeFirstLetter(data.species.name);
    const newPokemon = document.createElement("div");
    newPokemon.className = `pokemon ${data.id}`;
    newPokemon.innerHTML = `
    <p>${name}</p>
    <p>${data.id}</p>
    `
    mainContainer.appendChild(newPokemon);
}