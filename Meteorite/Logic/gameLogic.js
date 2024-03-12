import { Ship } from './ship.js';
import { MeteoriteSystem } from './meteoriteSystem.js';

let ship;
let meteorites;

function setup() {
  var myCanvas = createCanvas(600, 600);
  // TESTING
  // Comentar siguiente linea para probar en vscode con extensión p5canvas
  // Descomentar para que quede en orden las cosas en el html deployeado / Live server
  //myCanvas.parent("canvasContainer");

  frameRate(60);
  ship = new Ship();
  meteorites = new MeteoriteSystem();
  meteorites.spawnMeteorites(4);

  angleMode(DEGREES);
}

function draw() {
  background(0);
  ship.update();
  ship.render();
  meteorites.update();
  meteorites.render();
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