const contentContainer = document.querySelector(".content");
const transparentContainer = document.querySelector(".transparent");
const nameContainer = document.querySelector(".pokemon-name");
const idContainer = document.querySelector(".pokemon-id");
const imageContainer = document.querySelector(".image");
const movesList = document.querySelector(".moves-list");
const typeContainer = document.querySelector(".types");
const weightContainer = document.querySelector(".weight");
const heightContainer = document.querySelector(".height");

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
    if(id == 662){
        id = "662r";
    }
    if(id == 740){
        id = "740le";
    }
    let imageLink = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${id}.png`;
    let types = data.types;
    let weight = (data.weight * 0.45359237).toFixed(1);
    let height = (data.height * 0.0254).toFixed(1);
    let abilities = data.abilities;

    nameContainer.innerHTML = `${name}`;
    idContainer.innerHTML = `#${id}`;
    imageContainer.innerHTML = `<img src="${imageLink}">`;

    weightContainer.innerHTML = `${weight}`;
    heightContainer.innerHTML = `${height}`;

    let count = 0;
    let typeColor2 = "";

    types.forEach(type => {
        count++;
        let typeName = type.type.name;
        const newType = document.createElement("div");
        newType.className = `type`;
        newType.style.background = `${typeColors[typeName]}`;
        newType.innerHTML = `${typeName}`;
        if(count == 2){
            contentContainer.style.background = `linear-gradient(90deg, ${typeColors[typeName]}, ${typeColor2})`;
            transparentContainer.style.background = `linear-gradient(90deg, ${typeColors[typeName]}, ${typeColor2})`;
        } else {
            contentContainer.style.background = `${typeColors[typeName]}`;
            transparentContainer.style.background = `${typeColors[typeName]}`;
        }
        typeColor2 = typeColors[typeName];
        typeContainer.appendChild(newType);
    });

    abilities.forEach(ability => {
        const newItem = document.createElement("li");
        newItem.className = `ability`;
        newItem.innerHTML = `${ability.ability.name}`;
        movesList.appendChild(newItem);
    });
} );