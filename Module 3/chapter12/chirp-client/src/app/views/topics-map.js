// Topics Map View
App.Views.TopicsMap = Backbone.View.extend({

    // Create and configure the map chart
    chart: charts.map()
        .feature(function(d) { return d.coordinates; })
        .color(function(d) { return d.color; }),

    initialize: function (options) {
        // Sets the GeoJSON object with the world map
        this.chart.geojson(options.geojson);

        // Render the view when a new tweet arrives
        this.listenTo(this.collection, 'change:tweets', this.render);
    },

    render: function () {

        // Gather the tweets for all the topics in one array
        var tweets =  _.flatten(_.pluck(this.collection.toJSON(), 'tweets'));

        // Select the container element
        var div = d3.select(this.el),
            width  = parseInt(div.style('width'),  10);

        // Update the chart width, height and scale
        this.chart
            .width(width)
            .height(width / 2)
            .scale(width / (2 * Math.PI));

        // Update the chart
        div.data([tweets]).call(this.chart);
        return this;
    }
});