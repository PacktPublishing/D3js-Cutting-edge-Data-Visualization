App.Views.TopicsInput = Backbone.View.extend({

    template: _.template($('#topics-template').html()),

    events: {
        'submit #topic-form': 'addOnSubmit'
    },

    initialize: function (options) {
        // Disable the input elements when the collection has five items
        this.listenTo(this.collection, 'add', this.disableInput);
    },

    render: function () {
        // Renders the input element in the view element
        this.$el.html(this.template(this.collection.toJSON()));
        return this;
    },

    disableInput: function() {
        // Disable the input element if the collection has five or more items
        if (this.collection.length >= 5) {
            this.$('input').attr('disabled', true);
        }
    },

    addOnSubmit: function(e) {

        // Prevents the page from reloading
        e.preventDefault();

        // Content of the input element
        var word = this.$('input').val().trim();

        // Adds the topic to the collection and cleans the input
        if (word) {
            this.collection.add({word: word});
            this.$('input').val('');
        }
    }
});