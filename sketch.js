
let arcadeGameButtonWidth;
let threeDTetrisButtonWidth;

function setup() {
  var myCanvas = createCanvas(400, 400);
  // TESTING
  // Comentar siguiente linea para probar en vscode con extensión p5canvas
  // Descomentar para que quede en orden las cosas en el html deployeado / Live server
  myCanvas.parent("canvasContainer");
  
  background(220);
  fill(255, 0, 0);
  textSize(32);

  arcadeGameButtonWidth = textWidth("Arcade game") + 20;
  threeDTetrisButtonWidth = arcadeGameButtonWidth;

  // Create buttons for arcade game and 3D Tetris
  fill(0); // Set button color
  strokeWeight(3);
  stroke('purple'); // Set button outline color
  rect(100, 150, arcadeGameButtonWidth, 50); // Arcade game button
  rect(100, 220, threeDTetrisButtonWidth, 50); // 3D Tetris button

  // Set text colors
  fill(255);
  noStroke();

  // Draw text inside buttons
  text("Arcade game", 100 + (arcadeGameButtonWidth - textWidth("Arcade game")) / 2, 185); // Center text horizontally
  text("3D Tetris", 100 + (threeDTetrisButtonWidth - textWidth("3D Tetris")) / 2, 255); // Center text horizontally
}

function mouseClicked() {
  if (mouseX > 100 && mouseX < 100 + arcadeGameButtonWidth && mouseY > 150 && mouseY < 200) {
      window.location.href = 'Meteorite/meteorite.html';
  } else if (mouseX > 100 && mouseX < 100 + threeDTetrisButtonWidth && mouseY > 220 && mouseY < 270) {
      window.location.href = 'Tetris3D/tetris3d.html';
  }
}

function mouseMoved() {
  if (mouseX > 100 && mouseX < 100 + arcadeGameButtonWidth && mouseY > 150 && mouseY < 200) {
      stroke(255, 0, 0); // Set hover outline color to red
      noFill();
      rect(100, 150, arcadeGameButtonWidth, 50); // Arcade game button
  } else if (mouseX > 100 && mouseX < 100 + threeDTetrisButtonWidth && mouseY > 220 && mouseY < 270) {
      stroke(255, 0, 0); // Set hover outline color to red
      noFill();
      rect(100, 220, threeDTetrisButtonWidth, 50); // 3D Tetris button
  } else {
      setup(); // Reset the canvas
  }
}