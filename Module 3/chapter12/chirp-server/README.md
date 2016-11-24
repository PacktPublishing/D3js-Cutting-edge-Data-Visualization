# Chirp Server

Twitter Streaming Server. Example for the book _Mastering D3.js_.

## Installing

To run the code in this repository, you will need Node, [Twit](https://github.com/ttezel/twit), [Socket.IO](http://socket.io/) and Twitter credentials. To obtain the Twitter credentials, go to [Twitter Developers Site](https://dev.twitter.com/), create an application and create access tokens for your application. You will need the consumer key, consumer secret, access token and access token secret and replace the values in the file `credentials.json`.

The dependencies on this project can be installed from the command line by typing:

    $ npm install

## Running the Streaming Server

Update the `chirp.js` file to use your credentials (be sure to keep the credentials secret) and run the streaming server:

    $ node chirp.js

The server will connect to the `statuses/filter` endpoint and begin listening the port 9720 for socket.io connections.

## Examples

There are examples of using the Twitter Streaming API and the Socket.IO library. To run the examples, execute the corresponding script in the terminal:

    $ node 01-twitter-sample.js

The third example requires to open the `socketio-example.html` with the browser.

- [1. Twitter Sample.](01-twitter-sample.js)
- [2. Twitter Filtering.](02-twitter-filter.js)
- 3. Socket.IO Example [server](03-socketio-example.js) and [client.](socketio-example.html)
