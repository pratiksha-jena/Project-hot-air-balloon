var ground;
var balloon;
var database,position;
var height;
var backgroundImage,balloonImage;
function preload(){
backgroundImage=loadAnimation("image/Hot Air Ballon-01.png");
balloonImage=loadAnimation("image/Hot Air Ballon-02.png","image/Hot Air Ballon-03.png","image/Hot Air Ballon-04.png");
}
function setup() {
  database=firebase.database();
  createCanvas(1000,1000);

  ground=createSprite(100,100,500,500);
  ground.addAnimation("ground",backgroundImage);
  ground.scale=0.8;

  balloon=createSprite(400, 200, 50, 50);
  balloon.addAnimation("hotAirBalloon",balloonImage);
  balloon.scale=0.5;
  
  var balloonPosition=database.ref('balloon/height');
  balloonPosition.on("value",readHeight,showError);
}

function draw() {
  background("black");  
  
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage);
    writePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage);
    writePosition(1,0);
  }  
  else if(keyDown(UP_ARROW)){
   balloon.addAnimation("hotAirBalloon",balloonImage);
   writePosition(0,-1);
  } 
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage);
    writePosition(0,1);
  }
  
  drawSprites();
}

function writePosition(x,y){
  database.ref('balloon/height').set({
  'x' : height.x + x,
  'y' : height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}