// ---------------------------------------------------
// DATOS: catálogo de videojuegos
// Cada juego tiene: título, año, género, plataforma,
// puntuación (0-10) y una reseña corta.
// ---------------------------------------------------
const games = [
{
title: "Hollow Knight",
year: 2017,
genre: "Metroidvania",
platform: "PC",
score: 9.2,
review: "Exploración exigente y atmósfera oscura muy cuidada. Difícil pero justo."
},
{
title: "Celeste",
year: 2018,
genre: "Plataformas",
platform: "Switch",
score: 9.0,
review: "Plataformas de precisión con una historia sobre salud mental sorprendentemente honesta."
},
{
title: "The Legend of Zelda: BOTW",
year: 2017,
genre: "Aventura",
platform: "Switch",
score: 9.5,
review: "Mundo abierto que premia la curiosidad en cada colina. Referencia del género."
},
{
title: "Stardew Valley",
year: 2016,
genre: "Simulación",
platform: "PC",
score: 9.1,
review: "Granja relajante con más profundidad de la que aparenta a simple vista."
},
{
title: "God of War (2018)",
year: 2018,
genre: "Acción",
platform: "PS4",
score: 9.4,
review: "Reinvención madura de la saga, con una relación padre-hijo bien escrita."
},
{
title: "Portal 2",
year: 2011,
genre: "Puzzle",
platform: "PC",
score: 9.6,
review: "Puzles de física impecables y el mejor humor negro escrito para un videojuego."
},
{
title: "Among Us",
year: 2018,
genre: "Fiesta",
platform: "Móvil",
score: 7.8,
review: "Sencillo pero brutalmente efectivo en grupo. Genera discusiones memorables."
},
{
title: "Elden Ring",
year: 2022,
genre: "RPG",
platform: "PC",
score: 9.5,
review: "Mundo abierto de FromSoftware que respeta la libertad del jugador sin perder dificultad."
},
{
title: "Minecraft",
year: 2011,
genre: "Sandbox",
platform: "Multiplataforma",
score: 9.0,
review: "Construcción sin límites que sigue reinventándose más de una década después."
},
{
title: "Mario Kart 8 Deluxe",
year: 2017,
genre: "Carreras",
platform: "Switch",
score: 9.0,
review: "El multijugador de sofá definitivo. Circuitos variados y muy bien pulidos."
}
];

// ---------------------------------------------------
// REFERENCIAS AL DOM
// ---------------------------------------------------
const grid = document.getElementById("game-grid");
const searchInput = document.getElementById("search-input");
const genreFilter = document.getElementById("genre-filter");
const platformFilter = document.getElementById("platform-filter");
const resultsCount = document.getElementById("results-count");
const emptyMessage = document.getElementById("empty-message");

// ---------------------------------------------------
// INICIALIZACIÓN: rellenar los <select> con valores
// únicos extraídos de los propios datos
// ---------------------------------------------------
function initFilters() {
const genres = [...new Set(games.map(g => g.genre))].sort();
const platforms = [...new Set(games.map(g => g.platform))].sort();

genres.forEach(genre => {
const opt = document.createElement("option");
opt.value = genre;
opt.textContent = genre;
genreFilter.appendChild(opt);
});

platforms.forEach(platform => {
const opt = document.createElement("option");
opt.value = platform;
opt.textContent = platform;
platformFilter.appendChild(opt);
});
}

// ---------------------------------------------------
// RENDER: pinta un array de juegos en la rejilla
// ---------------------------------------------------
function renderGames(list) {
grid.innerHTML = "";

list.forEach(game => {
const card = document.createElement("article");
card.className = "game-card";

card.innerHTML = `
    <div class="card-top">
    <h2 class="card-title">${game.title}</h2>
    <span class="card-year">${game.year}</span>
    </div>
    <span class="score-badge">${game.score.toFixed(1)} / 10</span>
    <div class="card-tags">
    <span class="tag">${game.genre}</span>
    <span class="tag">${game.platform}</span>
    </div>
    <p class="card-review">${game.review}</p>
`;

grid.appendChild(card);
});

resultsCount.textContent = `${list.length} juego${list.length === 1 ? "" : "s"} encontrado${list.length === 1 ? "" : "s"}`;
emptyMessage.hidden = list.length !== 0;
}

// ---------------------------------------------------
// FILTRADO: combina texto + género + plataforma
// ---------------------------------------------------
function applyFilters() {
const searchTerm = searchInput.value.trim().toLowerCase();
const genreValue = genreFilter.value;
const platformValue = platformFilter.value;

const filtered = games.filter(game => {
const matchesSearch = game.title.toLowerCase().includes(searchTerm);
const matchesGenre = genreValue === "" || game.genre === genreValue;
const matchesPlatform = platformValue === "" || game.platform === platformValue;
return matchesSearch && matchesGenre && matchesPlatform;
});

renderGames(filtered);
}

// ---------------------------------------------------
// EVENTOS
// ---------------------------------------------------
searchInput.addEventListener("input", applyFilters);
genreFilter.addEventListener("change", applyFilters);
platformFilter.addEventListener("change", applyFilters);

// ---------------------------------------------------
// ARRANQUE
// ---------------------------------------------------
initFilters();
renderGames(games);