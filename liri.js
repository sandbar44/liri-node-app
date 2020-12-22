// Load packages
require("dotenv").config();
var request = require("request");
var moment = require('moment');
var fs = require("fs");

// var keys = require("keys.js");
// var spotify = new Spotify(keys.spotify);

// Make it so liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

// Store all of the arguments in an array
var nodeArgs = process.argv;
var command = nodeArgs[2];
var searchTerm = '';

// Loop through all the words in the node argument
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        searchTerm = searchTerm + "+" + nodeArgs[i];
    }
    else {
        searchTerm += nodeArgs[i];
    }
}

// Create all functions
function concertThis(searchTerm) {
    // Run a request to the API with user input
    var queryUrl = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp"
    // Return response
    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body)
            var length = body.length;
            for (i = 0; i < length; i++) {
                console.log(`Venue: ${body[i].venue.name}`);
                console.log(`Location: ${body[i].venue.location}`);
                console.log(`Date: ${moment(body[i].datetime).format('MM/DD/YYYY')}`);
                console.log(``);
            }
        }
    });
}

function movieThis(searchTerm) {
    // Run a request to the API with user input
    var queryUrl = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";
    // Return response
    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            var body = JSON.parse(body)

            if (body.Response === 'False') {
                console.log(`If you haven't watched "Mr. Nobody," then you should:`);
                console.log(`http://www.imdb.com/title/tt0485947/`);
                console.log(`It's on Netflix!`);
            }
            else {
                console.log(`Movie: ${body.Title}`)
                console.log(`Year: ${body.Year}`)
                console.log(`IMDB Rating: ${body.imdbRating}`)
                console.log(`Country: ${body.Country}`)
                console.log(`Language: ${body.Language}`)
                console.log(`Plot: ${body.Plot}`)
                console.log(`Actors: ${body.Actors}`)
            };
        };
    });
}


if (command == 'concert-this') {
    concertThis(searchTerm);
}
else if (command === 'movie-this') {
    movieThis(searchTerm);
}
else if (command === 'do-what-it-says') {
    fs.readFile("random.txt", "utf8", function (error, data) {
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        // Split content by commas (to make it more readable)
        var dataArr = data.split(",");

        // Execute command and search
        if (dataArr[0] === 'concert-this') {
            concertThis(dataArr[1]);
        }
        else if (dataArr[0] === 'movie-this') {
            movieThis(dataArr[1]);
        }
    });
};