/* globals d3 */

// Encapsulate the charts in a global variable
var hdi = {};
hdi.chart = {};

hdi.chart.trend = function() {
    'use strict';

    var attributes = {
        width: 600,
        height: 400,
        margin: {top: 20, right: 20, bottom: 20, left: 40},
        series: function(d) { return d.series; },
        x: function(d) { return d.x; },
        y: function(d) { return d.y; }
    };

    // Charting Function
    function chart(selection) {
        selection.each(function(data) {

            // Select the container element and bind the SVG element
            var div = d3.select(this),
                svg = div.selectAll('svg').data([data]);

            // Compute the chart width and height
            var margin = chart.margin(),
                width = chart.width() - margin.left - margin.right,
                height = chart.height() - margin.top - margin.bottom;

            // Initialize the SVG element on enter
            svg.enter().append('svg').call(chart.svgInit);

            // Select the chart and phantom groups
            var gchart = svg.select('g.chart'),
                gphantom = svg.select('g.chart-phantom');

            // Scales

            // Merge all the items to compute the extents
            var items = d3.merge(data.map(attributes.series));

            // Horizontal Scale
            var xScale = d3.scale.linear()
                .domain(d3.extent(items, function(d) { return attributes.x(d); }))
                .range([0, width]);

            // Vertical Scale
            var yScale = d3.scale.linear()
                .domain([0, 1])
                .range([height, 0]);

            // Create the line generator
            var line = d3.svg.line()
                .x(function(d) { return xScale(attributes.x(d)); })
                .y(function(d) { return yScale(attributes.y(d)); });

            // Data Join
            var lines = gchart.selectAll('path').data(data),
                ghost = gphantom.selectAll('path').data(data);

            // Create the chart lines
            lines.enter().append('path')
                .attr('d', function(d) { return line(attributes.series(d)); })
                .classed('trend-path', true);

            // Create the phantom lines
            ghost.enter().append('path')
                .attr('d', function(d) { return line(attributes.series(d)); })
                .classed('trend-phantom', true);

            // Highlight the phantom lines
            ghost.classed('trend-highlight', function(d) {
                return d.selected;
            });

            // Create the x-axis
            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient('bottom')
                .tickFormat(d3.format('d'));

            svg.select('g.xaxis').call(xAxis);

            // Create the y-axis
            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient('left');

            svg.select('g.yaxis').call(yAxis);

            // Enlarge the ticks vertically and make them white
            svg.select('g.xaxis').selectAll('g.tick').select('line')
                .style('stroke', 'white')
                .attr('y2', 6)
                .attr('y1', -height);
        });
    }

    chart.svgInit = function(svg) {

        // Compute the width and height of the chart
        var margin = chart.margin(),
            width = chart.width() - margin.left - margin.right,
            height = chart.height() - margin.top - margin.bottom;

        // Set the SVG width and height
        svg.attr('width', chart.width()).attr('height', chart.height());

        // Group for the chart background rectangle
        svg.append('g')
            .attr('class', 'chart-background')
            .attr('transform', 'translate(' + [margin.left, margin.top] + ')')
            .append('rect')
            .attr('class', 'chart-background')
            .attr('width', width)
            .attr('height', height);

        // Chart Groups

        // Main Lines
        svg.append('g').attr('class', 'chart')
            .attr('transform', 'translate(' + [margin.left, margin.top] + ')');

        // Phantom group
        svg.append('g').attr('class', 'chart-phantom')
            .attr('transform', 'translate(' + [margin.left, margin.top] + ')');

        // X Axis
        svg.append('g').attr('class', 'axis xaxis')
            .attr('transform', 'translate(' + [margin.left, margin.top + height] + ')');

        // Y Axis
        svg.append('g').attr('class', 'axis yaxis')
            .attr('transform', 'translate(' + [margin.left, margin.top] + ')');

    };

    // Accessor Methods
    function createAccessor(attr) {
        function accessor(value) {
            if (!arguments.length) { return attributes[attr]; }
            attributes[attr] = value;
            return chart;
        }
        return accessor;
    }

    for (var attr in attributes) {
        if ((!chart[attr]) && (attributes.hasOwnProperty(attr))) {
            chart[attr] = createAccessor(attr);
        }
    }

    return chart;
};
var app = {};
/* globals Backbone, app */

// Application Model
app.ApplicationModel = Backbone.Model.extend({
    // Code of the Selected Country
    defaults: {
        code: ''
    }
});
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
/* globals Backbone, $, d3, _, app, hdi, Bloodhound */

// Countries Trend View
app.CountriesTrendView = Backbone.View.extend({

    // Initialize the trend chart
    chart: hdi.chart.trend()
        .series(function(d) { return d.hdiSeries; })
        .x(function(d) { return d.year; })
        .y(function(d) { return d.hdi; }),

    // Initialization and render
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'change:selected', this.render);
    },

    // Update the chart width and bind the updated data
    render: function() {

        // Update the width of the chart
        this.chart.width(this.$el.width());

        // Rebind and render the chart
        d3.select(this.el)
            .data([this.collection.toJSON()])
            .call(this.chart);
    },

    // Update the state of the application model
    setState: function(state) {
        this.collection.setSelected(state.get('code'));
    }
});

// Search Form View
app.CountriesSearchView = Backbone.View.extend({

    // Initialize
    initialize: function() {
        this.listenTo(this.collection, 'reset', this.render);
    },

    events: {
        'typeahead:selected input[type=text]': 'setSelected'
    },

    // Render the component
    render: function() {

        // Initialize the autocompletion engine
        this.engine = new Bloodhound({
            datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: this.collection.toJSON()
        });

        this.engine.initialize();

        // Render the element
        this.$el.children('#search-country-input')
            .typeahead(null, {
                displayKey: 'name',
                source: this.engine.ttAdapter()
            });
    },

    // Update the selected item in the collection
    setSelected: function(event, datum) {
        this.collection.setSelected(datum.code);
    }
});
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