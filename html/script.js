/*declare canvas and its context, make it change when window is resized*/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var mouse = false;

/*for brush*/
ctx.lineJoin = "round";
ctx.lineCap = "round";

/*keep track of mouse*/
var positionX,positionY;

//Bush Tool
var brush = document.getElementById("brush");
//functions for bush to work

function getCoordinates(canvas, e){
    var rect = canvas.getBoundingClientRect();
    return {
        x:e.clientX - rect.left,
        y:e.clientY - rect.top
    };
}

function brushDraw(canvas, positionX, positionY){
    if(mouse){
        ctx.lineTo(positionX,positionY);
        ctx.stroke();
        canvas.style.cursor = "pointer";
    }
}

function brushMove(e){
    var coordinates = getCoordinates(canvas,e);
    positionX = coordinates.x;
    positionY = coordinates.y;
    brushDraw(canvas, positionX, positionY);
    
}

function brushDown(e){
    mouse = true;
    var coordinates = getCoordinates(canvas,e);
    canvas.style.cursor = "pointer";
    positionX = coordinates.x;
    positionY = coordinates.y;
    ctx.beginPath();
    ctx.moveTo(positionX,positionY);
    ctx.lineTo(positionX,positionY);
    ctx.stroke();
}

function brushUp(){
    mouse = false;
    canvas.style.cursor = "default";
}

function brushClick(){
    //get color of brush
    var brushColor = document.getElementById("myColor");
    ctx.strokeStyle = brushColor.value;
    brush.style.border = "2px solid red";
    
    canvas.addEventListener("mousedown",brushDown,false); //will happen in bubble phase
    canvas.addEventListener("mousemove",brushMove,false);
    canvas.addEventListener("mouseup",brushUp,false);
}
//waits for click on canvas
brush.addEventListener("click",brushClick);

