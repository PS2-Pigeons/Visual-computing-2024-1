import { Ship } from './ship.js';
import { MeteoriteSystem } from './meteoriteSystem.js';
const {Engine, World, Bodies, Events, Composite} = Matter;
let engine, world;

let ship;
let meteorites;

function setup() {
  rectMode(CENTER);
  var myCanvas = createCanvas(600, 600);
  // TESTING
  // Comentar siguiente linea para probar en vscode con extensión p5canvas
  // Descomentar para que quede en orden las cosas en el html deployeado / Live server
  myCanvas.parent("canvasContainer");

  // Manejo de creacion del mundo de las fisicas ( colisiones )
  engine = Engine.create();
  engine.gravity.y = 0 // Quitar gravedad en el mundo
  world = engine.world;
  frameRate(60);
  ship = new Ship(world);
  meteorites = new MeteoriteSystem(world);
  meteorites.spawnMeteorites(4);
  angleMode(DEGREES);
  Events.on(engine, 'collisionStart', function(event) {
    var pairs = event.pairs[0];
    //console.log(pairs);
    console.log("colision between " + pairs.bodyA.label + " - " + pairs.bodyB.label);
    if (pairs.bodyA.label == "Ship" && pairs.bodyB.label == "Meteorite"){
      console.log('funcion perder');
      World.remove(world, pairs.bodyA, pairs.bodyB);
    }
    if (pairs.bodyA.label == "Projectile" && pairs.bodyB.label == "Meteorite" || pairs.bodyA.label == "Meteorite" && pairs.bodyB.label == "Projectile"){
      console.log('hemo roto un meteorito');
      World.remove(world, pairs.bodyA, pairs.bodyB);
    }
  });

  console.log(engine);
}

function draw() {
  background(0);
  ship.update();
  ship.render();
  meteorites.update();
  meteorites.render();
  Engine.update(engine); // Cada frame simula el mundo de las fisicas
}

function keyPressed() {
    // Check if the key pressed is the collision key
    if (keyCode == 67) { // C key
        if (meteorites.meteorites.length > 0) {
          let randomIndex = Math.floor(Math.random() * meteorites.meteorites.length);
          let randomMeteorite = meteorites.meteorites[randomIndex];
          // Trigger the collision
          meteorites.splitMeteorite(randomMeteorite);
        }
    }
}

//https://forum.processing.org/two/discussion/24662/script-type-module-draw-and-setup-not-working.html
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;