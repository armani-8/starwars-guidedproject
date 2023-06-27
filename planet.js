let planetH1;
let charactersUl;
let filmsUl;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

addEventListener('DOMContentLoaded', () => {
  planetH1 = document.querySelector('h1#title');
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
    planet.characters = await fetchCharacters(planet)
    planet.films = await fetchFilm(planet)
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

async function fetchCharacters([planet]) {
  const url = `${baseUrl}/planets/${planet?.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

async function fetchFilms(planet) {
  const url = `${baseUrl}/planets/${[planet]?.id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

const renderPlanet = planet => {
  document.title = `SWAPI - ${homeworld?.id}`;  // Just to make the browser tab say the film title
  titleH1.textContent = homeworld?.id;
  charactersU1.textContent = homeworld?.characters;
  filmsU1.textContent = homeworld?.films;

  const characterLis = homeworld?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  charactersUl.innerHTML = characterLis.join("");

  const filmLis = homeworld?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.name}</li>`)
  filmsUl.innerHTML = filmLis.join("");
}
