// Import the required modules
var vows = require("vows"),
    assert = require("assert"),
    d3 = require("d3"),
    windmill = require("../../windmill");

// Sample Data Array
var data = [
    {row: 1, column: 1, value: 5.5},
    {row: 1, column: 2, value: 2.5},
    {row: 1, column: 3, value: 3.5},
    {row: 1, column: 4, value: 1.5},
    {row: 2, column: 1, value: 6.5},
    {row: 2, column: 2, value: 2.5},
    {row: 2, column: 3, value: 4.5},
    {row: 2, column: 4, value: 7.5}
];

// Create a Test Suite for the heatmap chart
var suite = vows.describe("windmill.chart.heatmap");


// Append the Batches
suite.addBatch({
    "the default chart svg": {

        topic: function() {
            // Create the chart instance and a sample data array
            var chart = windmill.chart.heatmap();

            // Invoke the chart passing the container div
            d3.select("body").append("div")
                .attr("id", "default")
                .data([data])
                .call(chart);

            // Return the svg element for testing
            return d3.select("div#default").select("svg");
        },

        "exists": function(svg) {
            assert.equal(svg.empty(), false);
        },
        "is 600px wide": function(svg) {
            assert.equal(svg.attr('width'), '600');
        },
        "is 300px high": function(svg) {
            assert.equal(svg.attr('height'), '300');
        },
        "has a group for the chart": function(svg) {
            assert.equal(svg.select("g.chart").empty(), false);
        },
        "has a group for the xaxis": function(svg) {
            assert.equal(svg.select("g.xaxis").empty(), false);
        },
        "has a group for the yaxis": function(svg) {
            assert.equal(svg.select("g.yaxis").empty(), false);
        },
        "the group has one rectangle for each data item": function(svg) {
            var rect = svg.select('g').selectAll("rect");
            assert.equal(rect[0].length, data.length);
        }
    }
});

suite.export(module);