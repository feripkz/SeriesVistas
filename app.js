const movies = [
    {
        title: 'Breaking Bad',
        description: 'Un profesor de química se convierte en un capo de la metanfetamina.',
        rating: 5,
        image: 'images/breaking_bad.jpg'
    },
    {
        title: 'El Señor de los Anillos',
        description: 'Un hobbit lleva el Anillo Único al Monte del Destino para destruirlo.',
        rating: 4,
        image: 'images/lord_of_the_rings.jpg'
    },
    {
        title: 'Juego de Tronos',
        description: 'Nobles familias luchan por el Trono de Hierro en Westeros.',
        rating: 3,
        image: 'images/game_of_thrones.jpg'
    },
    {
        title: 'Aterrizaje de emergencia en tu corazón',
        description: 'Nobles familias luchan por el Trono de Hierro en Westeros.',
        rating: 3,
        image: 'images/aterrizaje_de_emergencia_en_tu_corazon.jpg'
    },
    {
        title: 'Naruto',
        description: 'Mirenme soy un moco',
        rating: 5,
        image: 'images/Naruto.jpg'
    },
    {
        title: 'Naruto Shippuden',
        description: 'Ya grande naruto avanza en su jutso evangelizador',
        rating: 5,
        image: 'images/Naruto_Shippuden.jpg'
    },
    {
        title: 'Death Note',
        description: 'Un wn encuentra una libreta y se cree el dios del nuevo mundo.',
        rating: 3,
        image: 'images/Death_Note.jpg'
    },

    // Agrega más series o películas aquí
];

// Cargar configuración de modo oscuro al iniciar la página
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

// Evento para cambiar entre modo oscuro y claro
document.getElementById('mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Guardar la preferencia del modo oscuro en localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
});

function displayMovies(filteredMovies = movies) {
    const moviesList = document.getElementById('movies-list');
    moviesList.innerHTML = '';

    filteredMovies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.description}</p>
            <div class="rating">${getStars(movie.rating)}</div>
        `;
        moviesList.appendChild(movieItem);
    });

    const loading = document.getElementById('loading');
    loading.classList.remove('hidden');

    setTimeout(() => {
        loading.classList.add('hidden');
        animateMovies();
    }, 500);
}

function getStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        let starClass = i <= rating ? 'fas fa-star' : 'far fa-star';
        stars += `<i class="${starClass}"></i>`;
    }
    return stars;
}

function animateMovies() {
    const movieItems = document.querySelectorAll('.movie-item');
    movieItems.forEach((item, index) => {
        item.style.transition = `transform 0.5s ${index * 0.1}s, opacity 0.5s ${index * 0.1}s`;
        item.style.transform = 'translateY(0)';
        item.style.opacity = '1';
    });
}

document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const ratingFilter = document.getElementById('rating-filter').value;
    const filteredMovies = movies.filter(movie => {
        const matchesTitle = movie.title.toLowerCase().includes(query);
        const matchesRating = ratingFilter === 'all' || movie.rating.toString() === ratingFilter;
        return matchesTitle && matchesRating;
    });

    displayMovies(filteredMovies);
});

document.getElementById('rating-filter').addEventListener('change', () => {
    document.getElementById('search-bar').value = '';
    displayMovies();
});

displayMovies();
