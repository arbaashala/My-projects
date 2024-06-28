document.addEventListener('DOMContentLoaded', () => {
    const movieForm = document.getElementById('movie-form');
    const movieList = document.getElementById('movie-list');
    const searchInput = document.getElementById('search');
    const switchButton = document.getElementById('switch-button');
    const movieSection = document.getElementById('movie-section');
    const userSection = document.getElementById('user-section');
    const userList = document.getElementById('user-list');

    const getMovies = () => JSON.parse(localStorage.getItem('movies')) || [];

    const saveMovies = (movies) => localStorage.setItem('movies', JSON.stringify(movies));

    const renderMovies = (movies) => {
        movieList.innerHTML = movies.map(({ title, genre, actor }) => `
            <li>
                <span>${title} - ${genre} - ${actor}</span>
                <button class="delete-btn">Fshi</button>
            </li>
        `).join('');
        document.querySelectorAll('.delete-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => deleteMovie(index));
        });
    };

    const addMovie = (title, genre, actor) => {
        const movies = [...getMovies(), { title, genre, actor }];
        saveMovies(movies);
        renderMovies(movies);
    };

    const deleteMovie = (index) => {
        const movies = getMovies().filter((_, i) => i !== index);
        saveMovies(movies);
        renderMovies(movies);
    };

    const searchMovies = (query) => {
        const movies = getMovies().filter(({ title, genre, actor }) => 
            [title, genre, actor].some(field => field.toLowerCase().includes(query.toLowerCase()))
        );
        renderMovies(movies);
    };

    movieForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addMovie(
            document.getElementById('title').value,
            document.getElementById('genre').value,
            document.getElementById('actor').value
        );
        movieForm.reset();
    });

    searchInput.addEventListener('input', (e) => searchMovies(e.target.value));

    renderMovies(getMovies());

    const fetchUsers = () => {
        fetch("https://dummyjson.com/users?limit=20")
            .then((response) => response.json())
            .then((data) => {
                const users = data.users;
                userList.innerHTML = users.map(user => `
                    <li>${user.firstName} ${user.lastName} - ${user.email}</li>
                `).join('');
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    };

    switchButton.addEventListener('click', () => {
        if (movieSection.classList.contains('hidden')) {
            movieSection.classList.remove('hidden');
            userSection.classList.add('hidden');
            switchButton.textContent = 'Switch to Users';
        } else {
            movieSection.classList.add('hidden');
            userSection.classList.remove('hidden');
            switchButton.textContent = 'Switch to Movies';
            fetchUsers();
        }
    });

    // Initially show movies section
    movieSection.classList.remove('hidden');
    userSection.classList.add('hidden');
});
