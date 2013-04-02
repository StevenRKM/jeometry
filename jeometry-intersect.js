(function( jeometry, undefined ) {

    var get = function(primitive1, primitive2) {
        try{
            return _functions.get(primitive1.type, primitive2.type)(primitive1, primitive2);
        } catch(e) {
            return undefined;
        }
    };

    var segments = function(segment1, segment2) {
        /*
         method using cross products

         segments
         p + tr, with t element of [0, 1]
         q + us, with s element of [0, 1]

         intersection
         p + tr = q + us
         (p + tr) x s = (q + us) x s
         (p x s) + (tr x s) = q x s  // s x s = 0
         t (r x s) = q x s - p x s
         t (r x s) = (q - p) x s
         t = (q - p) x s / (r x s)

         thus
         if r x s = 0 => parallel segments

         */

        // --- fast bounding box checks

        // TODO could be used for intersect of two AABB's

        // check x-axis

        var d1 = segment1.p2.x - segment1.p1.x;
        var d2 = segment2.p2.x - segment2.p1.x;

        var upper1 = (d1 < 0) ? segment1.p1.x : segment1.p2.x;
        var lower1 = (d1 < 0) ? segment1.p2.x : segment1.p1.x;
        var upper2 = (d2 < 0) ? segment2.p1.x : segment2.p2.x;
        var lower2 = (d2 < 0) ? segment2.p2.x : segment2.p1.x;

        if(upper1 < lower2 || upper2 < lower1)
            return undefined;

        // check y-ayis

        var d1 = segment1.p2.y - segment1.p1.y;
        var d2 = segment2.p2.y - segment2.p1.y;

        var upper1 = (d1 < 0) ? segment1.p1.y : segment1.p2.y;
        var lower1 = (d1 < 0) ? segment1.p2.y : segment1.p1.y;
        var upper2 = (d2 < 0) ? segment2.p1.y : segment2.p2.y;
        var lower2 = (d2 < 0) ? segment2.p2.y : segment2.p1.y;

        if(upper1 < lower2 || upper2 < lower1)
            return undefined;

        // --- cross product intersection

        var p = segment1.p1;
        var r = segment1.p2.subtract(segment1.p1);
        var q = segment2.p1;
        var s = segment2.p2.subtract(segment2.p1);

        var r_x_s = r.cross_product(s);

        // parallel
        if(r_x_s == 0)
            return undefined;

        var q_p = q.subtract(p);
        var q_p_x_s = q_p.cross_product(s);

        if(q_p_x_s == 0)
            return undefined;

        var t = q_p_x_s / r_x_s;

        if( t < 0 || t > 1)
            return undefined;

        var q_p_x_r = q_p.cross_product(r);

        if(q_p_x_r == 0)
            return undefined;

        var u = q_p_x_r / r_x_s;

        if( u < 0 || u > 1)
            return undefined;

        return p.add(r.multiply_scalar(t));
    };

    var triangle_with_segment = function(triangle, segment) {
        /*
         easy algorithm, based upon the intersection of segments
         can return 0, 1 or 2 intersection points:
         0 = undefined
         1 = [point]
         2 = [point1, point2]
         */

        var intersections = new Array();
        var i = segments(triangle.side1, segment);
        if(i != undefined) intersections.push(i);
        i = segments(triangle.side2, segment);
        if(i != undefined) intersections.push(i);
        i = segments(triangle.side3, segment);
        if(i != undefined) intersections.push(i);

        if(intersections.length == 0) {
            return undefined;
        }

        return intersections;
    };

    var _functions = jeometry.utils.create_2d_lookup([
        {key1: jeometry.primitives.SEGMENT, key2: jeometry.primitives.SEGMENT, value: segments },
        {key1: jeometry.primitives.TRIANGLE, key2: jeometry.primitives.SEGMENT, value: triangle_with_segment },

        // reversed parameters
        {key1: jeometry.primitives.SEGMENT, key2: jeometry.primitives.TRIANGLE, value: function(i, j) {return triangle_with_segment(j, i);} }
    ]);

    jeometry.intersection = {
        _functions:_functions,
        get:get,
        segments:segments,
        triangle_with_segment:triangle_with_segment
    }

}( window.jeometry = window.jeometry || {} ));
