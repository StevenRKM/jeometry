(function( jeometry, undefined ) {

    // TODO should accept any primitive combination
    var euclidean = function(p1, p2) {
        return Math.sqrt( Math.pow(p1.x-p2.x, 2) + Math.pow(p1.y-p2.y, 2) );
    };

    // TODO should accept any primitive combination
    var manhattan = function(p1, p2) {
        return Math.abs( p1.x-p2.x ) + Math.abs( p1.y-p2.y );
    };

    // tie to namespace
    jeometry.distance = {
        euclidean:euclidean,
        manhattan:manhattan
    }

}( window.jeometry = window.jeometry || {} ));
