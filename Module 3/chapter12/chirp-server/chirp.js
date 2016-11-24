// Chirp Server
// ------------

// Import the Node modules
var Twit     = require('twit'),              // Twitter API Client
    IOServer = require('socket.io'),         // Client-side communication
    config   = require('./credentials.js');  // Twitter Credentials

// List of topics to track
var topics = [];

// Twitter Streaming Connection
// ----------------------------

// Configure the Twit object with the application credentials
var T = new Twit(config);

// Filter by location (the world) and tweets in english
var filterOptions = {locations: '-180,-90,180,90', language: 'en'};

// Creates a new stream object, tracking the updated topic list
var twitterStream = T.stream('statuses/filter', filterOptions);

// Callbacks for Twit Stream Events

// Connection attempt (`connect` event)
function twitOnConnect(req) {
    console.log('[Twitter] Connecting...');
}

// Successful connection (`connected` event)
function twitOnConnected(res) {
    console.log('[Twitter] Connection successful.');
}

// Reconnection scheduled (`reconnect` event).
function twitOnReconnect(req, res, interval) {
    var secs = Math.round(interval / 1e3);
    console.log('[Twitter] Disconnected. Reconnection scheduled in ' + secs + ' seconds.');
}

// Disconnect message from Twitter (`disconnect` event)
function twitOnDisconnect(disconnectMessage) {
    // Twit will stop itself before emitting the event
    console.log('[Twitter] Disconnected.');
}

// Limit message from Twitter (`limit` event)
function twitOnLimit(limitMessage) {
    // We stop the stream explicitely.
    console.log('[Twitter] Limit message received. Stopping.');
    twitterStream.stop();
}

// A tweet is received (`tweet` event)
function twitOnTweet(tweet) {

    // Exits if the tweet doesn't have geographic coordinates
    if (!tweet.coordinates) {
        return;
    }

    // Convert the tweet text to lowercase to find the topics
    var tweetText = tweet.text.toLowerCase();

    // Check if any of the topics is contained in the tweet text
    topics.forEach(function(topic) {

        // Checks if the tweet text contains the topic
        if (tweetText.indexOf(topic.word) !== -1) {

            // Sends a simplified version of the tweet to the client
            topic.socket.emit('tweet', {
                id: tweet.id,
                coordinates: tweet.coordinates,
                word: topic.word
            });
        }
    });
}

// Add listeners for the stream events to the new stream instance
twitterStream.on('tweet',      twitOnTweet);
twitterStream.on('connect',    twitOnConnect);
twitterStream.on('connected',  twitOnConnected);
twitterStream.on('reconnect',  twitOnReconnect);
twitterStream.on('limit',      twitOnLimit);
twitterStream.on('disconnect', twitOnDisconnect);


// Client Side Communication
// -------------------------

// Create a new instance of the Socket.IO Server
var port = 9720,
    io = new IOServer(port);

// Displays a message at startup
console.log('Listening for incoming connections in port ' + port);

// A clients established a connection with the server
io.on('connection', function(socket) {

    // Displays a message in the console when a client connects
    console.log('Client', socket.id, 'connected.');

    // The client adds a new topic
    socket.on('add', function(topic) {
        // Adds the new topic to the topic list
        topics.push({word: topic.word.toLowerCase(), socket: socket});

        console.log('Adding the topic "' + topic.word + '"');
    });

    // If the client disconnects, we remove its topics from the list
    socket.on('disconnect', function() {
        console.log('Client ' + socket.id + ' disconnected.');
        topics = topics.filter(function(topic) {
            return topic.socket.id !== socket.id;
        });
    });
});