/* globals Backbone, app, _ */


// Country Information Model
app.CountryInformation = Backbone.Model.extend({

    // URL to fetch the model data
    url: '',

    // Base URL
    baseurl: 'http://data.undp.org/resource/wxub-qc5k.json',

    // Template to construct the URL
    urltpl: _.template('<%= baseurl %>?Abbreviation=<%= code %>'),

    // Default attributes, the name and code of the country
    default: {
        code: '',
        name: ''
    },

    // Compile the URL and fetch the data
    setState: function(state) {
        // Construct the URL and fetch the data
        this.url = this.urltpl({baseurl: this.baseurl, code: state.get('code')});
        this.fetch({reset: true});
    },

    // Parse the response and set the model contents
    parse: function(response) {

        // Get the first item of the response
        var item = response.pop(),
            data = {
                code: item.abbreviation,
                name: item.name
            };

        // Parse each attribute, removing the year part of the attribute.
        for (var attr in item) {
            if (attr[0] === '_') {
                // Extract the attribute name after the year
                data[attr.slice(6)] = item[attr];
            }
        }

        // Return the parsed data
        return data;
    }
});


// Country Trend Model
app.CountryTrend = Backbone.Model.extend({

    // Default values for the Country Trend Model
    defaults: {
        name: '',
        code: '',
        selected: false,
        hdiSeries: []
    },

    // The country code identifies uniquely the model
    idAttribute: 'code',

    // Parse the country fields before instantiating the model
    parse: function(response) {

        var data = {
            code: response.country_code,
            name: response.country_name,
            selected: false,
            hdiSeries: []
        };

        // Compute the HDI Series
        for (var attr in response) {
            var part = attr.split('_'),
                series = [];
            if ((part.length === 3) && (part[2] === 'hdi')) {
                data.hdiSeries.push({
                    year: parseInt(part[1], 10),
                    hdi: parseFloat(response[attr])
                });
            }
        }

        // Sort the data items
        data.hdiSeries.sort(function(a, b) { return b.year - a.year; });
        return data;
    }
});
