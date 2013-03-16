var SHAPE_POINT=1;
var SHAPE_SEGMENT=2;
var SHAPE_LINE=3;
var SHAPE_TRIANGLE=4;
var SHAPE_POLYGON=5;

function point(x, y) {
    return {'x':x, 'y':y, 'type':SHAPE_POINT}
}

function segment(p1, p2) {
    return {'p1':p1, 'p2':p2, 'type':SHAPE_SEGMENT}
}

function line(p1, p2) {
    return {'p1':p1, 'p2':p2, 'type':SHAPE_LINE}
}

function triangle(p1, p2, p3) {
    return {'p1':p1, 'p2':p2, 'p3':p3, 'type':SHAPE_TRIANGLE}
}

function polygon(points) {
    return {'points':points, 'type':SHAPE_POLYGON}
}