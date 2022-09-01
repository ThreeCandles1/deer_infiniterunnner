var PLAY = 1;
var END = 0;
var gameState = PLAY;
var deer, deerRunningImg, deerStillImg
var forestImg, forest
var plank
var score=0;
var planksGroup
var plankImg
var score=0;
var invisibleGround
var reset
var resetImg
var gameOver
var game_over
var deerCollided
function preload(){
deerRunningImg=loadAnimation("deer_running.png","deer_still.png")

forestImg= loadImage("forest2.png")

plankImg=loadImage("branch.png")

deerCollided=loadAnimation("deer_still.png")

game_over= loadImage("game_over.png")
resetImg= loadImage("reset.png")

}

function setup() {
 createCanvas(1200,300)
forest=createSprite(0,150);
forest.addImage(forestImg)
invisibleGround = createSprite(width/2,height+50,1200,100);  
invisibleGround.visible = false;
deer = createSprite(100,200);
deer.addAnimation("running",deerRunningImg)
deer.addAnimation("collided",deerCollided)
deer.changeAnimation("running")
  deer.scale=0.15
  deer.setCollider("circle",0,0,450);
 gameOver=createSprite(600,100,20,20)
 gameOver.addImage(game_over)
 gameOver.scale=0.1
 gameOver.visible=false
  restart= createSprite (600,150,50,50)
  restart.addImage(resetImg)
  restart.scale=0.04
  restart.visible=false
 // deer.velocityX = (6 + 3*score/100);
  
  planksGroup=new Group();
}

function draw() {
    background("black")
  
    console.log(forest.x)
    if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        forest.velocityX = -5;
    
        if(keyDown("SPACE") && deer.y  >= height-120) {
        
            deer.velocityY = -14;
        }
        deer.velocityY+=0.5
    if (forest.x<0){
        forest.x=width/2
    }
  
    if(planksGroup.isTouching(deer)){
      gameState = END;
  }
  spawnPlanks();
}


  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    deer.changeAnimation("collided")
    forest.velocityX = 0;
    deer.velocityY = 0;
    planksGroup.setVelocityXEach(0);

    if( mousePressedOver(restart)) {
    
      reset();
    
    }}
    
    deer.collide(invisibleGround);
   
    drawSprites();
    fill("black")
    textSize(20)
    text("Score: "+score,1050,50)
    }


    function spawnPlanks() {
        if(frameCount % 100 === 0) {
          var plank = createSprite(600,height-30,20,30);
          plank.setCollider("rectangle",30,0,70,20)
        plank.addImage(plankImg)
          plank.velocityX = -5;
          plank.scale=0.65
          
    
          planksGroup.add(plank);
        }
    }
    
  

function reset(){
  gameState= PLAY
  planksGroup.destroyEach()
  score=0
  gameOver.visible = false;
    restart.visible = false;
 deer.changeAnimation("running")
}