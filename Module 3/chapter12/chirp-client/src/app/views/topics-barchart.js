// Bar Chart View
App.Views.TopicsBarchart = Backbone.View.extend({

    // Create and configure the barchart
    chart: charts.barChart()
        .label(function(d) { return d.word; })
        .value(function(d) { return d.count; })
        .color(function(d) { return d.color; }),

    initialize: function () {
        // Render the view when a tweet arrives and when a new topic is added
        this.listenTo(this.collection, 'change:tweets', this.render);
        this.listenTo(this.collection, 'add', this.render);
    },

    render: function () {

        // Transform the collection to a plain JSON object
        var data = this.collection.toJSON();

        // Compute the tweet count for each topic
        data.forEach(function(item) {
            item.count = item.tweets.length;
        });

        // Compute the container div width and height
        var div = d3.select(this.el),
            width  = parseInt(div.style('width'), 10),
            height = parseInt(div.style('height'), 10);

        // Adjust the chart width and height
        this.chart.width(width).height(height);

        // Select the container element and update the chart
        div.data([data]).call(this.chart);
        return this;
    }
});