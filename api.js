const nameContainer = document.querySelector(".pokemon-name");
const idContainer = document.querySelector(".pokemon-id");
const imageContainer = document.querySelector(".image");
const movesList = document.querySelector(".moves-list");
const typeContainer = document.querySelector(".type");

//total pokemons: 898
const randomID = Math.floor(Math.random() * 898);
let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${randomID}`

fetch(`${pokemonURL}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(res => res.json())
.then(function(data) {
    let image = data.sprites.front_default;
    let name = data.species.name;
    let id = data.id;
    let types = data.types;
    let height = (data.height * 0.0254).toFixed(1);
    let weight = (data.weight * 0.45359237).toFixed(1);
    let abilities = data.abilities;

    nameContainer.innerHTML = `${name}`;
    idContainer.innerHTML = `#${id}`;
    imageContainer.innerHTML = `<img src="${image}">`;

    types.forEach(type => {
        const newType = document.createElement("div");
        newType.className = `type`;
        newType.innerHTML = `${type.type.name}`;
        typeContainer.appendChild(newType);
    });

    abilities.forEach(ability => {
        const newItem = document.createElement("li");
        newItem.className = `ability`;
        newItem.innerHTML = `${ability.ability.name}`;
        movesList.appendChild(newItem);
    });
    console.log(types);
    console.log(data);
} );