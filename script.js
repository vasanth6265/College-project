// Updated game data with ratings
const games = [
  { title: "Cyberpunk 2077", genre: "Action", image: "images/cyberpunk.jpg", price: 2999, rating: 4.5, link: "buy-cyberpunk2077.html" },
  { title: "Elden Ring", genre: "RPG", image: "images/eldenring.jpg", price: 3599, rating: 5, link: "buy-eldenring.html" },
  { title: "The Sims 4", genre: "Simulation", image: "images/thesims4.jpg", price: 0, rating: 4, link: "buy-thesims4.html" },
  { title: "Red Dead Redemption 2", genre: "Action", image: "images/rdr2.jpg", price: 4999, rating: 5, link: "buy-rdr2.html" },
  { title: "The Last of Us Part I", genre: "Action", image: "images/tlou.jpg", price: 3999, rating: 4.8, link: "buy-tlou.html" },
  { title: "The Last of Us Part II", genre: "Action", image: "images/tlou2.jpg", price: 3299, rating: 4.7, link: "buy-tlou2.html" },
  { title: "Marvel's Spider-Man Remastered", genre: "Action", image: "images/spiderman.jpg", price: 3999, rating: 4.9, link: "buy-spiderman.html" },
  { title: "Marvel's Spider-Man: Miles Morales", genre: "Action", image: "images/spidermanmiles.jpg", price: 3299, rating: 4.6, link: "buy-spidermanmiles.html" },
  { title: "Marvel's Spider-Man 2", genre: "Action", image: "images/spiderman2.jpg", price: 3999, rating: 4.7, link: "buy-spiderman2.html" },
  { title: "Forza Horizon 5", genre: "Racing", image: "images/fh5.jpg", price: 3499, rating: 4.8, link: "buy-fh5.html" }
];

const gamesPerPage = 16;
let currentPage = 1;

function formatPrice(price) {
  return price === 0 ? "Free" : `₹ ${price.toLocaleString()}`;
}

function displayGames(filteredGames) {
  const container = document.getElementById("gameList");
  const pagination = document.getElementById("pagination");
  container.innerHTML = "";
  pagination.innerHTML = "";

  const start = (currentPage - 1) * gamesPerPage;
  const end = start + gamesPerPage;
  const paginatedGames = filteredGames.slice(start, end);

  paginatedGames.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML = `
      <img src="${game.image}" alt="${game.title}">
      <h3>${game.title}</h3>
      <p>${game.genre}</p>
      <p>${formatPrice(game.price)}</p>
      <p>Ratings: ${game.rating}</p>
    `;
    card.addEventListener("click", () => {
      card.classList.add("clicked");
      setTimeout(() => {
      window.location.href = game.link;
    },150);
    });
    container.appendChild(card);
  });

  const pageCount = Math.ceil(filteredGames.length / gamesPerPage);
  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      displayGames(filteredGames);
    });
    pagination.appendChild(btn);
  }
}

function searchGames(query) {
  const filtered = games.filter(g => g.title.toLowerCase().includes(query.toLowerCase()));
  currentPage = 1;
  displayGames(filtered);
}

function sortGames(gamesList, method) {
  switch (method) {
    case "price-asc": return gamesList.slice().sort((a, b) => a.price - b.price);
    case "price-desc": return gamesList.slice().sort((a, b) => b.price - a.price);
    case "title-asc": return gamesList.slice().sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc": return gamesList.slice().sort((a, b) => b.title.localeCompare(a.title));
    default: return gamesList;
  }
}

function filterByGenre(genre) {
  return genre === "all" ? games : games.filter(g => g.genre.toLowerCase() === genre);
}

window.onload = () => {
  let filteredGames = games;
  displayGames(filteredGames);

 const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const sortSelect = document.getElementById("sortSelect");

  // Desktop Enter key
  if (searchInput) {
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        searchGames(searchInput.value);
        searchInput.blur(); // Remove focus to prevent form submission
      }
  });

  searchInput.addEventListener("change", () => {
    searchGames(searchInput.value);
    searchInput.blur(); // Remove focus to prevent form submission
  });
}
  // Mobile Search button
  if (searchButton) {
    searchButton.addEventListener("click", () => {
      searchGames(searchInput.value);
      searchInput.blur(); // Remove focus to prevent form submission
    });
  }
  // Sort games
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      const method = e.target.value;
      filteredGames = sortGames(filteredGames, method);
      displayGames(filteredGames);
    });
  }

  document.getElementById("sortSelect").addEventListener("change", (e) => {
    const method = e.target.value;
    filteredGames = sortGames(filteredGames, method);
    displayGames(filteredGames);
  });

  document.querySelectorAll(".filter-button").forEach(button => {
    button.addEventListener("click", function (e) {
      document.querySelectorAll(".filter-button").forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      filteredGames = filterByGenre(this.dataset.filter);
      currentPage = 1;
      displayGames(filteredGames);
    });
  });

  updateCartCount();
  updateAuthLink();
};

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cartCount").textContent = cart.length;
}

function updateAuthLink() {
  const authLink = document.getElementById("authLink");
  const user = localStorage.getItem("user");
  authLink.textContent = user ? "Logout" : "Login";
  authLink.addEventListener("click", (e) => {
    if (user) {
      e.preventDefault();
      localStorage.removeItem("user");
      location.reload();
    }
  });
}