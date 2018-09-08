require("dotenv").config();

var request = require('request');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var fs = require('fs');

var select = process.argv[2];
var name = process.argv.slice(3).join(" ");

switch (select) {
    case "concert-this":
    concertThis();
    break;
    case "spotify-this-song":
    spotifyThisSong();
    break;
    case "movie-this":
    movieThis();
    break;
    case "do-what-it-says":
    doWhatItSays();
    break;
    // case "":
    // console.log("Please enter a selection")
    // break;
}

var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        var obj = JSON.parse(body);

//         var disp = `
// Name of Venue: ${}
// Venue Location: ${}
// Date of Event: ${}
// \n\n`;
    }
})