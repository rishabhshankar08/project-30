const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var bridge;
var ground,wall1,wall2;
var jointPoint,jointLink;
var stones = [];
var zombieImg, zombie,bgImg, stoneImg, stone;
var breakButton;

function preload(){
  zombieImg = loadImage("zombie.png");
  bgImg = loadImage("background.png");
  stoneImg = loadImage("stone.png")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  zombie = createSprite(width / 2, height - 110);
  zombie.addImage("zombie",zombieImg);
  zombie.scale = 0.1;
  zombie.velocityX = 0.9;

  breakButton = createImg("/axe.png");
  breakButton.position(1075,400);
  breakButton.size(50,50);(
  breakButton.mouseClicked(handleButtonPress))

  wall1 = new Baseclass(300,height / 2 + 50, 600, 100);
  wall2 = new Baseclass(width-300,height / 2 + 50,600,100);

  bridge = new Bridge(15,{x:width / 2 -400,y: height / 2})
  jointPoint = new Baseclass(width -600,height / 2 + 10,40,20)
  Matter.Composite.add(bridge.body,jointPoint);
  jointLink = new Link(bridge,jointPoint);

  
  
  for(var i = 0; i<= 8; i++){
    var x = random(width / 2 - 200, width / 2 + 300)
    var y = random(-10,140)
    var stone = new Stone(x,y,80,80);
    stone.addImage("stone",stoneImg);
  }

  for (var stone of stones){
    stone.display();
    var pos =  stone.body.position;
    var distance = dist(zombie.position.x,zombie.position.y,pos.x,pos.y);
    if(distance <= 50){
      zombie.velocityX = 0;
      Matter.Body.setVelocity(stone.body,{x:10,y:-10});
      collided = true;
    }
  }
  

}

function draw() {
  background(bgImg);
  Engine.update(engine);
 
  for (var stone of stones){
    stone.display();
    var pos =  stone.body.position;
    var distance = dist(zombie.position.x,zombie.position.y,pos.x,pos.y);
    if(distance <= 50){
      zombie.velocityX = 0;
      Matter.Body.setVelocity(stone.body,{x:10,y:-10});
      collided = true;
    }
  }
  
  
  wall1.display();
  wall2.display();
  bridge.show();
  stone.show();
  
  

  drawSprites();

}

function handleButtonPress(){
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  },1500);
}