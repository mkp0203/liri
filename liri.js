require("dotenv").config();

var request = require('request');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
});
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
\nPlease type a command:
\n"concert-this"
\n"spotify-this-song"
\n"movie-this"
\n"do-what-it-says"
`
            );
    }
}

function concertThis(select) {

    var URL = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp";

    request(URL, function (err, response, body) {

        if (!err && response.statusCode === 200) {

            var data = JSON.parse(body);

            var results =
                `
\nVenue Name: ${data[0].venue.name}
\nLocation: ${data[0].venue.city}
\nDate: ${moment(data[0].datetime).format('L')}
`

            fs.appendFile("log.txt", results, function (err) {
                if (err) throw err;
                console.log(results);
            });
        }
    });
}


// request(url, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//         var obj = JSON.parse(body);

//                 var disp = `
//         Name of Venue: ${}
//         Venue Location: ${}
//         Date of Event: ${}
//         \n\n`;
//     }
// })

// console.log(name);