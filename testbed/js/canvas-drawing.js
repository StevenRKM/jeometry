var canvas, context;
var width, height

// color stacks
var fillColors = Array();
var strokeColors = Array();

var scene = Array();

// INIT

function initCanvas(params) {
    /*
     params:
         (required) canvas
         mouse:
             move
             down
             up
             out
     */

    canvas = $(params.canvas)[0];

    context = canvas.getContext("2d");
    context.font = "30px sans-serif";
    setFillColor("orange");
    setStrokeColor("red");
    width = canvas.width;
    height = canvas.height;

    if( params.mouse != undefined ) {
        if(params.mouse.move != undefined) canvas.addEventListener("mousemove",function(e){ params.mouse.move( mousePosition(e) ); },false);
        if(params.mouse.down != undefined) canvas.addEventListener("mousedown",function(e){ params.mouse.down( mousePosition(e) ); },false);
        if(params.mouse.up != undefined) canvas.addEventListener("mouseup",function(e){ params.mouse.up( mousePosition(e) ); },false);
        if(params.mouse.out != undefined) canvas.addEventListener("mouseout",function(e){ params.mouse.out( mousePosition(e) ); },false);
    }

}

// COLORS

function setFillColor(color) {
    fillColors.push(color);
    context.setFillColor(color);
}

function previousFillColor() {
    fillColors.pop();
    context.setFillColor(fillColors[fillColors.length-1]);
}

function setStrokeColor(color) {
    strokeColors.push(color);
    context.setStrokeColor(color);
}

function previousStrokeColor() {
    strokeColors.pop();
    context.setStrokeColor(strokeColors[strokeColors.length-1]);
}

// SCENE
var drawFunctions = {};
drawFunctions[jeometry.primitives.POINT] = function(element) {drawPoint(element.primitive);};
drawFunctions[jeometry.primitives.SEGMENT] = function(element) {drawLine(element.primitive);};
drawFunctions[jeometry.primitives.LINE] = function(element) {drawLine(element.primitive);};
drawFunctions[jeometry.primitives.TRIANGLE] = function(element) {drawTriangle(element.primitive);};
drawFunctions[jeometry.primitives.POLYGON] = function(element) {drawPolygon(element.primitive);};


function addSceneElement(primitive, draw) {
    // if not customized, attach
    if(draw == undefined) {
        draw = drawFunctions[primitive.type];
    }
    scene.push({'primitive':primitive, 'draw':draw})
}

// DRAW

function redraw() {
    context.clearRect(0,0,width,height);
    for(i in scene) {
        element = scene[i];
        element.draw(element);
    }
}

function drawPoint(primitive) {
    drawCircle( primitive, 5);
    drawCoords(primitive);
}

function drawCoords(primitive) {
    if(checkboxButtonValues["coordinates"]) {
        drawText(Math.floor(primitive.x)+", "+Math.floor(primitive.y), primitive.add(jeometry.primitives.point(10,-10)));
    }
}

function drawLine(primitive) {
    context.beginPath();
    context.moveTo(primitive.p1.x,primitive.p1.y);
    context.lineTo(primitive.p2.x,primitive.p2.y);
    context.lineWidth=1;
    context.stroke();
    context.closePath();

    if( checkboxButtonValues["distances"]) {
        setFillColor("green");
        drawText( Math.floor( distance(primitive.p1, primitive.p2) ), primitive.p1.add(jeometry.primitives.point(20,20)));
        previousFillColor();
    }

    drawCoords(primitive.p1);
    drawCoords(primitive.p2);
}

function drawTriangle(primitive) {
    // TODO improve by using one path, not 3
    drawLine(jeometry.primitives.segment(primitive.p1, primitive.p2));
    drawLine(jeometry.primitives.segment(primitive.p2, primitive.p3));
    drawLine(jeometry.primitives.segment(primitive.p3, primitive.p1));
}

function drawPolygon(primitive) {

    context.beginPath();

    for(i in primitive.points) {
        if(i == 0) {
            context.moveTo(primitive.points[i].x,primitive.points[i].y);
        } else {
            context.lineTo(primitive.points[i].x,primitive.points[i].y);
        }
    }

    context.lineTo(primitive.points[0].x,primitive.points[0].y);
    context.lineWidth=1;
    context.stroke();
    context.fill();
    context.closePath();

    for(i in primitive.points) {
        drawCoords(primitive.points[i]);
    }
}

function drawCircle(primitive, size) {
    context.beginPath();
    context.arc(primitive.x, primitive.y, size, 0, Math.PI*2, false);
    context.closePath();

    context.fill();
}

function drawText(text, primitive) {
    context.fillText(text, primitive.x, primitive.y);
}

function clear() {
    scene.splice(0, scene.length);
    context.clearRect(0,0,width,height);
}

function RGBAColor(r, g, b, alpha) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.alpha = alpha;
}

RGBAColor.prototype.setFromHSV = function(h, s, v, alpha) {
    // h = [0,360], s = [0,1], v = [0,1]
    h = h % 360;

    if (h < 0) {
        h += 360;
    }

    var c = v * s;
    var h1 = h / 60;
    var x = c * (1 - Math.abs(h1%2 - 1));
    var r1, g1, b1;

    switch (Math.floor(h1)) {
        case 0: r1 = c; g1 = x; b1 = 0; break;
        case 1: r1 = x; g1 = c; b1 = 0; break;
        case 2: r1 = 0; g1 = c; b1 = x; break;
        case 3: r1 = 0; g1 = x; b1 = c; break;
        case 4: r1 = x; g1 = 0; b1 = c; break;
        case 5: r1 = c; g1 = 0; b1 = x; break;
    }

    var m = v - c;

    this.r = Math.floor((r1 + m) * 255);
    this.g = Math.floor((g1 + m) * 255);
    this.b = Math.floor((b1 + m) * 255);
    this.alpha = alpha;
}

RGBAColor.prototype.setRGBA = function(r, g, b, alpha) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.alpha = alpha;
}
