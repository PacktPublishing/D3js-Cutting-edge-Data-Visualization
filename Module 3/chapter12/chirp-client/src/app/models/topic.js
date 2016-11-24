// Topic Model
App.Models.Topic = Backbone.Model.extend({

    // The `word` attribute will identify uniquely our topic
    idAttribute: 'word',

    // Default model values
    defaults: function() {
        return {
            word:   'topic',
            color:  '#555',
            tweets: []
        };
    },

    // Adds a tweet to the `tweets` array.
    addTweet: function(tweet) {

        // Adds the color of the topic
        tweet.color = this.get('color');

        // Append the tweet to the tweets array
        this.get('tweets').push(tweet);

        // We trigger the event explicitely
        this.trigger('change:tweets');
    }
});