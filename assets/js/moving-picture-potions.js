// Have the keys as variables just in case we need to switch keys because we've used one too much
const movieAPIKey = "42a3df40e8msh40b4f189b13b666p169e06jsnd088b0a8350d";

// We probably won't be changing the host, but this will help avoid typos
const movieAPIHost = "imdb8.p.rapidapi.com";

// again, just trying to prevent typos
const movieAPISearch = "https://imdb8.p.rapidapi.com/title/";

const numMoviesToDisplay = 5;

var movieGenres = []; // make this global so we only have to fill it once
var moviesFound = []; // make this global to help use fewer API calls
var moviesToDisplay = [];
var movieDetails = []; // { title: "title", summary: "summary"}

var submitButtonEl = document.querySelector("#submit-button");
var genreDropDownEl = document.querySelector("#genre-list");

var fillGenreDropDown = function(theMovieGenres)
{
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

// choose numMoviesToDisplay movies from the returns list
var loadMoviesToDisplay = function()
{
    moviesToDisplay = [];
    // eventually have this chose numMoviesToDisplay random movies. For now, just choose the first numMoviesToDisplay.
    for (var i = 0; i < numMoviesToDisplay; i++)
    {
        // the info in moviesFound is in the format /title/tt3554046/ - we just need the tt with the numbers
        var movieInfo = moviesFound[i];
        var n = movieInfo.indexOf("tt");
        var movieID = movieInfo.slice(n, movieInfo.length - 1); // subtract 1 - we don't want that final slash
        moviesToDisplay.push(movieID);
    }
}

// this function is used while testing the code
// it loads the movies from localStorage so that we aren't using API calls up
// while getting the UI to work.
var loadMoviesFound = function()
{
    moviesFound = JSON.parse(localStorage.getItem("moviesFound"));
    if (!moviesFound)
    {
        moviesFound = [];
    }
    loadMoviesToDisplay();
}

var getMovieData = async function(movieIDt)
{
    for (var i = 0; i < numMoviesToDisplay; i++)
    {
        movieID = moviesToDisplay[i];

        // "https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=tt0944947&currentCountry=US"    
        var fetchStr = movieAPISearch + "get-overview-details?tconst=" + movieID + "&currentCountry=US";
        var response = await fetch(fetchStr, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": movieAPIKey,
                "x-rapidapi-host": movieAPIHost 
            }
        });

        var tmd = await response.json();
        var theMovieDetails = { title: tmd.title.title, summary: tmd.plotOutline.text };
        movieDetails.push(theMovieDetails);
        console.log(movieDetails);
    }        
    console.log(movieDetails);
}

var getMoviesInGenre = async function(genreChoice)
{
    var fetchStr = movieAPISearch + "get-popular-movies-by-genre?genre=%2Fchart%2Fpopular%2Fgenre%2F";
    var n = genreChoice.lastIndexOf("/");
    fetchStr += genreChoice.slice(n+1, genreChoice.length);
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
        // use the info from response to fill the moviesFound array
        moviesFound = response;
        loadMoviesToDisplay(); // decide which movies from the returned list in moviesFound will be displayed
        getMovieData();
    })
    .catch(err => {
        console.error(err);
    });

}

var submitClickHandler = function(event)
{
    // get the users choice from the genre drop down
    var genreChoice = genreDropDownEl.value;
    getMoviesInGenre(genreChoice);
}

submitButtonEl.addEventListener("click", submitClickHandler);


getMovieGenres();

