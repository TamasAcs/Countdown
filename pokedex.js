const poke_container = document.getElementById("poke_container");
const url = "https://pokeapi.co/api/v2/pokemon/";
const pokemons_number = 150;
const search = document.getElementById('search');
const form = document.getElementById("form");
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemons_number; i++){
        await getPokemon(i);
    }
    console.log("fetchPokemons")
}


const getPokemon = async id => {
    const res = await fetch(`${url}${id}`);
    const pokemon = await res.json();
    console.log(pokemon);
    createPokemonCard(pokemon);
    
}


fetchPokemons();

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");
    const poke_types = pokemon.types.map(el => el.type.name);
    const type = main_types.find(type => poke_types.indexOf(type)>-1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);


    const poke_stat = pokemon.stats.map(el => el.stat.name);
    const stats = poke_stat.slice(0, 3);
    const base_value = pokemon.stats.map(el => el.base_stat);
    const base_stat = base_value.slice(0, 3);
    const stat = stats.map(stat => {
        return `<li class="names">${stat}</li>`
    }).join("");
    const base = base_stat.map(base => {
        return `<li class="base">${base}</li>`
    }).join("");


    // This changes background color of the card compairing to type color
    // const color = colors[type];

    // pokemonEl.style.backgroundColor = color;
    const pokeInnerHTML = `
    <div class="img-container">
    <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="${name}"/>
    </div>
    <div class="info">
<span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
<h3 class="name">${name}</h3>
<small class="type"><span>${type}</span></small>
    </div>
    <div class="stats">
    <h2>Stats</h2>
    
    <div class="flex">
    <ul>${stat} </ul>
    <ul>${base} </ul>
    </div>
    </div>
    `;

    pokemonEl.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokemonEl);
}



form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getPokemon(searchTerm);
        search.value = '';
    }
})