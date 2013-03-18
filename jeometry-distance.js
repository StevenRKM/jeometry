(function( jeometry, undefined ) {

    // sub-namespace
    jeometry.distance = {};

    // TODO should accept any primitive combination
    jeometry.distance.euclidean = function(p1, p2) {
        return Math.sqrt( Math.pow(p1.x-p2.x, 2) + Math.pow(p1.y-p2.y, 2) );
    };

    // TODO should accept any primitive combinationfunction distance(p1, p2) {
    jeometry.distance.manhattan = function(p1, p2) {
        return Math.abs( p1.x-p2.x ) + Math.abs( p1.y-p2.y );
    };

}( window.jeometry = window.jeometry || {} ));
