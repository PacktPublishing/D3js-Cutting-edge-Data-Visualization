charts.map = function() {
    'use strict';

    // Attributes
    var me = {
        width:  200,
        height: 100,
        margin: {top: 10, right: 10, bottom: 10, left: 10},
        geojson: [],
        projection: 'equirectangular',
        scale: 200 / (2 * Math.PI),
        feature: function(d) { return d.feature; },
        color: function(d) { return '#DAC130'; },
        duration: 1000,
        id: function(d) { return d.id; }
    };

    function chart(selection) {
        selection.each(function(data) {

            var div = d3.select(this),
                svg = div.selectAll('svg').data([data]);

            var width = me.width - me.margin.left - me.margin.right,
                height = me.height - me.margin.top - me.margin.bottom,
                projection = d3.geo[me.projection]();

            // Append the SVG element on enter
            svg.enter().append('svg');

            // Update the SVG width and height
            svg.attr('width',  me.width).attr('height', me.height);

            var gmap = svg.selectAll('g.bg-map').data([me.geojson]),
                gpoints = svg.selectAll('g.points').data([data]);

            gmap.enter().append('g').attr('class', 'bg-map');
            gpoints.enter().append('g').attr('class', 'points');

            // Create and configure an instance of the projection
            var projection = d3.geo[me.projection]()
                .scale(me.scale)
                .translate([width / 2, height / 2]);

            var path = d3.geo.path()
                .pointRadius(3)
                .projection(projection);

            var features = gmap.selectAll('path.feature')
                .data(function(d) { return [d]; });

            features.enter().append('path')
                .attr('class', 'feature');

            features.attr('d', function(d) { return path(d); });

            // Data Points
            var points = gpoints.selectAll('path.point')
                .data(data, me.id);

            points.enter().append('path')
                .attr('class', 'point')
                .attr('fill', me.color)
                .attr('fill-opacity', 0.5);

            points
                .attr('d', function(d) { return path(d.coordinates); });
        });
    }

    // Accessor methods
    function createAccessor(attr) {
        return function(value) {
            if (!arguments.length) { return me[attr]; }
            me[attr] = value;
            return chart;
        }
    }

    for (var attr in me) {
        if ((!chart[attr]) && (me.hasOwnProperty(attr))) {
            chart[attr] = createAccessor(attr);
        }
    }

    return chart;
};