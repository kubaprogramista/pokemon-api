const contentContainer = document.querySelector(".content");
const transparentContainer = document.querySelector(".transparent");
const nameContainer = document.querySelector(".pokemon-name");
const idContainer = document.querySelector(".pokemon-id");
const imageContainer = document.querySelector(".image");
const movesList = document.querySelector(".moves-list");
const typeContainer = document.querySelector(".types");

const typeColors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	water: '#DEF3FD',
	electric: '#FCF7DE',
    ice: '#83ceca',
	ground: '#f4e7da',
	rock: '#d5d5d4',
    steel: '#606060',
	fairy: '#fceaff',
    ghost: '#431661',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

//total pokemons: 898
//total images: 809
const randomID = Math.floor(Math.random() * 809 + 1);
let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${randomID}`

fetch(`${pokemonURL}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(res => res.json())
.then(function(data) {
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
    let imageLink = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${id}.png`;
    let types = data.types;
    let height = (data.height * 0.0254).toFixed(1);
    let weight = (data.weight * 0.45359237).toFixed(1);
    let abilities = data.abilities;

    nameContainer.innerHTML = `${name}`;
    idContainer.innerHTML = `#${id}`;
    imageContainer.innerHTML = `<img src="${imageLink}">`;

    types.forEach(type => {
        let typeName = type.type.name;
        const newType = document.createElement("div");
        newType.className = `type`;
        newType.innerHTML = `${typeName}`;
        contentContainer.style.background = `${typeColors[typeName]}`;
        transparentContainer.style.background = `${typeColors[typeName]}`;
        typeContainer.appendChild(newType);
    });

    abilities.forEach(ability => {
        const newItem = document.createElement("li");
        newItem.className = `ability`;
        newItem.innerHTML = `${ability.ability.name}`;
        movesList.appendChild(newItem);
    });

    console.log(data);
} );