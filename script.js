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
const numberOfPokemons = 100;

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemons}`)
    .then(res => res.json())
    .then(data => {
        data.results.forEach(pokemon => {
            fetchData(pokemon.url)
        });
    })

function fetchData(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        dataHandler(data)
    })
}

function dataHandler(data) {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let name = capitalizeFirstLetter(data.species.name);
    let id = data.id;
    if(id < 100) {
        id = `0${id}`
    } 
    if(id < 10){
        id = `0${id}`
    }
    if(id == 662){
        id = "662r";
    }
    if(id == 740){
        id = "740le";
    }
    let imageLink = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${id}.png`;
    let types = data.types;
    let typeName = types[0].type.name;
    let typeColor = typeColors[typeName]; 
    
    const newPokemon = document.createElement("div");
    newPokemon.className = `pokemon ${data.id}`;
    newPokemon.innerHTML = `
    <p>${data.id}</p>
    <p>${name}</p>
    <img src="${imageLink}" alt="">
    `
    newPokemon.style.background = `${typeColor}`;
    mainContainer.appendChild(newPokemon);
}