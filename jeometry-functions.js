// OBJECT OPERATIONS

function pointAdd(p1, p2) {
    return point(p1.x+p2.x, p1.y+p2.y);
}

// OBJECT CALCULATIONS

function distance(p1, p2) {
    return Math.sqrt( Math.pow(p1.x-p2.x, 2) + Math.pow(p1.y-p2.y, 2) );
}

function distanceManhattan(p1, p2) {
    return Math.abs( Math.pow(p1.x-p2.x) + Math.pow(p1.y-p2.y) );
}

var ORIENTATION_LEFT = 1;
var ORIENTATION_RIGHT = 2;
var ORIENTATION_COLLINEAR = 3;

function orientation(p1, p2, p) {
    test = (p2.x - p1.x) * (p.y - p1.y) - (p.x - p1.x) * (p2.y - p1.y);

    if (test > 0) return ORIENTATION_LEFT;
    else if (test < 0) return ORIENTATION_RIGHT;
    else  ORIENTATION_COLLINEAR;
}

function intersect(line1, line2) {
    /*
    returns the point of intersection, if there is one
    return: point | false
     */

    x1 = line1.p1.x; y1 = line1.p1.y;
    x2 = line1.p2.x; y2 = line1.p2.y;
    x3 = line2.p1.x; y3 = line2.p1.y;
    x4 = line2.p2.x; y4 = line2.p2.y;
    

    ax = x2 - x1;
    bx = x3 - x4;

    lowerx = undefined;
    upperx = undefined;
    uppery = undefined;
    lowery = undefined;

    if (ax < 0)
    {
        lowerx = x2;
        upperx = x1;
    }
    else
    {
        upperx = x2;
        lowerx = x1;
    }

    if (bx > 0)
    {
        if ((upperx < x4) || (x3 < lowerx))
            return false;
    }
    else if ((upperx < x3) || (x4 < lowerx))
        return false;

    ay = y2 - y1;
    by = y3 - y4;

    if (ay < 0)
    {
        lowery = y2;
        uppery = y1;
    }
    else
    {
        uppery = y2;
        lowery = y1;
    }

    if (by > 0)
    {
        if ((uppery < y4) || (y3 < lowery))
            return false;
    }
    else if ((uppery < y3) || (y4 < lowery))
        return false;

    cx = x1 - x3;
    cy = y1 - y3;
    d  = (by * cx) - (bx * cy);
    f  = (ay * bx) - (ax * by);

    if (f > 0)
    {
        if ((d < 0) || (d > f))
            return false;
    }
    else if ((d > 0) || (d < f))
        return false;

    e = (ax * cy) - (ay * cx);

    if (f > 0)
    {
        if ((e < 0) || (e > f))
            return false;
    }
    else if ((e > 0) || (e < f))
        return false;

    ratio = (ax * -by) - (ay * -bx);

    if (ratio != 0)
    {
        ratio = ((cy * -bx) - (cx * -by)) / ratio;
        return point(
            x1 + (ratio * ax),
            y1 + (ratio * ay));
    }
    else
    {
        if ( (ax * -cy) == (-cx * ay) )
        {
            return point(x3, y3);
        }
        else
        {
            return point(x4, y4);
        }
    }

    return true;
}

// TODO create shape.point and shape.line instead of point and line....
function point_in_triangle(p, t) {
    /*
    A point that lies in a triangle either lies on one side
    or lies on the same side of every side of the triangle
     */

    var orientation1 = orientation(t.p1, t.p2, p);
    if( orientation1 == ORIENTATION_COLLINEAR ) return true;

    var orientation2 = orientation(t.p2, t.p3, p);
    if( orientation1 == ORIENTATION_COLLINEAR ) return true;
    if( orientation1 != orientation2 ) return false;

    var orientation3 = orientation(t.p3, t.p1, p);
    if( orientation3 == ORIENTATION_COLLINEAR ) return true;
    if( orientation1 != orientation3 ) return false;

    return true;
}