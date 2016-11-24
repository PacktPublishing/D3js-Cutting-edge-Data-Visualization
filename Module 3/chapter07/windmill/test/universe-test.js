
// Load the modules
var vows = require('vows'),
    assert = require('assert');

// Create the suite
var suite = vows.describe('Universe');

suite.addBatch({

    'the answer': {

        topic: 42,

        "shouldn't be undefined": function(topic) {
            assert.notEqual(topic, undefined);
        },

        "shouldn't be null": function(topic) {
            assert.notEqual(topic, null);
        },

        "should be a number": function(topic) {
            assert.isNumber(topic);
        },
        "should be 42": function(topic) {
            assert.equal(topic, 42);
        }
    }

});

suite.export(module);