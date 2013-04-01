(function( jeometry, undefined ) {

    jeometry.normal = function(line) {
        var dx = line.p2.x - line.p1.x;
        var dy = line.p2.y - line.p1.y;

        return jeometry.primitives.segment(
            jeometry.primitives.point(-dy+line.p2.x, dx+line.p2.y),
            jeometry.primitives.point(line.p2.x, line.p2.y)
        );

    };

    jeometry.reflection = function(segment1, segment2) {
        var p = jeometry.intersection.get(segment1, segment2);
        if(p==undefined)
            return undefined;

        var vector_v = segment1.p1.subtract(p);
        var vector_s = segment2.p1.subtract(p);

        var normal = jeometry.primitives.segment(vector_s, jeometry.primitives.point(0,0)).normal();
        var vector_n = normal.p1.negate().normalize();

        var dot = vector_n.dot_product(vector_v);
        var vector_dot = vector_n.multiply_scalar(dot);

        return jeometry.primitives.segment(p, vector_v.negate().add(vector_dot.multiply_scalar(2)).add(p));

    };

}( window.jeometry = window.jeometry || {} ));
