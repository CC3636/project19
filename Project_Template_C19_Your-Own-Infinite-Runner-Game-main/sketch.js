var PLAY = 1;
var END = 0;
var gameState = PLAY;
var background

var runner, running, collided;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2;
var backgroundImg

var score;
var gameOver,restart;
var end, startOver;

function preload(){
  running = loadAnimation("cheetah-clipart-2.jpeg","cheetah-running1.jpeg","cheetah-running2.jpeg");
  collided = loadAnimation("dead-animal-cartoon-clipart-6.jpeg");
  
  groundImage = loadImage("clipart-banner-grass-11.png");
  
  obstacle1 = loadImage("african-savanna-trees-clipart-8.jpeg");
  obstacle2 = loadImage("savannah-tree-png-clipart-image-5a1cf3d1389a80.9645053215118468652319.jpg");
  gameOver = loadImage("gameover.png");
  restart = loadImage("restart.png");
  backgroundImg = loadImage("against-sky-clipart-4.jpeg")
}

function setup() {
        createCanvas(600, 200);
        background = createSprite(300,100)
        background.addImage(backgroundImg);

        runner = createSprite(50,180,20,50);
        runner.addAnimation("running", running);
        runner.addAnimation("collided" , collided)
        runner.scale = 0.5;

        ground = createSprite(200,180,400,20);
        ground.addImage("ground",groundImage);
        ground.x = ground.width /2;


        startOver=createSprite(300,125);
        startOver.addImage(restart);
        startOver.scale = 0.5;
        startOver.visible = false;

        end=createSprite(300,75);
        end.addImage(gameOver);
        end.scale = 0.5;
        end.visible = false;

        invisibleGround = createSprite(200,190,400,10);
        invisibleGround.visible = false;

        obstaclesGroup = createGroup();
        cloudsGroup = createGroup();

        console.log("Hello" + 5);

        runner.setCollider("circle",0,0,40);
        runner.debug = true

        score = 0
}

function draw() {
 ground.velocityX = -4;
 score = score + Math.round(frameCount/60);
 
 if (ground.x < 0){
   ground.x = ground.width/2;
 }
 
 if(keyDown("space")&& cheetah.y >=145) {
   cheetah.velocityY = -13;
 }
  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    ground.velocityX = -4;
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& runner.y >=145) {
      runner.velocityY = -13;
    }
    
    runner.velocityY = runner.velocityY + 0.8
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(runner)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      ground.velocityX = 0;
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     runner.changeAnimation("collided",cheetah_collided);
     obstaclesGroup.setLifetimeEach(-1);
     runner.velocityY=0
     end.visible = true;
     startOver.visible = true;

   }
  
 
  runner.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
   if (frameCount % 60 === 0){
        var obstacle = createSprite(400,165,10,40);
        obstacle.velocityX = -6;
   }
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
              
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
}