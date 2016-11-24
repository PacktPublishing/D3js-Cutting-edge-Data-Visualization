// Twitter Sample
//
// Using the Twitter Streaming API. In this example, we retrieve the
// sample of the statuses in real time.

// Import node modules
var Twit   = require('twit'),              // Twitter API Client
    config = require('./credentials.js');  // Twitter Credentials

// Configure the Twit object with the application credentials
var T = new Twit(config);

// Subscribe to the sample stream and begin listening
var stream = T.stream('statuses/sample');


// Event Listeners
// ===============


// Connection
// ----------

// The stream tries to connect to the Twitter Streaming API
stream.on('connect', function(request) {
    console.log('Connection attempt.');
});

// The 'connected' event is triggered when the connection is successful.
stream.on('connected', function(response) {
    console.log('Connection successful');
});

// The 'reconnect' event is triggered when a reconnection is scheduled.
stream.on('reconnect', function(req, res, interval) {
    console.log('Reconnecting in ' + (interval / 1e3) + ' seconds.');
});


// Limits and Warnings
// -------------------

// The 'warning' event is triggered if the client is not processing the
// tweets fast enough.
stream.on('warning', function(warningMessage) {
    console.warning('Twitter warning message:');
    console.warning(warningMessage);
});

stream.on('limit', function(limitMessage) {
    console.log('Twitter limit message:');
    console.log(limitMessage)
})

// The 'disconnect' event is triggered when a disconnect message comes from
// Twitter.
stream.on('disconnect', function(msg) {
    console.log('Twitter disconnection message');
    console.log(msg);
});


// Tweets
// ------

// The callback will be invoked on each tweet. Here, we print the username
// and the text of the tweet in the screen.
stream.on('tweet', function(tweet) {
    // Displays the tweet in the console
    console.log('[@' + tweet.user.screen_name + ']: ' + tweet.text);
});

// A tweet deletion message comes in the stream
stream.on('delete', function(deleteMessage) {
    console.log('delete message');
    // console.log(deleteMessage);
});

// A location deletion message arrives
stream.on('scrub_geo', function(scrubGeoMessage) {
    console.log('scrub_geo message');
    // console.log(scrubGeoMessage);
});


