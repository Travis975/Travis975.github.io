
// APIs
const popularMoviesUrl = "https://api.themoviedb.org/3/movie/popular?api_key=61a816b2f5712357ac7d5f33083e1a71";
const topRatedMoviesUrl = "https://api.themoviedb.org/3/movie/top_rated?api_key=61a816b2f5712357ac7d5f33083e1a71";
const upcomingMoviesUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=61a816b2f5712357ac7d5f33083e1a71";

// HTML Elements and Variables
const popularFilms = document.getElementById("pop-films");
const topFilms = document.getElementById("top-films");
const upcomingFilms = document.getElementById("up-films");
let divContainer;

// Put the urls in a array to loop through
const categoryURLs = [popularMoviesUrl, topRatedMoviesUrl, upcomingMoviesUrl];

// A function to check the category of movies to set the divContainer too
function checkMovieCategory(url) {
    if (url === popularMoviesUrl) {
        divContainer = popularFilms;
    }
    else if (url === topRatedMoviesUrl) {
        divContainer = topFilms;
    }
    else {
        divContainer = upcomingFilms;
    }
}
// The function the make the cards based off the url
async function fetchMovieDataMakeCards(url) {
    try {
        // Fetch data from the API
        const movieData = await fetch(url);

        // Parse JSON response and set variable
        const moviesDataJSON = await movieData.json();

        // Check to see what url then set the divContainer accordingly then make the movie cards
        checkMovieCategory(url);
        moviesDataJSON.results.forEach((movie) => 
            divContainer.innerHTML += 
                `
                <div class="card" style="width: 18rem;">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top">
                    <div class="card-body">
                        <p class="card-text font-bold">${movie.original_title}</p>
                        <p class="card-text"> Release Date: ${movie.release_date}</p>
                        <p class="card-text"> Average Vote: ${movie.vote_average}</p>
                        <p class="card-text"> Number of Votes: ${movie.vote_count}</p>
                    </div>
                </div>
                `
        );
    } 
    catch (error) {
        console.log('Error fetching data:', error);
    }
}

// Function to create the list of movies for each category
async function displayAllMovies() {
    try {
        for(url of categoryURLs){
            fetchMovieDataMakeCards(url);
        }
    }
    catch (error) {
        console.log('Error displaying movies: ', error);
    }
}

// Call the function to fetch and display data when the page loads
displayAllMovies();