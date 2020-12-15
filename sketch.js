 var Play=1;
 var End=0;
 var gameState= 1;
 var score=0;
 var fruit1, fruit2, fruit3, fruit5, enemyimage, gameoverimage;
 var gameover, sword
function preload(){
  swordimage=loadImage("sword.png");
  
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit5=loadImage("fruit4.png");
  
  enemyimage=loadImage("alien1.png");
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3");
  gameOverSound=loadSound("gameover.mp3")
  gameoverimage=loadImage("gameover.png");
}

function setup(){
 createCanvas(600,300);
  
  fruitGroup= createGroup();
  enemyGroup= createGroup();
  
  sword=createSprite(40,200,20,20);
  sword.addImage(swordimage);
  sword.scale=0.5;
  
  gameover=createSprite(300,150,50,50);
  gameover.addImage(gameoverimage);
}

function draw(){
  background("blue");
  text("score : "+ score,350,20);
  
  if(gameState===Play){
  sword.y=World.mouseY;
  sword.x=World.mouseX;
  fruit();
  enemy();
  gameover.visible=false;
  if(fruitGroup.isTouching(sword)){
  fruitGroup.destroyEach();
    knifeSwooshSound.play();
  score=score+2;
}
  if(enemyGroup.isTouching(sword)){
    gameOverSound.play();
  gameState= End;
}
}
  else if(gameState===End){
      fruitGroup.setVelocityEach(0);
      enemyGroup.setVelocityEach(0);
      fruitGroup.setLifetimeEach(-1);
      enemyGroup.setLifetimeEach(-1);
      enemyGroup.destroyEach();
      fruitGroup.destroyEach();
      gameover.visible=true;
      sword.visible=false;
      enemyGroup.visible=false;
}
 drawSprites();
}

function fruit(){
  
  if(frameCount % 60 ===0){
  var fruit=createSprite(560,Math.round(random(50,260)),30,30);
  position=Math.round(random(1,2));
  
    if(position===1){
      fruit.x=560;
      fruit.velocityX=-9-score/10;
    }
  else{if (position===2){
      fruit.x=10;
      fruit.velocityX= 9-score/10;
      }
  }
  
  fruit.scale=0.2;
  r=Math.round(random(1,4));
  if(r==1){
  fruit.addImage(fruit1);
}
  else if(r==2){
  fruit.addImage(fruit2);
}
  else if(r==3){
  fruit.addImage(fruit3);
}
  else{
  fruit.addImage(fruit5);
}
  fruit.setLifetime=100;
  fruitGroup.add(fruit);
}
}
function enemy(){
  if(frameCount % 200===0){
  var enemy=createSprite(580,Math.round(random(100,280)),30,30);
  enemy.addImage("enemy",enemyimage);
  enemy.velocityX=-9-score/10;
  enemy.Lifetime=100;
  enemyGroup.add(enemy);
}
}