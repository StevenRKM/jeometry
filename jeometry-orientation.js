(function( jeometry, undefined ) {
    /*
    Every function that has to do with orientation.
        * To check the orientation of two primitives against eachother
        * To check if a primitive is in another primitive
    */

    var COLLINEAR = 0;
    var LEFT = 1;
    var RIGHT = 2;

    // TODO should accept any primitive combination
    var get = function(line, point) {
        /*
         method using determinant of a 2x2 matrix

         | a b |
         | c d | = ad - bc

         where
         a = p2.x - p1.x
         b = p2.y - p1.y
         c = p.x - p1.y
         d = p.y - p1.y

         */
        var test = (line.p2.x - line.p1.x) * (point.y - line.p1.y) - (point.x - line.p1.x) * (line.p2.y - line.p1.y);

        if (test > 0) return LEFT;
        else if (test < 0) return RIGHT;
        else return COLLINEAR;
    };

    // TODO should accept any primitive combination
    var inside = function(point, triangle) {
        /*
        For a point to be in a triangle, the orientation of the point to all sides should be the same.
        If a point is on a side, it counts as being in the triangle.
        */

        var orientation1 = jeometry.orientation.get(jeometry.primitives.line(triangle.p1, triangle.p2), point);
        if( orientation1 == COLLINEAR ) return true;

        var orientation2 = jeometry.orientation.get(jeometry.primitives.line(triangle.p2, triangle.p3), point);
        if( orientation1 == COLLINEAR ) return true;
        if( orientation1 != orientation2 ) return false;

        var orientation3 = jeometry.orientation.get(jeometry.primitives.line(triangle.p3, triangle.p1), point);
        if( orientation3 == COLLINEAR ) return true;
        if( orientation1 != orientation3 ) return false;

        return true;
    }

    // tie to namespace
    jeometry.orientation = {
        LEFT:LEFT,
        COLLINEAR:COLLINEAR,
        RIGHT:RIGHT,
        get:get,
        inside:inside
    }

}( window.jeometry = window.jeometry || {} ));
