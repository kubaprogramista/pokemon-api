const imageContainer = document.querySelector(".image");

fetch('https://pokeapi.co/api/v2/pokemon/ditto', {
    method: 'GET',
    headers: {
        
        'Content-Type': 'application/json'
    }
})
.then(res => res.json())
.then(function(data) {
    let image = data.sprites.front_default;
    imageContainer.innerHTML = `<img src="${image}">`;
} );