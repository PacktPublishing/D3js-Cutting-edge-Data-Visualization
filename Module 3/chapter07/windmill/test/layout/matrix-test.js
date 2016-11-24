
// Import the required modules
var vows = require("vows"),
    assert = require("assert"),
    d3 = require("d3");

// Import the charting library
var windmill = require("../../windmill");

// Create the test suite
var suite = vows.describe("windmill.layout.matrix");

// Create a sample data array
var data = [
    {a: 1, b: 1, c: 10},
    {a: 1, b: 1, c:  5},
    {a: 1, b: 2, c:  8},
    {a: 1, b: 2, c:  6},
    {a: 2, b: 1, c: 12},
    {a: 2, b: 1, c:  8},
    {a: 2, b: 2, c: 15},
    {a: 2, b: 2, c:  5}
];

var avgerage = function(values) {
    var sum = 0;
    values.forEach(function(d) { sum += d; });
    return sum / values.length;
};

// Create a batch
suite.addBatch({
    "default layout": {

        topic: function() {
            return windmill.layout.matrix();
        },

        "is a function": function(topic) {
            assert.isFunction(topic);
        },

        "has a row method": function(topic) {
            assert.isFunction(topic.row);
        },

        "has a column method": function(topic) {
            assert.isFunction(topic.column);
        },

        "has a value method": function(topic) {
            assert.isFunction(topic.value);
        }
    }
});

suite.export(module);