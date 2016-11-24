/* globals Backbone, app, _, $ */

// Country Information View
app.CountryInformationView = Backbone.View.extend({
    // View template
    template: _.template($('#country-summary-template').html()),

    initialize: function() {
        // Update the view on name changes
        this.listenTo(this.model, 'change:name', this.render);
    },

    render: function() {
        // Render the template
        this.$el.html(this.template(this.model.toJSON()));
    }
});