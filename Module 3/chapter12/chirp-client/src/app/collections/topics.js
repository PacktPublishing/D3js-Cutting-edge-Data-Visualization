// Topics Collection
App.Collections.Topics = Backbone.Collection.extend({

    // The collection model
    model: App.Models.Topic,

    // Collection Initialization
    initialize: function(models, options) {

        this.socket = options.socket;

        // Store the current 'this' context
        var self = this;

        // Adds the tweet to the corresponding topic when they arrive
        this.socket.on('tweet', function(tweet) {
            self.addTweet(tweet);
        });

        // Set the new topic's color and sends the new topic to the server
        this.on('add', function(topic) {
            topic.set('color', App.Colors[this.length - 1]);
            this.socket.emit('add', {word: topic.get('word')});
        });
    },

    addTweet: function(tweet) {

        // Gets the corresponding model instance.
        var topic = this.get(tweet.word);

        // If the model instance is found, push the tweet to the tweets array.
        if (topic) {
            topic.addTweet(tweet);
        }
    }
});