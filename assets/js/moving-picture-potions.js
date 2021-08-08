var movieGenres = []; // make this global so we only have to fill it once
var moviesFound = []; // make this global to help use fewer API calls
var moviesToDisplay = [];
var movieDetails = []; // { title: "title", summary: "summary"}
var lastSearchedGenre = "";

var submitButtonEl = document.querySelector("#submit-button");
var lastSearchedButtonEl = document.querySelector("#last-searched-button");
var genreDropDownEl = document.querySelector("#genre-list");
var moviesContainerEl = document.querySelector("#movies-container");
var buttonContainerEl = document.querySelector("#button-container");

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

var randomNumber = function(min, max)
{
    var value = Math.floor(Math.random() * (max - min + 1)) + min;

    return value;
}

var getRandomNonRepeatingNumbers = function(min, max, howMany)
{
    var randFound = [];
    while (randFound.length < howMany)
    {
        var value = randomNumber(min, max);
        if (!randFound.includes(value))
        {
            randFound.push(value);
        }
    }

    return randFound;
}

// choose numMoviesToDisplay movies from the returns list
var loadMoviesToDisplay = function()
{
    moviesToDisplay = [];
    var nMoviesToDisplay = Math.min(numMoviesToDisplay, moviesFound.length);
    var movieIndices = getRandomNonRepeatingNumbers(0, moviesFound.length-1, nMoviesToDisplay);
    for (var i = 0; i < nMoviesToDisplay; i++)
    {

        // the info in moviesFound is in the format /title/tt3554046/ - we just need the tt with the numbers
        var movieInfo = moviesFound[movieIndices[i]];
        var n = movieInfo.indexOf("tt");
        var movieID = movieInfo.slice(n, movieInfo.length - 1); // subtract 1 - we don't want that final slash
        moviesToDisplay.push(movieID);
    }
}

// add the movies to the DOM
var renderMovieData = function()
{
    moviesContainerEl.style.display = "block";
    buttonContainerEl.style.display = "block";

    for (var child = 0, movieIndex=0; child < moviesContainerEl.children.length; child++)
    {   
        var className = moviesContainerEl.children[child].className;
        if (className.includes("card-section")) // bjj 20210806 1904
        {
            var movieData = movieDetails[movieIndex];
            movieIndex++;
            moviesContainerEl.children[child].getElementsByTagName("h4")[0].textContent = movieData.title;
            moviesContainerEl.children[child].getElementsByTagName("p")[0].textContent = movieData.summary;

        }
    }    
}


// this function is used while testing the code
// it loads the movies from localStorage so that we aren't using API calls up
// while getting the UI to work.
// var loadMoviesFound = function()
// {
//     moviesFound = JSON.parse(localStorage.getItem("moviesFound"));
//     if (!moviesFound)
//     {
//         moviesFound = [];
//     }
//     loadMoviesToDisplay();
// }

var getMovieData = async function()
{
    movieDetails = [];
    var nMoviesToDisplay = Math.min(numMoviesToDisplay, moviesToDisplay.length);

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
        // console.log(movieDetails);
    }        
    // console.log(movieDetails);
    renderMovieData();
}

var getMoviesInGenre = async function(genreChoice)
{
    var fetchStr = movieAPISearch + "get-popular-movies-by-genre?genre=" + genreChoice;
    // var n = genreChoice.lastIndexOf("/");
    // fetchStr += genreChoice.slice(n+1, genreChoice.length);
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

var drinksFound = [];
var drinksToDisplay = [];
var drinksContainerEl = document.querySelector("#drinks-container");

var loadDrinksToDisplay = function()
{
    drinksToDisplay = [];

    var nDrinksDisplay = Math.min(numDrinksDisplay, drinksFound.length);

    var drinkIndices = getRandomNonRepeatingNumbers(0, drinksFound.length-1, nDrinksDisplay);

    
    for (var i = 0; i < nDrinksDisplay; i++) {

        drinksToDisplay.push(drinksFound[drinkIndices[i]].strDrink);

    }

    renderDrinkData();
}

var renderDrinkData = function()
{
    drinksContainerEl.style.display = "block";
    // buttonContainerEl.style.display = "block";


    for (var i = 0; i< drinksContainerEl.children.length; i++) {
        if (drinksToDisplay[i])
        {
            drinksContainerEl.children[i].getElementsByTagName("h4")[0].textContent = drinksToDisplay[i];
        }
        else    
        {
            drinksContainerEl.children[i].getElementsByTagName("h4")[0].textContent = "";
        }
    }

    // for (var child = 0, drinkIndex=0; child < drinksContainerEl.children.length; child++)
    // {   
    //     var className = drinksContainerEl.children[child].className;
    //     console.log(className);
    //     if (className === "drink-card")
    //     {
    //         var drinkData = drinksToDisplay[drinkIndex];
    //         drinkIndex++;
    //         drinksContainerEl.children[child].getElementsByTagName("h4")[0].textContent = drinkData;
    //         // moviesContainerEl.children[child].getElementsByTagName("p")[0].textContent = movieData.summary;

    //     }
    // }    
}

var getDrinksByGenre = function (genreText) {
    var fetchStr = drinkAPIsearch + drinksByGenre[genreText];
    fetch(fetchStr, {
        "method": "GET",
    })
    .then(response => {
        return response.json();
    })
    .then(response => {
        drinksFound = response.drinks;
        loadDrinksToDisplay();
    })
    .catch(err => {
        console.error(err);
    });
}

var convertWordsToUpperCase = function(movieGenre, divider)
{
    if (movieGenre && movieGenre.length > 0 && divider && divider.length > 0)
    {
        const words = movieGenre.split(divider);
        
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        
        words.join(divider);

        return words[0];
    }
    else
    {
        return "";
    }    
}

var convertGenreToUpperCase = function(movieGenre)
{
    var dashes = "";

    if (movieGenre && movieGenre.length > 0)
    {
        var spaces = convertWordsToUpperCase(movieGenre, " ");
        dashes = convertWordsToUpperCase(spaces, "-");
    }

    return dashes;
}

var saveGenreChoice = function()
{
    if (!lastSearchedGenre)
    {
        lastSearchedGenre = "";
    }
    localStorage.setItem("lastSearchedGenre", JSON.stringify(lastSearchedGenre));
    document.querySelector("#last-searched-genre").textContent = convertGenreToUpperCase(lastSearchedGenre);
}

var loadLastGenreChoice = function()
{
    lastSearchedGenre = JSON.parse(localStorage.getItem("lastSearchedGenre"));
    if (!lastSearchedGenre)
    {
        lastSearchGenre = "";
    }
    document.querySelector("#last-searched-genre").textContent = convertGenreToUpperCase(lastSearchedGenre);
}

var submitClickHandler = function(event)
{
    // get the users choice from the genre drop down
    lastSearchedGenre = genreDropDownEl.selectedOptions[0].text.toLowerCase();
    getMoviesInGenre(lastSearchedGenre);
    getDrinksByGenre(lastSearchedGenre);
    saveGenreChoice();
}

var submitClickLastSearchedHandler = function(event)
{
    if (lastSearchedGenre && lastSearchedGenre.length > 0)
    {
        genreChoice = lastSearchedGenre.toLowerCase();
        getMoviesInGenre(genreChoice);
        getDrinksByGenre(genreChoice);
    }
}

submitButtonEl.addEventListener("click", submitClickHandler);
lastSearchedButtonEl.addEventListener("click", submitClickLastSearchedHandler);

getMovieGenres();
loadLastGenreChoice();