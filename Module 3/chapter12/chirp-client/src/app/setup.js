// Container for the application instances
var app = {};

// Invoke the function when the document is ready
$(function() {

    // Create the application view and renders it
    app.applicationView = new App.Views.Application({
        el: '#application-container'
    });
    app.applicationView.render();

    // Creates the topics collection, passing the socket instance
    app.topicList = new App.Collections.Topics([], {
        socket: io.connect('http://localhost:9720')
    });

    // Topic Views
    // -----------

    // Input View
    app.topicsInputView = new App.Views.TopicsInput({
        el: '#topics-form',
        collection: app.topicList
    });

    // Bar Chart View
    app.topicsBarchartView = new App.Views.TopicsBarchart({
        el: '#topics-barchart',
        collection: app.topicList
    });

    // Map View
    app.topicsMapView = new App.Views.TopicsMap({
        el: '#topics-map',
        collection: app.topicList
    });

    // Loads the TopoJSON countries file
    d3.json('dist/data/countries.json', function(error, geodata) {

        if (error) {
            // Handles errors getting or parsing the file
            console.error('Error getting or parsing the TopoJSON file');
            throw error;
        }

        // Transform from TopoJSON to GeoJSON
        var geojson = topojson.feature(geodata, geodata.objects.countries);

        // Update the map chart and render the map view
        app.topicsMapView.chart.geojson(geojson);
        app.topicsMapView.render();
    });

    // Render the Topic Views
    app.topicsInputView.render();
    app.topicsBarchartView.render();
    app.topicsMapView.render();
});