const poke = document.getElementById("pokemons");
const pokeInput = document.getElementById("pokeInput");
const searchPoke = document.getElementById("searchPoke");
const btnFavorites = document.getElementById("btnFavorites");
const renderFavorites = document.getElementById("renderFavorites");

let favoritePokemons = [];
let currentPokemon = null;

function loadStorage() {
  const saveData = localStorage.getItem("pokemon");

  if (saveData) {
    favoritePokemons = JSON.parse(saveData);
  }
}

async function getPokemon() {
  const name = pokeInput.value.toLowerCase();

  if (!name) {
    poke.innerHTML = "Digite um nome";
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    const pokemon = data;
    currentPokemon = pokemon;
    const types = data.types.map((t) => t.type.name).join(" / ");

    poke.innerHTML = `
    <div class="flex justify-center flex-col">
        <h2 class=""><strong>Nome:</strong> <span class="font-mono text-indigo-600">${data.name}</span></h2>
        <img src="${data.sprites.front_default}">
        <p><strong>Tipo:</strong> <span class="font-mono text-indigo-600">${types}</span></p>
        <button class="border bg-indigo-600" onclick="addFavorites()">Favoritar</button>
    </div>
    `;
    console.log(data);
    saveStorage();
    pokeInput.value = "";
  } catch (err) {
    console.log(err);
  }
}

function showFavorites() {
  if (favoritePokemons.length === 0) {
    renderFavorites.innerHTML = `<p>Sem pokemons favoritos ainda.</p>`;
    return;
  }

  const render = favoritePokemons.map((pokemon) => {
    return `
    <div class="flex justify-center flex-col">
        <h2 class=""><strong>Nome:</strong> <span class="font-mono text-indigo-600">${pokemon.name}</span></h2>
        <p><strong>Tipo:</strong> ${pokemon.types.map((t) => t.type.name).join(" / ")}</p>
        <img src="${pokemon.sprites.front_default}">
        <button class="border bg-indigo-600" onclick="removeFavorites(${pokemon.id})">Remover</button>
    </div>`;
  });

  renderFavorites.innerHTML = render.join("");
  saveStorage();
}

function addFavorites() {
  const exists = favoritePokemons.some((p) => p.id === currentPokemon.id);

  if (!exists) {
    favoritePokemons.push(currentPokemon);
    saveStorage();
  } else {
    alert(`${currentPokemon.name} já está favoritado`);
  }

  console.log(favoritePokemons);
}

function removeFavorites(id) {
  favoritePokemons = favoritePokemons.filter((pokemon) => {
    return pokemon.id !== id;
  });

  saveStorage();
  showFavorites();
}

function saveStorage() {
  localStorage.setItem("pokemon", JSON.stringify(favoritePokemons));
}

loadStorage();
pokeInput.addEventListener("keydown", (e) => {});
searchPoke.addEventListener("click", getPokemon);
btnFavorites.addEventListener("click", showFavorites);
