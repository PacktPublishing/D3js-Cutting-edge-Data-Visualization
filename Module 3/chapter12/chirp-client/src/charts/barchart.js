// Bar Chart
// ---------
charts.barChart = function() {
    'use strict';

    // Chart Attributes
    var me = {
        width:  200,
        height: 100,
        margin: {top: 5, right: 35, bottom: 5, left: 5},
        labelWidth: 100,
        barHeight:   10,
        barPadding:   5,
        duration:   300,
        label: function(d) { return d.label},
        value: function(d) { return d.value},
        color: function(d) { return d.color}
    };

    // Create and set the classes for the chart group
    function chartInit(selection) {

        // Add groups
        selection.append('g')
            .attr('class', 'barchart');
    }

    function chart(selection) {
        selection.each(function(data) {

            // Select the container element and select the SVG element
            var div = d3.select(this),
                svg = div.selectAll('svg').data([data]);

            var margin = me.margin,
                width  = me.width - me.margin.left - me.margin.right,
                height = me.height - me.margin.top - me.margin.bottom,
                chartWidth = width - me.labelWidth;

            // Add the svg element on enter
            svg.enter().append('svg').call(chartInit);

            svg
                .attr('width', me.width)
                .attr('height', me.height);

            var gchart = svg.select('g.barchart')
                .attr('transform', 'translate(' + [margin.left, margin.top] + ')');

            var maxValue = d3.max([100, d3.max(data, me.value)]);

            var xScale = d3.scale.linear()
                .domain([0, maxValue])
                .range([1, chartWidth]);

            // Create one group for each item
            var gitems = gchart.selectAll('g.bar-item').data(data);

            // The items will appear from below
            gitems.enter().append('g')
                .attr('class', 'bar-item')
                .attr('transform', 'translate(' + [0, me.height + 10] + ')');

            gitems.transition().duration(me.duration)
                .attr('transform', function(d, i) {
                    return 'translate(' + [0, (i + 1) * me.barHeight + i * me.barPadding] + ')';
                });

            // Labels
            var labels = gitems.selectAll('text.barchart-label')
                .data(function(d) { return [d]; });

            // Append the labels on enter
            labels.enter().append('text')
                .attr('x', me.margin.left + me.labelWidth - me.barPadding)
                .attr('class', 'barchart-label')
                .attr('text-anchor', 'end');

            labels.text(me.label);

            // Bars

            var bars = gitems.selectAll('rect.barchart-bar')
                .data(function(d) { return [d]; });

            // Append the bars on enter
            bars.enter().append('rect')
                .attr('x', me.margin.left + me.labelWidth)
                .attr('y', -me.barHeight)
                .attr('height', me.barHeight)
                .attr('class', 'barchart-bar');

            bars.transition().duration(me.duration)
                .attr('width', function(d) { return xScale(me.value(d)); })
                .attr('fill', me.color);

            // Add labels with the values
            var valueLabels = gitems.selectAll('text.barchart-value')
                .data(function(d) { return [d]; })

            valueLabels.enter().append('text')
                .attr('class', 'barchart-value');

            valueLabels.transition().duration(me.duration)
                .text(me.value)
                .attr('x', function(d) {
                    return me.margin.left + me.labelWidth + me.barPadding + xScale(me.value(d));
                })
                .attr('fill', me.color);

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