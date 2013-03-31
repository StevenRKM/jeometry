(function( jeometry, undefined ) {

    jeometry.normal = function(line) {
        var dx = line.p2.x - line.p1.x;
        var dy = line.p2.y - line.p1.y;

        return jeometry.primitives.segment(
            jeometry.primitives.point(-dy+line.p2.x, dx+line.p2.y),
            jeometry.primitives.point(line.p2.x, line.p2.y)
        );

    }

}( window.jeometry = window.jeometry || {} ));
