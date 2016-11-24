// Application View
App.Views.Application = Backbone.View.extend({

    // Compile the applicaiton template
    template: _.template($('#application-template').html()),

    // Render the application template in the container
    render: function() {
        this.$el.html(this.template());
        return this;
    }
});