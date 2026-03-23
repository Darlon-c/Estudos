const poke = document.getElementById("pokemons");
const pokeInput = document.getElementById("pokeInput");
const searchPoke = document.getElementById("searchPoke");

let favoritePokemons = [];

async function getPokemon() {
  const name = pokeInput.value.toLowerCase();

  if (!name) {
    poke.innerHTML = "Digite um nome";
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();

    const types = data.types.map((t) => t.type.name).join(" / ");

    poke.innerHTML = `
    <div class="flex justify-center flex-col">
        <h2 class=""><strong>Nome:</strong> <span class="font-mono text-indigo-600">${data.name}</span></h2>
        <img src="${data.sprites.front_default}">
        <p><strong>Tipo:</strong> <span class="font-mono text-indigo-600">${types}</span></p>
        <div>
          <p>
            Altura: ${data.height / 10}
          </p>
          <p>
            Altura: ${data.weigth / 10}
          </p>
        </div>
    </div>
    `;
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

pokeInput.addEventListener("keydown", (e) => {});
searchPoke.addEventListener("click", getPokemon);
