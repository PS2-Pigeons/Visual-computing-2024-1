// TAREA asteroids

let ship;

function setup() {
  var myCanvas = createCanvas(600, 600);
  // TESTING
  // Comentar siguiente linea para probar en vscode con extensión p5canvas
  // Descomentar para que quede en orden las cosas en el html deployeado / Live server
  myCanvas.parent("canvasContainer");

  frameRate(60);
  ship = new Ship();
  angleMode(DEGREES);
}

function draw() {
  background(0);
  ship.update();
  ship.draw();
}

class Ship{
  constructor(){
    this.rotation = 0;
    this.velocity = createVector(0,0);
    this.force = createVector(0,0);
    this.pos = createVector(width/2,height/2);
    this.impulse = false;
    this.maxVel = 3;
  }
  update(){
    if (keyIsDown(LEFT_ARROW)) { 
      this.setRotation(-5); 
    } 
    if (keyIsDown(RIGHT_ARROW)) { 
      this.setRotation(5);
    } 
    if (keyIsDown(UP_ARROW)) { 
      this.goForward();
    }
    if (!keyIsDown(UP_ARROW)){
      this.impulse = false;
    }

    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
    // Loop en el borde de la pantalla
    if (this.pos.x > width){
      this.pos.x = 0;
    }
    if (this.pos.x < 0){
      this.pos.x = width;
    }
    if (this.pos.y > height){
      this.pos.y = 0;
    }
    if (this.pos.y < 0){
      this.pos.y = height;
    }

  }
  
  setRotation(rot){
    this.rotation += rot;
    if (this.rotation > 360){
      this.rotation = 0;
    }
    if (this.rotation < 0){
      this.rotation = 360;
    }
  }
  goForward(){
    // añadir fuerza segun rotacion actual de la nave
    this.force.x = cos(this.rotation)/10;
    this.force.y = sin(this.rotation)/10;
    this.velocity.x += this.force.x;
    this.velocity.y += this.force.y;
    this.impulse = true;
    // limitar impulso o velocidad
    if (this.velocity.x > this.maxVel){
      this.velocity.x = this.maxVel;
    }
    if (this.velocity.x < -this.maxVel){
      this.velocity.x = -this.maxVel;
    }
    if (this.velocity.y > this.maxVel){
      this.velocity.y = this.maxVel;
    }
    if (this.velocity.y < -this.maxVel){
      this.velocity.y = -this.maxVel;
    }
    
  }

  draw(){
    push();
    stroke(255);
    noFill();
    translate(this.pos.x, this.pos.y);
    rotate(this.rotation);
    // Nave
    line(-5.5, -4.5, 6, 0);
    line(-5.5, 4.5, 6, 0);
    arc(-6,0,10,10,300,410);
    // Fueguito de la nave al impulsarse
    if (this.impulse){
      stroke("orange");
      line(-5, 0, -2, -1.5);
      line(-5, 0, -2, 1.5);
    }
    pop();
  }
}