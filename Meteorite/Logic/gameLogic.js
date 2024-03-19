import { Ship } from './ship.js';
import { MeteoriteSystem } from './meteoriteSystem.js';
const {Engine, World, Bodies, Events, Composite} = Matter;

let engine, world;

let ship;
let meteorites;

function setup() {
  var myCanvas = createCanvas(600, 600);
  frameRate(60);
  angleMode(DEGREES);
  // TESTING
  // Comentar siguiente linea para probar en vscode con extensión p5canvas
  // Descomentar para que quede en orden las cosas en el html deployeado / Live server
  myCanvas.parent("canvasContainer");

  engine = Engine.create(); //Engine de manejo de colisiones 
  world = engine.world; // Guardar referencia del mundo asociado a la engine
  engine.gravity.y = 0 // Quitar gravedad en el mundo

  ship = new Ship(world);
  meteorites = new MeteoriteSystem(world);
  meteorites.spawnMeteorites(4, meteorites.startingSize);

  Events.on(engine, 'collisionStart', function(event) {
    event.pairs.forEach(function(pair) {
        const labelA = pair.bodyA.label;
        const labelB = pair.bodyB.label;
        console.log(`Collision between ${labelA} and ${labelB}`);
        pair.bodyA.owner.onCollision(pair.bodyB);
        pair.bodyB.owner.onCollision(pair.bodyA);
    });
  });
}

function draw() {
  background(0);
  if (ship.isAlive()){
    ship.update();
    ship.render();
  }
  
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