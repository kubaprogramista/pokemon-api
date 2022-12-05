const imageContainer = document.querySelector(".image");
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
    imageContainer.innerHTML = `<img src="${image}">`;
    console.log(randomID);
} );

fetch(`https://pokeapi.co/api/v2/ability/${randomID}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(res => res.json())
.then(function(data) {
    console.log(data);
} );