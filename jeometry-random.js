
function random(min, max) {
    // [min, max] ==> min <= x <= max
    return Math.floor((Math.random()*(max-min+1))+min);
}

function randomPointInBox(x, y, width, height) {
    return point( random(x, x+width), random(y, y+height) );
}

