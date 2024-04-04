let arcadeGameButtonWidth;
let threeDTetrisButtonWidth;

new p5(function(p5) {

  p5.setup = function() {
    p5.createCanvas(400, 400);
    p5.fill(255, 0, 0);
    p5.textSize(32);
  
    arcadeGameButtonWidth = p5.textWidth("Arcade game") + 20;
    threeDTetrisButtonWidth = arcadeGameButtonWidth;
  
    // Create buttons for arcade game and 3D Tetris 
    p5.fill(0); // Set button color
    p5.strokeWeight(3);
    p5.stroke('purple'); // Set button outline color
    p5.rect(100, 150, arcadeGameButtonWidth, 50); // Arcade game button
    p5.rect(100, 220, threeDTetrisButtonWidth, 50); // 3D Tetris button
  
    // Set text colors
    p5.fill(255);
    p5.noStroke();
  
    // Draw text inside buttons
    p5.text("Arcade game", 100 + (arcadeGameButtonWidth - p5.textWidth("Arcade game")) / 2, 185); // Center text horizontally
    p5.text("3D Tetris", 100 + (threeDTetrisButtonWidth - p5.textWidth("3D Tetris")) / 2, 255); // Center text horizontally
  };

  p5.mouseClicked = function() {
    if (p5.mouseX > 100 && p5.mouseX < 100 + arcadeGameButtonWidth && p5.mouseY > 150 && p5.mouseY < 200) {
        window.location.href = 'Meteorite/meteorite.html';
    } else if (p5.mouseX > 100 && p5.mouseX < 100 + threeDTetrisButtonWidth && p5.mouseY > 220 && p5.mouseY < 270) {
        window.location.href = 'Tetris3D/tetris3d.html';
    }
  };
  
  p5.mouseMoved = function() {
    if (p5.mouseX > 100 && p5.mouseX < 100 + arcadeGameButtonWidth && p5.mouseY > 150 && p5.mouseY < 200) {
      p5.stroke(255, 0, 0); // Set hover outline color to red
      p5.noFill();
      p5.rect(100, 150, arcadeGameButtonWidth, 50); // Arcade game button
    } else if (p5.mouseX > 100 && p5.mouseX < 100 + threeDTetrisButtonWidth && p5.mouseY > 220 && p5.mouseY < 270) {
      p5.stroke(255, 0, 0); // Set hover outline color to red
      p5.noFill();
      p5.rect(100, 220, threeDTetrisButtonWidth, 50); // 3D Tetris button
    } else {
      p5.setup(); // Reset the canvas
    }
  };

}, canvasContainer);
