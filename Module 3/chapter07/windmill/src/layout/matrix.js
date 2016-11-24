// Matrix Layout
windmill.layout.matrix = function() {
    'use strict';

    // Default Accessors
    var attributes = {
        row: function(d) { return d.row; },
        column: function(d) { return d.column; },
        value: function(d) { return d.value; },
        aggregate: function(values) {
            var sum = 0;
            values.forEach(function(d) { sum += d; });
            return sum;
        }
    };

    // layout function
    function layout(data) {

        // Array to group and aggregate the data
        var groupedData = [];

        var row, col, val,
            found = false;

        // Grouping
        data.forEach(function(d) {

            // Compute the row, column and value for each data item
            row = attributes.row(d);
            col = attributes.column(d);
            val = attributes.value(d);

            // Search the grouped array to find the item with the
            // row and column
            found = false;
            groupedData.forEach(function(item, idx) {
                if ((item.row === row) && (item.col === col)) {
                    item.values.push(val);
                    found = true;
                }
            });

            // Append the item, if not found
            if (!found) {
                groupedData.push({row: row, col: col, values: [val]});
            }
        });

        // Aggregation
        groupedData.forEach(function(d) {
            // Aggregate the values array
            d.value = attributes.aggregate(d.values);
            delete d.values;
        });

        return groupedData;
    }

    // Create accessor functions
    function createAccessor(attr) {
        function accessor(value) {
            if (!arguments.length) { return attributes[attr]; }
            attributes[attr] = value;
            return layout;
        }
        return accessor;
    }

    // Generate automatic accessors for each attribute
    for (var attr in attributes) {
        if ((!layout[attr]) && (attributes.hasOwnProperty(attr))) {
            layout[attr] = createAccessor(attr);
        }
    }

    return layout;
};
