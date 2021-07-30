// Have the keys as variables just in case we need to switch keys because we've used one too much
const movieAPIKey = "42a3df40e8msh40b4f189b13b666p169e06jsnd088b0a8350d";

// We probably won't be changing the host, but this will help avoid typos
const movieAPIHost = "imdb8.p.rapidapi.com";

// again, just trying to prevent typos
const movieAPISearch = "https://imdb8.p.rapidapi.com/title/";


var movieGenres = []; // make this global so we only have to fill it once

var getPopularMoviesByGenre = function(theGenre, howManyMovies)
{
    var tempGenre = theGenre.replace(/\//g,"%2");
    console.log(tempGenre);
    var fetchStr = movieAPISearch + "get-popular-movies-by-genre?genre=" + theGenre;
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
        console.log(response);
        /* this gives a 100 element array:
            0: "/title/tt3554046/"
            1: "/title/tt3480822/"
            2: "/title/tt1160419/"
            3: "/title/tt8368408/"
            etc.
        */
        // We need to return an array with howManyMovies movie titles, release date, and plot summaries
        // first... let's try to get one movie title
/*
        Getting the popular movies by genre return a list of 100 movies. We can use that list to get details on each movie, including
        the title, release date and plot summary.
        There does not seem to be a fetch string to get a list of movies within a particular genre within a particular time frame.
        We can get the details of each movie that was returned, but that's 100 calls to the API. IS THERE A WAY TO GET MOVIE DETAILS
        FOR 100 MOVIES WITH ONE CALL? Even if that exists, we are not guaranteed that the 100 movies will contain 5 movies 
        within the time frame we want...

        "url": "https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=tt0944947&currentCountry=US",
        
        returns an object with:
                title.title is a string (yes, title twice - the first title is an object with a few elements
                releaseDate is a string formatted "YYYY-MM-DD"
                plotSummary.text is a string with the movie description
*/

    })
}

// getPopularMoviesByGenre("/chart/popular/genre/adventure");

/*
https://www.thecocktaildb.com/api.php
*/

var fillGenreDropDown = function(theMovieGenres)
{
    var genreDropDownEl = document.createElement("select");
    var genreDropDownButton = document.querySelector("#genre-list");
    genreDropDownButton.replaceWith(genreDropDownEl);
    genreDropDownEl.name = "Genres";
    genreDropDownEl.id = "Genres"
 
    for (var i = 0; i < theMovieGenres.length; i++)
    {
        var optionEl = document.createElement("option");
        optionEl.value = theMovieGenres[i].endpoint;
        optionEl.text = theMovieGenres[i].description;
        genreDropDownEl.appendChild(optionEl);
    }
 
    var labelEl = document.createElement("label");
    labelEl.innerHTML = "Choose your Genre: "
    labelEl.htmlFor = "Genre";
 
    // document.getElementById("container").appendChild(labelEl).appendChild(genreDropDownEl);
}

var getMovieGenres = function()
{
    movieGenres = [];
    // to prevent too many api calls, we are hardcoding the genre list based on
    // the actual values returned from the code below during testing
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


/* this code works
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

    /*
    Results below. We can use this to hard code the genres so that we are using fewer calls to the API
0: {description: "Action", endpoint: "/chart/popular/genre/action"}
1: {description: "Adventure", endpoint: "/chart/popular/genre/adventure"}
2: {description: "Animation", endpoint: "/chart/popular/genre/animation"}
3: {description: "Biography", endpoint: "/chart/popular/genre/biography"}
4: {description: "Comedy", endpoint: "/chart/popular/genre/comedy"}
5: {description: "Crime", endpoint: "/chart/popular/genre/crime"}
6: {description: "Documentary", endpoint: "/chart/popular/genre/documentary"}
7: {description: "Drama", endpoint: "/chart/popular/genre/drama"}
8: {description: "Family", endpoint: "/chart/popular/genre/family"}
9: {description: "Fantasy", endpoint: "/chart/popular/genre/fantasy"}
10: {description: "Film-Noir", endpoint: "/chart/popular/genre/film_noir"}
11: {description: "History", endpoint: "/chart/popular/genre/history"}
12: {description: "Horror", endpoint: "/chart/popular/genre/horror"}
13: {description: "Music", endpoint: "/chart/popular/genre/music"}
14: {description: "Musical", endpoint: "/chart/popular/genre/musical"}
15: {description: "Mystery", endpoint: "/chart/popular/genre/mystery"}
16: {description: "Romance", endpoint: "/chart/popular/genre/romance"}
17: {description: "Sci-Fi", endpoint: "/chart/popular/genre/sci_fi"}
18: {description: "Sport", endpoint: "/chart/popular/genre/sport"}
19: {description: "Thriller", endpoint: "/chart/popular/genre/thriller"}
20: {description: "War", endpoint: "/chart/popular/genre/war"}
21: {description: "Western", endpoint: "/chart/popular/genre/western"}
*/
}
