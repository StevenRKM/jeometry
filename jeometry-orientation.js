(function( jeometry, undefined ) {
    /*
    Every function that has to do with orientation.
        * To check the orientation of two primitives against eachother
        * To check if a primitive is in another primitive
    */

    jeometry.ORIENTATION_COLLINEAR = 0;
    jeometry.ORIENTATION_LEFT = 1;
    jeometry.ORIENTATION_RIGHT = 2;

    // TODO should accept any primitive combination
    jeometry.orientation = function(line, point) {
        var test = (line.p2.x - line.p1.x) * (p.y - line.p1.y) - (p.x - line.p1.x) * (line.p2.y - line.p1.y);

        if (test > 0) return jeometry.ORIENTATION_LEFT;
        else if (test < 0) return jeometry.ORIENTATION_RIGHT;
        else  jeometry.ORIENTATION_COLLINEAR;
    };

    // TODO should accept any primitive combination
    jeometry.in = function(point, triangle) {
            /*
            For a point to be in a triangle, the orientation of the point to all sides should be the same.
            If a point is on a side, it counts as being in the triangle.
            */

            var orientation1 = jeometry.orientation(jeometry.primitives.line(triangle.p1, triangle.p2), point);
            if( orientation1 == jeometry.ORIENTATION_COLLINEAR ) return true;

            var orientation2 = jeometry.orientation(jeometry.primitives.line(triangle.p2, triangle.p3), point);
            if( orientation1 == jeometry.ORIENTATION_COLLINEAR ) return true;
            if( orientation1 != orientation2 ) return false;

            var orientation3 = jeometry.orientation(jeometry.primitives.line(triangle.p3, triangle.p1), point);
            if( orientation3 == jeometry.ORIENTATION_COLLINEAR ) return true;
            if( orientation1 != orientation3 ) return false;

            return true;
        }

}( window.jeometry = window.jeometry || {} ));
