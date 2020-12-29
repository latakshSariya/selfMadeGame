var deadAnim, slideAnim, runAnim, jumpAnim, idleAnim;
var backgroundImg;
var robot1, robot2;
var bgImage;
var PC;
var NPC1, NPC2;
var ground;
var health = 100;
var gameState;
var NPC;
var gunImg;
var gun;
var bullet;
var bulletImage;
var bullets = 10;
var bulletGroup;
var boomimg;
var enemyGroup;
var boom;

function preload() {
  deadAnim = loadAnimation("Images/dead/Dead__000.png", "Images/dead/Dead__001.png", "Images/dead/Dead__002.png", "Images/dead/Dead__003.png", "Images/dead/Dead__004.png", "Images/dead/Dead__005.png", "Images/dead/Dead__006.png", "Images/dead/Dead__007.png", "Images/dead/Dead__008.png", "Images/dead/Dead__009.png");

  slideAnim = loadAnimation("Images/slide/Slide__000.png", "Images/slide/Slide__001.png", "Images/slide/Slide__002.png", "Images/slide/Slide__003.png", "Images/slide/Slide__004.png", "Images/slide/Slide__005.png", "Images/slide/Slide__006.png", "Images/slide/Slide__007.png", "Images/slide/Slide__008.png", "Images/slide/Slide__009.png");
boomimg = loadImage("boom.png");
  runAnim = loadAnimation("Images/run/Run__000.png", "Images/run/Run__001.png", "Images/run/Run__002.png", "Images/run/Run__003.png", "Images/run/Run__004.png", "Images/run/Run__005.png", "Images/run/Run__006.png", "Images/run/Run__007.png", "Images/run/Run__008.png", "Images/run/Run__009.png");

  jumpAnim = loadAnimation("Images/jump/Jump__000.png", "Images/jump/Jump__001.png", "Images/jump/Jump__002.png", "Images/jump/Jump__003.png", "Images/jump/Jump__004.png", "Images/jump/Jump__005.png", "Images/jump/Jump__006.png", "Images/jump/Jump__007.png", "Images/jump/Jump__008.png", "Images/jump/Jump__009.png");

  idleAnim = loadAnimation("Images/idle/Idle__000.png", "Images/idle/Idle__001.png", "Images/idle/Idle__002.png", "Images/idle/Idle__003.png", "Images/idle/Idle__004.png", "Images/idle/Idle__005.png", "Images/idle/Idle__006.png", "Images/idle/Idle__007.png", "Images/idle/Idle__008.png", "Images/idle/Idle__009.png");

  robot1 = loadAnimation("Images/robot1-removebg-preview.png");
  robot2 = loadAnimation("Images/robotwithgun-removebg-preview.png");

  backgroundImg = loadAnimation("Images/imgonline-com-ua-twotoone-Nflon9lCxhCV.jpg");
  gunImg = loadImage("download__2_-removebg-preview.png");
  bulletImage = loadImage("images-removebg-preview.png");
}

function setup() {
  createCanvas(650, 250);
  bgImage = createSprite(335, 125, 10, 10);
  bgImage.addAnimation("bg", backgroundImg);
  ground = createSprite(325, 220, 650, 10);
  bulletGroup = new Group();
  ground.shapeColor = "red";
  //boom = createSprite(10,10,10,10);
  //boom.addImage(boomimg);
  //boom.scale = 0.3
  //boom.visible = false;
  enemyGroup = new Group();
  ground.visible = false;
  PC = createSprite(50, 200, 50, 50);
  PC.addAnimation("idle", idleAnim);
  PC.addAnimation("jump", jumpAnim);
  PC.addAnimation("run", runAnim);
  PC.addAnimation("slide", slideAnim);
  PC.scale = 0.15;
  gun  = createSprite(10,10 , 10,10);
  gun.addImage("gun" , gunImg);
  gun.scale = 0.15;
 
}

function draw() {
  background(0);
  drawSprites();
  frameRate(60);
  SpawnNPC();
  if(bullets === 0){
    textSize(30);
    fill("black");
    stroke("white");
    strokeWeight(5);
    text("Reload You Gun By Pressing R" , width/2-200 , height/2)
  }
  if(bullets === 0){
  bgImage.velocityX = 0;
    PC.changeAnimation("idle")
    NPC1.velocityX = 0;
  }
  if(keyDown("r") && bullets === 0){
    bullets = 10;
  }
 
  if(keyWentDown("s")&&bullets!=0){
    bullet = createbullet();
    bullet.addImage("bullet" , bulletImage);
    bullet.scale = 0.1;
    bullet.x = 96;
    bullet.y = 170.55;
    bullet.velocityX = 7;
    bullet.visible = true;
    bullets = bullets-1;
    bulletGroup.add(bullet)
  }
    PC.depth = gun.depth+1;

  if (keyDown(RIGHT_ARROW)) {
    ground.velocityX = -5;
    bgImage.velocityX = -5
    PC.changeAnimation("run")
  }
  if (PC.y >= 174) {
    if (keyDown(UP_ARROW)) {
      PC.velocityY = -5;
      PC.changeAnimation("jump")
    }
    if (keyDown(DOWN_ARROW)) {
      PC.changeAnimation("slide")
    }
  }
  
  if (ground.x < 350) {
    ground.x = ground.width / 2
  }
   if(bulletGroup.isTouching(enemyGroup)){
    //boom.x=  NPC1.x;
    //boom.y = NPC1.y;
    //boom.visible = true;
    enemyGroup.destroyEach();
    bulletGroup.destroyEach();


  }
  if (bgImage.x < 0) {
    bgImage.x = bgImage.width / 2
  }
  PC.velocityY = PC.velocityY + 0.25


  PC.collide(ground);
  gun.x = PC.x+26 
  gun.y =  PC.y+2
  
}

function SpawnNPC(){
    if (frameCount % 100 === 0) {
    NPC1 = createSprite(660, 200, 50, 50);
    NPC1.scale = 0.2;   
    NPC1.velocityX = -5;
   var randomizer = Math.round(random(1, 2));
     console.log(randomizer);
  switch (randomizer) {
    case 2:
      NPC1.addAnimation("robot",robot1);
      NPC1.collide(ground);
      break;
    case 1:
      NPC1.addAnimation("robot",robot2);
      NPC1.scale = 0.35
      break;
    default:
      break;
  }  
         NPC1.collide(ground)

      enemyGroup.add(NPC1);
}
}

function createbullet() {
  bullet = createSprite(50,10,10,10);
  bullet.velocityX= 7;
    bullet.visible = false;


  return bullet;
}