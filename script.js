const resultArtist = document.getElementById("result-artist");
const gridContainer = resultArtist.querySelector(".grid-container");
const playlistContainer = document.getElementById("result-playlists");
const searchInput = document.getElementById("search-input");

// Função para chamar a API
function requestApi(searchTerm) {
  fetch(`http://localhost:3000/artists`)
    .then((response) => response.json())
    .then((data) => {
      // Filtra os artistas pelo termo digitado, ignorando maiúsculas/minúsculas
      const filtered = data.filter(a =>
        a.name.toLowerCase().includes(searchTerm)
      );
      displayResults(filtered);
    })
    .catch((err) => console.error(err));
}

// Função para exibir resultados dinamicamente
function displayResults(results) {
  hidePlaylists();

  // Limpa resultados anteriores
  gridContainer.innerHTML = "";

  if (results.length === 0) {
    gridContainer.innerHTML = "<p>Nenhum artista encontrado.</p>";
    resultArtist.classList.remove("hidden");
    return;
  }

  results.forEach((artist) => {
    const card = document.createElement("div");
    card.classList.add("artist-card");

    // Card imagem
    const cardImg = document.createElement("div");
    cardImg.classList.add("card-img");

    const img = document.createElement("img");
    img.classList.add("artist-img");
    img.src = artist.urlImg;
    img.alt = artist.name;

    const playDiv = document.createElement("div");
    playDiv.classList.add("play");
    playDiv.innerHTML = `<span class="fa fa-solid fa-play"></span>`;

    cardImg.appendChild(img);
    cardImg.appendChild(playDiv);

    // Card texto
    const cardText = document.createElement("div");
    cardText.classList.add("card-text");

    const name = document.createElement("span");
    name.classList.add("artist-name");
    name.innerText = artist.name; // sem grifar letras

    const categorie = document.createElement("span");
    categorie.classList.add("artist-categorie");
    categorie.innerText = "Artista";

    cardText.appendChild(name);
    cardText.appendChild(categorie);

    // Monta o card completo
    card.appendChild(cardImg);
    card.appendChild(cardText);

    // Adiciona ao grid
    gridContainer.appendChild(card);
  });

  resultArtist.classList.remove("hidden");
}

// Função para esconder playlists quando há busca
function hidePlaylists() {
  playlistContainer.classList.add("hidden");
}

// Evento de input
searchInput.addEventListener("input", function () {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm === "") {
    resultArtist.classList.add("hidden");
    playlistContainer.classList.remove("hidden");
    return;
  }
  requestApi(searchTerm);
});
