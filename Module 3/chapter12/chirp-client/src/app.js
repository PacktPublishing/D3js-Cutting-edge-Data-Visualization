

var div = d3.select('#map'),
    svg = div.append('svg');

var width  = parseInt(div.style('width'), 10),
    height = width / 2;

svg.attr('width', width).attr('height', height);

var projection = d3.geo.equirectangular()
    .scale(width / (2 * Math.PI))
    .translate([width / 2, height / 2]);

var path = d3.geo.path()
    .pointRadius(10)
    .projection(projection);

d3.json('dist/data/land.json', function(error, data) {

    if (error) { console.log(error); }

    var geojson = topojson.feature(data, data.objects.ne_50m_land);

    console.log(geojson.features);

    var features = svg.selectAll('path.land').data([geojson]);

    features.enter().append('path')
        .attr('d', path)
        .attr('class', 'land');

});


var tweets = [
    {
        text: 'Hola',
        coordinates: {"type":"Point","coordinates":[-5.06548944,55.85733664]}
    }
];

// var socket = io.connect('http://localhost:9720');

// function addItem(item) {
//     socket.emit('add', {topic: item});
// }

// socket.on('connected', function() {
//     console.log('Connected');
// });

// socket.on('tweet', function(tweet) {
//     console.log(tweet);
// });




// socket.on('tweet', function (tweet) {

//     tweets.push(tweet);

//     var tweetPoints = svg.selectAll('path.tweet').data(tweets);

//     tweetPoints.enter().append('path')
//         .attr('d', function(d) { return path(d.coordinates); })
//         .attr('class', 'tweet')
//         .attr('fill', function(d) {

//             var color = '#ecb828';

//             if (d.text.toLowerCase().indexOf('breakfast') > -1) {
//                 color = '#05395E';
//             }

//             return color;
//         })
//         .attr('fill-opacity', 0.5);
// });