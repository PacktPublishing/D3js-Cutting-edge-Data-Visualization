/* globals Backbone, app */

// Countries Collection
app.Countries = Backbone.Collection.extend({

    // Model
    model: app.CountryTrend,

    // JSON Endpoint URL
    url: 'http://data.undp.org/resource/efc4-gjvq.json',

    // Remove non-country items
    parse: function(response) {
        return response.filter(function(d) { return d.country_code; });
    },

    // Set the selected country, ensuring that only one is selected
    setSelected: function(code) {

        var selected = this.findWhere({selected: true});

        if (selected) {
            selected.set('selected', false);
        }

        // Set the new selected item
        selected = this.findWhere({code: code});

        if (selected) {
            selected.set('selected', true);
        }
    }
});