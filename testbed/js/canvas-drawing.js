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
drawFunctions[SHAPE_POINT] = function(element) {drawPoint(element.shape);};
drawFunctions[SHAPE_SEGMENT] = function(element) {drawLine(element.shape);};
drawFunctions[SHAPE_LINE] = function(element) {drawLine(element.shape);};
drawFunctions[SHAPE_TRIANGLE] = function(element) {drawTriangle(element.shape);};
drawFunctions[SHAPE_POLYGON] = function(element) {drawPolygon(element.shape);};


function addSceneElement(shape, draw) {
    // if not customized, attach
    if(draw == undefined) {
        draw = drawFunctions[shape.type];
    }
    scene.push({'shape':shape, 'draw':draw})
}

// DRAW

function redraw() {
    context.clearRect(0,0,width,height);
    for(i in scene) {
        element = scene[i];
        element.draw(element);
    }
}

function drawPoint(shape) {
    drawCircle( shape, 5);
    drawCoords(shape);
}

function drawCoords(shape) {
    if(checkboxButtonValues["coordinates"]) {
        drawText(shape.x+", "+shape.y, pointAdd(shape, point(10,-10)));
    }
}

function drawLine(shape) {
    context.beginPath();
    context.moveTo(shape.p1.x,shape.p1.y);
    context.lineTo(shape.p2.x,shape.p2.y);
    context.lineWidth=1;
    context.stroke();
    context.closePath();

    if( checkboxButtonValues["distances"]) {
        setFillColor("green");
        drawText( Math.floor( distance(shape.p1, shape.p2) ), pointAdd(shape.p1, point(20,20)));
        previousFillColor();
    }

    drawCoords(shape.p1);
    drawCoords(shape.p2);
}

function drawTriangle(shape) {
    // TODO improve by using one path, not 3
    drawLine(segment(shape.p1, shape.p2));
    drawLine(segment(shape.p2, shape.p3));
    drawLine(segment(shape.p3, shape.p1));
}

function drawPolygon(shape) {
    console.log(shape);


    context.beginPath();

    for(i in shape.points) {
        if(i == 0) {
            console.log("move to");
            console.log(shape.points[i]);
            context.moveTo(shape.points[i].x,shape.points[i].y);
        } else {
            console.log("line to");
            console.log(shape.points[i]);
            context.lineTo(shape.points[i].x,shape.points[i].y);
        }
    }

    console.log("line to");
    console.log(shape.points[0]);

    context.lineTo(shape.points[0].x,shape.points[0].y);
    context.lineWidth=1;
    context.stroke();
    context.fill();
    context.closePath();

    for(i in shape.points) {
        console.log("coords");
        console.log(shape.points[i]);

        drawCoords(shape.points[i]);
    }
}

function drawCircle(shape, size) {
    context.beginPath();
    context.arc(shape.x, shape.y, size, 0, Math.PI*2, false);
    context.closePath();

    context.fill();
}

function drawText(text, shape) {
    context.fillText(text, shape.x, shape.y);
}

function clear() {
    scene.splice(0, scene.length);
    context.clearRect(0,0,width,height);
}