/* globals windmill */

// SVG Translation
windmill.svg.translate = function(dx, dy) {
    return 'translate(' + [dx, dy] + ')';
};

// SVG Scale
windmill.svg.scale = function(sx, sy) {
    if (arguments.length < 2) { sy = sx; }
    return 'scale(' + [sx, sy] + ')';
};