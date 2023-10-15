const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonImage = document.querySelector(".pokemon-image");

const form = document.querySelector(".form");
const input = document.querySelector(".input-search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
const shiny = document.querySelector(".btn-shiny");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (apiResponse.status === 200) {
    const data = await apiResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";
  pokemonNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
    input.value = "";
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Not Found";
    pokemonNumber.innerHTML = "";
    input.value = "";
  }
};

const renderPokemonShiny = async (pokemon) => {
  const data = await fetchPokemon(pokemon)
    if(shiny.classList.value == 'btn-shiny selecionado'){
        shiny.classList.remove('selecionado')
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    } else if (shiny.classList.value !== 'btn-shiny selecionado') {
        shiny.classList.add('selecionado')
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny']
    }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    shiny.classList.remove('selecionado')
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  shiny.classList.remove('selecionado')
  renderPokemon(searchPokemon);
});

shiny.addEventListener("click", () => {
  renderPokemonShiny(searchPokemon);
});

renderPokemon(searchPokemon);