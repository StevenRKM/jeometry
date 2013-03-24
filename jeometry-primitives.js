(function( jeometry, undefined ) {
    /*
     Everything is based around these primitives: points, lines, segments, circles, ....
     They simply consist out of their basic elements amd a type.
     */

    var POINT = 100;
    var SEGMENT = 200;
    var LINE = 201;
    var RAY = 202;
    var RECTANGLE = 300;
    var TRIANGLE = 301;
    var CIRCLE = 302;
    var POLYGON = 303;

    var point = function(x, y) {
        return {x:x, y:y, type:POINT};
    };

    var segment = function(p1, p2) {
        return {p1:p1, p2:p2, type:SEGMENT};
    };

    var line = function(p1, p2) {
        return {p1:p1, p2:p2, type:LINE};
    };

    var triangle = function(p1, p2, p3) {
        return {p1:p1, p2:p2, p3:p3, type:TRIANGLE};
    };

    var polygon = function(points) {
        return {points:points, type:POLYGON};
    };

    // tie to namespace
    jeometry.primitives = {
        POINT:POINT,
        SEGMENT:SEGMENT,
        LINE:LINE,
        RAY:RAY,
        RECTANGLE:RECTANGLE,
        TRIANGLE:TRIANGLE,
        CIRCLE:CIRCLE,
        POLYGON:POLYGON,
        point:point,
        segment:segment,
        line:line,
        triangle:triangle,
        polygon:polygon
    }

}( window.jeometry = window.jeometry || {} ));
