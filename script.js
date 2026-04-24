const API_KEY = "f05e1319fafc15a9a368c8b1c0c85b74"; 

async function searchMovies() {
  const query = document.getElementById("searchInput").value;
  if (!query) return;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );
    const data = await res.json();
    displayMovies(data.results);
  } catch (err) {
    console.error(err);
  }
}

function displayMovies(movies) {
  const container = document.getElementById("moviesContainer");
  container.innerHTML = "";

  if (movies.length === 0) {
    container.innerHTML = "<p>No movies found. Try another search!</p>";
    return;
  }

  movies.forEach(movie => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    movieDiv.innerHTML = `
      ${movie.poster_path 
        ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">`
        : `<div style="height:300px; background:#ccc; display:flex; align-items:center; justify-content:center; border-radius:8px;">No Image</div>`}
      <h2>${movie.title}</h2>
      <p>Release: ${movie.release_date || "N/A"}</p>
      <p>⭐ ${movie.vote_average}</p>
    `;
    container.appendChild(movieDiv);
  });
}
