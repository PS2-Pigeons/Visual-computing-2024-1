// TAREA asteroids

let ship, projectile;
var lasers = []; // Array de todos los laseres existentes
let attackCooldown = 1000 // 1s de cooldown para atacar
let lastAttackTime = -attackCooldown //Se deja así por como se maneja la duración de projectiles
let projectileLifeSpan = 3000 // Tiempo que queda vivo un projectil
let projectileSpeedMultiplier = 5 // Velocidad de projectil

function setup() {
  var myCanvas = createCanvas(600, 600);
  // TESTING
  // Comentar siguiente linea para probar en vscode con extensión p5canvas
  // Descomentar para que quede en orden las cosas en el html deployeado / Live server
  //myCanvas.parent("canvasContainer");

  frameRate(60);
  ship = new Ship();
  angleMode(DEGREES);
}

function draw() {
  background(0);
  ship.update();
  ship.draw();
}

class Projectile{
  constructor(){
    this.rotation = ship.rotation;
    this.pos = createVector(ship.pos.x,ship.pos.y)
    this.velocity = createVector(cos(this.rotation)*projectileSpeedMultiplier,sin(this.rotation)*projectileSpeedMultiplier);
    this.spawnTime = millis()
    this.timeAlive = 0
  }
  update(){
    this.pos.x += this.velocity.x
    this.pos.y += this.velocity.y
    this.timeAlive = millis()
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
  draw(){
    push();
    stroke(255);
    strokeWeight(4);
    point(this.pos.x,this.pos.y);
    pop();
  }
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
    if (keyIsDown(DOWN_ARROW)) { 
      if (millis() - lastAttackTime >= attackCooldown ){
        lastAttackTime = millis()
      // Coso pa crear projectil y disparar
        projectile = new Projectile
        var i = lasers.length
        lasers[i] = projectile
      }
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
    for (var i = 0; i < lasers.length; i++){
      lasers[i].update();
      lasers[i].draw();
      if (lasers[i].timeAlive - lasers[i].spawnTime >= projectileLifeSpan){
        lasers.splice(i,1);
      }
    }
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