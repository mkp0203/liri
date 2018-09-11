require("dotenv").config();

var request = require('request');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var fs = require('fs');

var select = process.argv[2];
var name = process.argv.slice(3).join(" ");

search(select, name);

function search(select, name) {
    switch (select) {
        case "concert-this":
            concertThis(name);
            break;
        case "spotify-this-song":
            spotifyThisSong(name);
            break;
        case "movie-this":
            movieThis(name);
            break;
        case "do-what-it-says":
            doWhatItSays(name);
            break;
        default:
            console.log(
                `
\nPlease type one of these commands:
\n"concert-this"
\n"spotify-this-song"
\n"movie-this"
\n"do-what-it-says"
`
            );
            break;
    }
}

function concertThis(name) {
    var URL = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp";

    request(URL, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var data = JSON.parse(body);

            var results =
                `
\nVenue Name: ${data[0].venue.name}
\nLocation: ${data[0].venue.city}
\nDate: ${moment(data[0].datetime).format('L')}
`
            fs.appendFile("log.txt", results, function (error) {
                if (error) throw error;
                console.log(results);
            });
        }
    });
}

function spotifyThisSong(name) {
    spotify.search(
        {
            type: 'track',
            query: name || 'the sign',
            limit: 1
        },
        function (error, data) {
            if (error) {
                console.log('Error: ' + error);
                return;
            }

            var trackdata = data.tracks.items[0];
            // console.log('TRACK DATA', trackdata);

            var results = `
          Song Name: ${trackdata.name}
          Artist: ${trackdata.album.artists[0].name}
          Preview Link: ${trackdata.preview_url}
          Album: ${trackdata.album.name}
        `;
            fs.appendFile('log.txt', results, function (error) {
                if (error) throw error;
                console.log(results);
            });
        }
    );
}

function movieThis(name) {

    var URL = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";

    request(URL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            var results =
                `
Movie Title: ${data.Title}
Release Year: ${data.Year}
IMDB: ${data.Ratings[0].Value}
Rotten Tomatoes: ${data.Ratings[1].Value}
Country: ${data.Country}
Language: ${data.Language}
Plot: ${data.Plot}
Actors: ${data.Actors}
        `
            fs.appendFile("log.txt", results, function (error) {
                if (error) throw error;
                console.log(results);
            });
        }
    });
}

function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
            console.log("Error: " + error);
        }
        else {
            var arr = data.split(',');
            console.log(arr);
            spotifyThisSong();
        }
    });
}