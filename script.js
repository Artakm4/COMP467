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

//Element Retrievers
var brush = document.getElementById("brush"); //Retrieve Brush
var eraser = document.getElementById("erase"); //Retrieve Eraser
var reset = document.getElementById("reset"); // Retrieve Reset
var savelink = document.getElementById("saveLink"); //Retrieve Save Image element

//Default Color Conditions, makes color update and eraser work
var color = document.getElementById("myColor");
var myColor = color.value;
ctx.strokeStyle = myColor;
color.addEventListener("change", colorChange);

//Update Color upon new color selection
function colorChange(){
    myColor = color.value;
    ctx.strokeStyle = myColor;
}
//End Color Selections

//Set initial Brush conditions
var size = document.getElementById("myRange");
var mySize = size.value;
ctx.lineWidth = mySize;
size.addEventListener("change",sizeChange);//Event listener for size change

//update size whenever selection is changed
function sizeChange(){
    mySize = size.value;
    ctx.lineWidth = mySize;
}

//functions for brush to work
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
    
    //Border style of buttons put nones before border
    eraser.style.border = "none";
    brush.style.border = "2px solid red";
    
    
    canvas.addEventListener("mousedown",brushDown,false);
    canvas.addEventListener("mousemove",brushMove,false);
    canvas.addEventListener("mouseup",brushUp,false);
}
//End of Brush functions

//Start of Eraser functions
function eraserClick(){
    ctx.strokeStyle = "white";
    //Give border to button made sure to unselect all buttons in future
    brush.style.border = "none";
    eraser.style.border = "2px solid red";
    
    canvas.addEventListener("mousedown",brushDown,false);
    canvas.addEventListener("mousemove",brushMove,false);
    canvas.addEventListener("mouseup",brushUp,false);
}

//End of Eraser functions

// Reset Button Function
function resetClick() {
    window.location.reload();
}
//End Reset Button Functions

//Save Image Button Function
function saveClick() {
    var data = canvas.toDataURL();
    saveLink.href = data;
    saveLink.download = "myImage.png";
}
//End Save Image Button Functions

//Event Listener for all tools
brush.addEventListener("click",brushClick); //Starts brush event on click
erase.addEventListener("click",eraserClick); //Start eraser event on click
reset.addEventListener("click",resetClick); //Start Reset Click Event
saveLink.addEventListener("click",saveClick); //Start Save Click Event
