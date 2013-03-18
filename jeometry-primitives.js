(function( jeometry, undefined ) {
    /*
     Everything is based around these primitives: points, lines, segments, circles, ....
     They simply consist out of their basic elements amd a type.
     */

    // sub-namespace
    jeometry.primitives = {};

    jeometry.PRIMITIVE_POINT = 100;
    jeometry.PRIMITIVE_SEGMENT = 200;
    jeometry.PRIMITIVE_LINE = 201;
    jeometry.PRIMITIVE_RAY = 202;
    jeometry.PRIMITIVE_RECTANGLE = 300;
    jeometry.PRIMITIVE_TRIANGLE = 301;
    jeometry.PRIMITIVE_CIRCLE = 302;
    jeometry.PRIMITIVE_POLYGON = 303;

    jeometry.primitives.point = function(x, y) {
        return {x:x, y:y, type:jeometry.PRIMITIVE_POINT};
    };

    jeometry.primitives.segment = function(p1, p2) {
        return {p1:p1, p2:p2, type:jeometry.PRIMITIVE_SEGMENT};
    };

    jeometry.primitives.line = function(p1, p2) {
        return {p1:p1, p2:p2, type:jeometry.PRIMITIVE_LINE};
    };

    jeometry.primitives.triangle = function(p1, p2, p3) {
        return {p1:p1, p2:p2, p3:p3, type:jeometry.PRIMITIVE_TRIANGLE};
    };

    jeometry.primitives.polygon = function(points) {
        return {points:points, type:jeometry.PRIMITIVE_POLYGON};
    };

}( window.jeometry = window.jeometry || {} ));
