(function( jeometry, undefined ) {

    var int = function(min, max) {
        // [min, max] ==> min <= x <= max
        return Math.floor((Math.random()*(max-min+1))+min);
    };

    var pointInBox = function(x, y, width, height) {
        // [min, max] ==> min <= x <= max
        return point(int(x, x+width), int(y, y+height));
    };

    // tie to namespace
    jeometry.random = {
        int:int,
        pointInBox:pointInBox
    };

}( window.jeometry = window.jeometry || {} ));

