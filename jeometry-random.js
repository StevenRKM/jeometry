(function( jeometry, undefined ) {

    // sub-namespace
    jeometry.random = {};

    jeometry.random.int = function(min, max) {
        // [min, max] ==> min <= x <= max
        return Math.floor((Math.random()*(max-min+1))+min);
    };

    jeometry.random.pointInBox = function(x, y, width, height) {
        // [min, max] ==> min <= x <= max
        return point( jeometry.random.int(x, x+width), jeometry.random.int(y, y+height) );
    };

}( window.jeometry = window.jeometry || {} ));

