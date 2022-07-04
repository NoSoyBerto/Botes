const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;
var boat;
var balls = [];
var boats = [];


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);
  cannon = new Cannon(180, 110, 130, 100, angle);

  
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  push();
  fill("brown");
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  pop();

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();

  for(var i = 0; i<balls.length; i++){
    showCannonBalls(balls[i]);
  }

  showBoats();  

  cannon.display();
 
}


function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }

}

function keyPressed(){
  if (keyCode === DOWN_ARROW){
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body,cannon.angle);
    balls.push(cannonBall);

  }
}

function showCannonBalls(pepe,index){
  if(pepe){
    pepe.display();
  }
}

function showBoats(){
  

  if(boat.length>0){
    if(boats[boats.length-1] == undefined || boats[boats.length-1].body.position.x<width-100){
      var positions = [-40,-20,-50,-10,-30,-60];
      var position = random (positions);
      boat = new Boat(width-100,height-100,250,200, position);
      boats.push(boat)
    }
    for(var bote = 0; bote<boat.length;bote++){
      if(boats[bote]){
        Matter.Body.setVelocity(boat.body,{x:-0.7,y:0});
        boats[bote].display();        
      }
    }
  }else{
    boat = new Boat(width-70, height-60, 250, 200, -80);
    boats.push(boat);
  }
}