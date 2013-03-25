(function( jeometry, undefined ) {
    /*
    Every function that has to do with orientation.
        * To check the orientation of two primitives against eachother
        * To check if a primitive is in another primitive
    */

    var COLLINEAR = 0;
    var LEFT = 1;
    var RIGHT = 2;

    var get = function(primitive1, primitive2) {
        try{
            return _orientation_functions.get(primitive1.type, primitive2.type)(primitive1, primitive2);
        } catch(e) {
            return undefined;
        }
    };

    var point_to_line = function(point, line) {
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

    var inside = function(primitive1, primitive2) {
        try{
            return _orientation_functions.get(primitive1.type, primitive2.type)(primitive1, primitive2);
        } catch(e) {
            // this will happen when asked if a primitive fits into a POINT, this of course can never be true
            return false;
        }
    };

    var point_in_triangle = function(point, triangle) {
        /*
         For a point to be in a triangle, the orientation of the point to all sides should be the same.
         If a point is on a side, it counts as being in the triangle.
         */

        var orientation1 = get(jeometry.primitives.line(triangle.p1, triangle.p2), point);
        if( orientation1 == COLLINEAR ) return true;

        var orientation2 = get(jeometry.primitives.line(triangle.p2, triangle.p3), point);
        if( orientation1 == COLLINEAR ) return true;
        if( orientation1 != orientation2 ) return false;

        var orientation3 = get(jeometry.primitives.line(triangle.p3, triangle.p1), point);
        if( orientation3 == COLLINEAR ) return true;
        if( orientation1 != orientation3 ) return false;

        return true;
    }

    var _orientation_functions = jeometry.utils.create_2d_lookup([
        {key1: jeometry.primitives.POINT, key2: jeometry.primitives.LINE, value: point_to_line },
        {key1: jeometry.primitives.POINT, key2: jeometry.primitives.SEGMENT, value: point_to_line },

        // reversed parameters
        {key1: jeometry.primitives.LINE, key2: jeometry.primitives.POINT, value: function(i, j) {return point_to_line(j, i);} },
        {key1: jeometry.primitives.SEGMENT, key2: jeometry.primitives.POINT, value: function(i, j) {return point_to_line(j, i);} },
    ]);

    var _inside_functions = jeometry.utils.create_2d_lookup([
        {key1: jeometry.primitives.POINT, key2: jeometry.primitives.TRIANGLE, value: point_in_triangle },
    ]);

    // tie to namespace
    jeometry.orientation = {
        _orientation_functions:_orientation_functions,
        LEFT:LEFT,
        COLLINEAR:COLLINEAR,
        RIGHT:RIGHT,
        get:get,
        point_to_line:point_to_line,
        inside:inside,
        point_in_triangle:point_in_triangle
    }

}( window.jeometry = window.jeometry || {} ));
