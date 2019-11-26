/*declare canvas and its context, make it change when window is resized*/
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");

var mouse = false;

var circleSelectBool = false;
var circleSelectTool = false;

var triangleSelectBool = false;
var triangleSelectActivate = false;

/*for brush*/
context.lineJoin = "round";
context.lineCap = "round";

/*keep track of mouse*/
var positionX, positionY;

//Element Retrievers
var brush = document.getElementById("brush"); //Retrieve Brush
var eraser = document.getElementById("erase"); //Retrieve Eraser

var circleSelectTool = document.getElementById("circle-tool");
var triangleSelectTool = document.getElementById("triangle-tool");

var reset = document.getElementById("reset"); // Retrieve Reset
var savelink = document.getElementById("saveLink"); //Retrieve Save Image element

//Default Color Conditions, makes color update and eraser work
var color = document.getElementById("myColor");
var myColor = color.value;
context.strokeStyle = myColor; //have stroke equal the color
color.addEventListener("change", colorChange);

//Update Color upon new color selection
function colorChange(){
    myColor = color.value;
    context.strokeStyle = myColor;
}
//End Color Selections

//Set initial Brush conditions
var size = document.getElementById("myRange");
var circleSize = document.getElementById("myRange-circle");

var mySize = size.value;
var mySizeCircle = circleSize.value;

context.lineWidth = mySize;

size.addEventListener("change",sizeChange);//Event listener for size change
circleSize.addEventListener("change", circleSizeChange);


//update size whenever selection is changed
function sizeChange(){
    mySize = size.value;
    context.lineWidth = mySize;
}

function circleSizeChange(){
    mySizeCircle = circleSize.value
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
    circleSelectBool = false;
    if(mouse){
        context.lineTo(positionX,positionY);
        context.stroke();
        canvas.style.cursor = "pointer";
    }
}

function brushMove(e){
    circleSelectBool = false;
    var coordinates = getCoordinates(canvas,e);
    positionX = coordinates.x;
    positionY = coordinates.y;
    brushDraw(canvas, positionX, positionY);
}

function brushDown(e){
    circleSelectBool = false;
    mouse = true;
    var coordinates = getCoordinates(canvas,e);
    canvas.style.cursor = "pointer";
    positionX = coordinates.x;
    positionY = coordinates.y;
    context.beginPath();
    context.moveTo(positionX,positionY);
    context.lineTo(positionX,positionY);
    context.stroke();
}

function brushUp(){
    circleSelectBool = false;
    mouse = false;
    canvas.style.cursor = "default";
}

let n = 50;

function createCircle(e) {
    var coordinates = getCoordinates(canvas,e);
    positionX = coordinates.x;
    positionY = coordinates.y;
    canvas.style.cursor = "pointer";

    context.beginPath(); //Begins a new path. Comment out to add to the current path. 
    context.arc(positionX, positionY, mySizeCircle, 0, 2 * Math.PI);

    context.stroke();
    context.closePath();
}

var n1=0;
function createTriangle(e) {
    var coordinates = getCoordinates(canvas,e);
    positionX = coordinates.x;
    positionY = coordinates.y;
    canvas.style.cursor = "pointer";

    var circleSize = 50;
    
    //var height = circleSize * (Math.sqrt(3*positionX)/(2*positionY)); 
    var height = circleSize * (Math.sqrt(3)/2);
    
    context.beginPath();
        
    //create triangle
    /*context.moveTo(positionX, positionY);
    context.lineTo(positionX, 3*positionY);
    context.lineTo(3*positionX, 3*positionY);*/

    context.translate(positionX, positionY);
    n1+= 150;
    //context.moveTo(0, -height / 2);
    context.moveTo(0, -height / 2); //was -height - 2nd arg
    context.lineTo( -circleSize / 2, height / 2);
    context.lineTo(circleSize / 2, height / 2);
    context.lineTo(0, -height / 2);
    context.closePath();

    //fill triangle
    context.stroke();
    context.fill(); 
    
    context.translate(-positionX, -positionY); //reset position so that the triangle can be drawn at where the cursor is

}

function brushClick(){
    circleSelectBool = false;
    canvas.removeEventListener("click",createCircle); 
    //get color of brush
    var brushColor = document.getElementById("myColor");
    context.strokeStyle = brushColor.value;
    
    //Border style of buttons put nones before border
    eraser.style.border = "none";
    circleSelectTool.style.border = "none";
    brush.style.border = "2px solid red";
     
    canvas.addEventListener("mousedown",brushDown,false);
    canvas.addEventListener("mousemove",brushMove,false);
    canvas.addEventListener("mouseup",brushUp,false);
}
//End of Brush functions

//Start of Eraser functions
function eraserClick(){
    circleSelectBool = false;
    triangleSelectBool = false;

    canvas.removeEventListener("click",createCircle); 
    canvas.removeEventListener("click",createTriangle); 


    context.strokeStyle = "white";
    //Give border to button made sure to unselect all buttons in future
    brush.style.border = "none";
    circleSelectTool.style.border = "none";
    triangleSelectTool.style.border = "none";

    eraser.style.border = "2px solid red";
    
    canvas.addEventListener("mousedown",brushDown,false);
    canvas.addEventListener("mousemove",brushMove,false);
    canvas.addEventListener("mouseup",brushUp,false);
}

function circleSelect() {
    triangleSelectBool = false;
    canvas.removeEventListener("click",createTriangle); 
    
    canvas.removeEventListener("mousedown",brushDown);
    canvas.removeEventListener("mousemove",brushMove);
    canvas.removeEventListener("mouseup",brushUp);
    
    context.strokeStyle = color.value;

    circleSelectBool = true;

    let circleSelectActivate = true;
    //context.strokeStyle = "black";
    //Give border to button made sure to unselect all buttons in future
    brush.style.border = "none";
    eraser.style.border = "none";
    triangleSelectTool.style.border = "none"

    circleSelectTool.style.border = "2px solid red";

    if ( (circleSelectBool === true) && (circleSelectActivate === true) ) {
        canvas.addEventListener("click",createCircle,false); 
    }
};

function triangleSelect() {
    
    canvas.removeEventListener("mousedown",brushDown);
    canvas.removeEventListener("mousemove",brushMove);
    canvas.removeEventListener("mouseup",brushUp);

    context.strokeStyle = color.value;

    triangleSelectBool = true;
    triangleSelectActivate = true;

    //context.strokeStyle = "black";
    //Give border to button made sure to unselect all buttons in future
    brush.style.border = "none";
    eraser.style.border = "none";
    circleSelectTool.style.border = "none";

    triangleSelectTool.style.border = "2px solid red";

    if ( (triangleSelectBool === true) && (triangleSelectActivate === true) ) {
        canvas.addEventListener("click", createTriangle ,false); 
    }
};

//End of Eraser functions

// Reset Button Function
function resetClick() {
    circleSelectTool = false;
    canvas.removeEventListener("click",createCircle); 
    window.location.reload();
}
//End Reset Button Functions

//Save Image Button Function
function saveClick() {
    circleSelectTool = false;
    canvas.removeEventListener("click",createCircle); 
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

circleSelectTool.addEventListener("click", circleSelect); //Trigger event when clicking the circle select tool
triangleSelectTool.addEventListener("click", triangleSelect); //Trigger event when clicking the circle select tool
squareSelectTool.addEventListener("click", squareSelect); //Trigger event when clicking the circle select tool



 