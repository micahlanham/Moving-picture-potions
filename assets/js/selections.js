// Have the keys as variables just in case we need to switch keys because we've used one too much
const movieAPIKey = "42a3df40e8msh40b4f189b13b666p169e06jsnd088b0a8350d";

// We probably won't be changing the host, but this will help avoid typos
const movieAPIHost = "imdb8.p.rapidapi.com";

// again, just trying to prevent typos
const movieAPISearch = "https://imdb8.p.rapidapi.com/title/";

var movieGenres = []; // make this global so we only have to fill it once

var fillGenreDropDown = function(theMovieGenres)
{
    var genreDropDownEl = document.querySelector("#genre-list");
    genreDropDownEl.name = "Genres";
 
    for (var i = 0; i < theMovieGenres.length; i++)
    {
        var optionEl = document.createElement("option");
        optionEl.value = theMovieGenres[i].endpoint;
        optionEl.text = theMovieGenres[i].description;
        genreDropDownEl.appendChild(optionEl);
    }
}

var getMovieGenres = function()
{
    movieGenres = [];
    // to prevent too many api calls, we are hardcoding the genre list based on
    // the actual values returned from the code below during testing
    // CHANGE THIS BACK TO USING DYNAMIC CODE BEFORE WE SUBMIT OUR PROJECT!!!
    movieGenres = [
        {description: "Action", endpoint: "/chart/popular/genre/action"},
        {description: "Adventure", endpoint: "/chart/popular/genre/adventure"},
        {description: "Animation", endpoint: "/chart/popular/genre/animation"},
        {description: "Biography", endpoint: "/chart/popular/genre/biography"},
        {description: "Comedy", endpoint: "/chart/popular/genre/comedy"},
        {description: "Crime", endpoint: "/chart/popular/genre/crime"},
        {description: "Documentary", endpoint: "/chart/popular/genre/documentary"},
        {description: "Drama", endpoint: "/chart/popular/genre/drama"},
        {description: "Family", endpoint: "/chart/popular/genre/family"},
        {description: "Fantasy", endpoint: "/chart/popular/genre/fantasy"},
        {description: "Film-Noir", endpoint: "/chart/popular/genre/film_noir"},
        {description: "History", endpoint: "/chart/popular/genre/history"},
        {description: "Horror", endpoint: "/chart/popular/genre/horror"},
        {description: "Music", endpoint: "/chart/popular/genre/music"},
        {description: "Musical", endpoint: "/chart/popular/genre/musical"},
        {description: "Mystery", endpoint: "/chart/popular/genre/mystery"},
        {description: "Romance", endpoint: "/chart/popular/genre/romance"},
        {description: "Sci-Fi", endpoint: "/chart/popular/genre/sci_fi"},
        {description: "Sport", endpoint: "/chart/popular/genre/sport"},
        {description: "Thriller", endpoint: "/chart/popular/genre/thriller"},
        {description: "War", endpoint: "/chart/popular/genre/war"},
        {description: "Western", endpoint: "/chart/popular/genre/western"}
    ];
    fillGenreDropDown(movieGenres);


/* this code works - CHANGE BACK TO USING THIS CODE BEFORE SUBMITTING OUR PROJECT
    var fetchStr = movieAPISearch + "list-popular-genres";
    fetch(fetchStr, {
    	"method": "GET",
	    "headers": {
	    	"x-rapidapi-key": movieAPIKey,
	    	"x-rapidapi-host": movieAPIHost 
	    }
    })
    .then(response => {
	    return response.json();
     })
    .then(response => {
        movieGenres = response.genres;
        fillGenreDropDown(movieGenres);
    })
*/    
}

getMovieGenres();