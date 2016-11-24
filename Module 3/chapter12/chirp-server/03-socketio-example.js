// Socket.IO Example
// -----------------


// Import the Socket.IO module
var IOServer = require('socket.io');

// Start the server, listening on the port 7000
var io = new IOServer(7000);


// Listen for connections from incoming sockets
io.on('connection', function (socket) {

    // Print the socket ID on connection
    console.log('Client ID ' + socket.id + ' connected.');

    // The server will emit a message when receiving the `client-message` event.
    socket.on('client-message', function (data) {
        console.log(data);
        socket.emit('server-message', {msg: 'Message "' + data.msg + '" received.'});
    });

    // Execute the callback if the client disconnects.
    socket.on('disconnect', function() {
        console.log('client disconnected.');
    });
});