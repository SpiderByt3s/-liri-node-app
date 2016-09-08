var myKeys = require('./assets/javascript/keys.js');
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('spotify');


function liri(command, action) {
    switch (command) {
        case 'my-tweets':
            twitter(action);
            break;
        case 'spotify-this-song':
            spotify(action);
            break;
        case 'movie-this':
            omdB(action);
            break;
        case 'do-what-it-says':
            doWhatISay();
            break;
        default:
            log("\nInstruction:\n Enter one of the following commands: \n\n Recent Tweets: node liri.js my-tweets 'twitter handle'\n Song Info: node liri.js spotify-this-song 'song name'\n Movie Info: node liri.js movie-this 'movie name'\n Text Info: node liri.js do-what-it-says\n");
    }
}


function twitter(handle) {
    if (!handle) {
        handle = 'SpiderByt3s';
    }
    var client = new Twitter({
        consumer_key: myKeys.twitterKeys.consumer_key,
        consumer_secret: myKeys.twitterKeys.consumer_secret,
        access_token_key: myKeys.twitterKeys.access_token_key,
        access_token_secret: myKeys.twitterKeys.access_token_secret
    });

    var params = {
        screen_name: handle,
        count: 20
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            log("\n====================\n");
            for (var i = 0; i < params.count; i++) {
                log("@" + tweets[i].user.screen_name);
                log("Tweet " + "#" + (i + 1) + ": " + tweets[i].text);
                log("Created: " + tweets[i].created_at + "\n");
                log("\n====================\n");
            }
        }
    });
}

function spotify(song) {
    if (!song) {
        song = 'The Sign';
    };

    var spotify = require('spotify');

    spotify.search({
        type: 'track',
        query: song
    }, function(err, data) {
        if (!err) {
            for (var i = 0; i < 10; i++) {
                if (data.tracks.items[i] != undefined) {
                    log("\n====================\n");
                    log('Artist: ' + data.tracks.items[i].artists[0].name)
                    log('Song: ' + data.tracks.items[i].name)
                    log('Album: ' + data.tracks.items[i].album.name)
                    log('Preview Url: ' + data.tracks.items[i].preview_url)
                    log("\n====================\n");
                };
            };

        } else {
            log('Error occurred: ' + err);

        };
    });
};

function omdB(movie) {
    if (!movie) {
        movie = 'Mr. Nobody'
        request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body)
                log("\n====================\n");
                log("Title: " + info.Title);
                log("Starring: " + info.Actors + "\n");
                log("Year: " + info.Year);
                log("IMDB Rating: " + info.imdbRating);
                log("Country: " + info.Country + "\n");
                log("Plot: " + info.Plot + "\n");
                log("Tomato Score: " + info.tomatoUserMeter);
                log("Tomato URL: " + info.tomatoURL + "\n");
                log("You can catch it on Netflix!");
                log("\n====================\n");
            } else {
                log('Error occurred' + error);
            }
        });

    } else {
        request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var info = JSON.parse(body)
                log("\n====================\n");
                log("Title: " + info.Title);
                log("Starring: " + info.Actors + "\n");
                log("Year: " + info.Year);
                log("IMDB Rating: " + info.imdbRating);
                log("Country: " + info.Country + "\n");
                log("Plot: " + info.Plot + "\n");
                log("Tomato Score: " + info.tomatoUserMeter);
                log("Tomato URL: " + info.tomatoURL);
                log("\n====================\n");
            } else {
                log('Error occurred' + error);

            }
        });
    }
}

function doWhatISay() {
    fs.readFile('assets/extra/random.txt', 'utf8', function(error, data) {
        if (!error) {
            doArray = data.split(',');
            liri(doArray[0], doArray[1]);
        } else {
            log('Error occurred' + error);
        }
    });
};

function log(data) {
    console.log(data);
    fs.appendFile('assets/extra/log.txt', data, 'utf8', function(error) {
        if (error) {
            log('Error occurred' + error);
        }
    })
};


liri(process.argv[2], process.argv[3]);
