const API_KEY = '935a28a75dd17a0cd95830f21c7a4485';
const BASE_URL = 'https://api.themoviedb.org/3/movie';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const POPULAR_URL = `${BASE_URL}/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
const NOW_PLAYING_URL = `${BASE_URL}/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`;
const TOP_RATED_URL = `${BASE_URL}/top_rated?api_key=${API_KEY}&language=ko-KR&page=1`;
const UPCOMING_URL = `${BASE_URL}/upcoming?api_key=${API_KEY}&language=ko-KR&page=1`;

async function fetchMovies(url, containerId) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const movies = data.results;
        displayMovies(movies, containerId);
    } catch (error) {
        console.error('영화를 불러오는 중 오류가 발생했습니다:', error);
        document.getElementById(containerId).innerHTML = '<p class="loading">영화를 불러오는 데 실패했습니다.</p>';
    }
}

function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    movies.forEach(movie => {
        if (!movie.poster_path) return;

        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${IMAGE_BASE_URL + movie.poster_path}" alt="${movie.title}" class="movie-poster" loading="lazy">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-rating">⭐ ${movie.vote_average.toFixed(1)}</div>
            </div>
        `;

        container.appendChild(movieCard);
    });
}

// 각 섹션의 영화를 불러옵니다.
fetchMovies(POPULAR_URL, 'popular-grid');
fetchMovies(NOW_PLAYING_URL, 'now-playing-grid');
fetchMovies(TOP_RATED_URL, 'top-rated-grid');
fetchMovies(UPCOMING_URL, 'upcoming-grid');
