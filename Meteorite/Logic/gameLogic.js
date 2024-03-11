import { Ship } from './ship.js';

let ship;

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
  ship.render();
}

//https://forum.processing.org/two/discussion/24662/script-type-module-draw-and-setup-not-working.html
window.setup = setup;
window.draw = draw;