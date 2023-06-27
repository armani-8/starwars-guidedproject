let planetH1;
let climateU1;
let terrainU1;
let populationU1;
let filmsUl;
let charactersUl;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

addEventListener('DOMContentLoaded', () => {
  planetH1 = document.querySelector('h1#planet');
  climateU1 = document.querySelector('span#climate');
  terrainU1 = document.querySelector('span#terrain');
  populationU1 = document.querySelector('span#population');
  charactersUl = document.querySelector('#characters>ul');
  filmsUl = document.querySelector('#films>ul');

  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id)
    planet.characters = await fetchCharacters(id)
    planet.films = await fetchFilms(id)
  }
  catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);
}

async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/planets/${id}`;
  return await fetch(planetUrl)
    .then(res => res.json())
}

async function fetchCharacters([id]) {
  const url = `${baseUrl}/planets/${id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

async function fetchFilms(id) {
  const url = `${baseUrl}/planets/${id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

const renderPlanet = planet => {
  document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say the film title
  planetH1.textContent = planet?.name;
  climateU1.textContent = planet?.climate;
  terrainU1.textContent = planet?.terrain;
  populationU1.textContent = planet?.population;
  charactersUl.textContent = planet?.characters;
  filmsUl.textContent = planet?.films;

  const characterLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  charactersUl.innerHTML = characterLis.join("");

  const filmLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsUl.innerHTML = filmLis.join("");
}
