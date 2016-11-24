/* globals app, $, Backbone */


// Models & Collections
// --------------------

// Application
app.state = new app.ApplicationModel();

// HDI Country Trends
app.countries = new app.Countries();

app.countries.listenTo(app.state, 'change:code', function(state) {
    this.setSelected(state.get('code'));
});

app.countries.on({

    'reset': function() {
        if (!app.state.get('code')) {
            app.state.set('code', this.first().get('code'));
        }
    },

    'change:selected': function() {
        var selected = this.findWhere({selected: true});
        if (selected) {
            app.state.set('code', selected.get('code'));
        }
    }

});

app.countries.fetch({reset: true});

// HDI Summary
app.country = new app.CountryInformation();
app.country.listenTo(app.state, 'change:code', app.country.setState);


// Router
app.Router = Backbone.Router.extend({

    initialize: function(attributes) {
        this.model = attributes.model;
        this.listenTo(this.model, 'change:code', this.setState);
    },

    routes: {
        'country/:code': 'setCode'
    },

    setCode: function(code) {
        this.model.set({code: code});
        this.navigate('country/' + code, {trigger: true});
    },

    setState: function(model) {
        this.setCode(model.get('code'));
    }
});


app.router = new app.Router({model: app.state});
Backbone.history.start();

// Views
// -----

app.trendView = new app.CountriesTrendView({
    el: $('div#chart'),
    collection: app.countries
});

app.searchView = new app.CountriesSearchView({
    el: $('#search-country'),
    collection: app.countries
});

app.infoView = new app.CountryInformationView({
    el: $('div#table'),
    model: app.country
});