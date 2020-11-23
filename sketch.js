var monkey_running,monkey;
var junglebg,jungle;
var stoneimg,obstacle,obstacleGroup ;
var bananaimg,banana,bananaGroup;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  
  junglebg = loadImage("jungle.jpg");
  
  stoneimg = loadImage("obstacle.png");
  
   bananaimg = loadImage("banana.png");
}




function setup(){
  createCanvas(800,400);
  
  
    
  jungle = createSprite (0,0,800,400);
  jungle.addImage("jungle",junglebg);
  jungle.scale = 2;
  jungle.velocityX = -5;
  jungle.x = jungle.width/2;
  
  monkey = createSprite (100,350,1,1);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
ground.x = ground.width/2;
  
  score = 0;
  
}


function draw (){
  background(300);
  
  if(jungle.x<0){
    jungle.x = jungle.width/2;
  }
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space") && monkey.collide(ground)){
    monkey.velocityY = -26;                     
  }
  
  monkey.velocityY = monkey.velocityY +1  ;
  monkey.collide(ground);
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();    
    score = score+2; 
  }
  
   switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
   
  if(obstacleGroup.isTouching(monkey)){
   monkey.scale = 0.1;
    score = 0;
  }
  
  
  spawnbanana();
  spawnobstacles();
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);

}


function spawnobstacles(){
  if (frameCount % 200 === 0){
  obstacle = createSprite(800,310,10,10);
  obstacle.addImage("obstacle",stoneimg);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;  
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
    
  }
}


function spawnbanana(){
  if (frameCount % 100 === 0){
    banana = createSprite(800,350,10,10);
    banana.y = random(100,200);
    banana.addImage("banana",bananaimg);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 300;
   bananaGroup .add(banana);
  }
}


