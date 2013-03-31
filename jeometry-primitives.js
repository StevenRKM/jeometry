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
        return {x:x, y:y, type:POINT,
            add:function(p) {return point(this.x+p.x, this.y+p.y);},
            subtract:function(p) {return point(this.x-p.x, this.y-p.y);},
            multiply_scalar:function(scalar) {return point(this.x*scalar, this.y*scalar);},
            divide_scalar:function(scalar) {return point(this.x/scalar, this.y/scalar);},
            negate:function() {return point(-this.x, -this.y)},
            cross_product:function(p) {return (this.x * p.y) - (this.y * p.x);},
            dot_product:function(p) {return (this.x * p.y) + (this.y * p.y);},
            length:function() {return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) );},
            normalize:function() {var l=this.length(); return (l!=0)?this.divide_scalar(l):point(0,0);},
            clone:function() {return point(this.x, this.y);}
        };
    };

    var segment = function(p1, p2) {
        return {p1:p1, p2:p2, type:SEGMENT,
            normal:function() {return jeometry.normal(this);},
            point_on_segment:function(t) {return this.p1.add(this.p2.subtract(this.p1).multiply_scalar(t));},
            translate:function(p) {return segment(this.p1.add(p), this.p2.add(p))},
            length:function() {return jeometry.distance.euclidean(this.p1, this.p2);},
            clone:function() {return segment(this.p1.clone(),this.p2.clone())}
        };
    };

    var line = function(p1, p2) {
        return {p1:p1, p2:p2, type:LINE};
    };

    var triangle = function(p1, p2, p3) {
        return {p1:p1, p2:p2, p3:p3,
            side1: segment(p1, p2),
            side2: segment(p2, p3),
            side3: segment(p3, p1),
            type:TRIANGLE};
    };

    var polygon = function(points) {
        var sides = [];
        for(var i in points) {
            sides.push(segment(points[i], points[(i+1)%points.length]))
        }
        return {points:points, sides:sides, type:POLYGON};
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
