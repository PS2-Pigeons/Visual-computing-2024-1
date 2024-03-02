let cols = 10; // Number of columns in the grid
let rows = 10; // Number of rows in the grid
let boxSize = 30; // Spacing between grid lines
let angle;
let boxZ = 10; 

function setup() {
  createCanvas(800, 600, WEBGL); // Create a WebGL canvas
  angle = atan(1/sqrt(2)); // Calculate the angle for an isometric view

}

function draw() {
  orbitControl();
  background(220);
  rotateX(-QUARTER_PI); // Rotate the camera on the x-axis
  rotateY(angle); // Rotate the camera on the y-axis
  translate(-boxSize * (cols / 2), -boxSize * (rows / 2), -boxSize * (cols / 2)); // Center the grid

  push();
  // Draw the grid in xy plane
  for (let y = 0; y < rows; y++) { // Loop through each row
    for (let x = 0; x < cols; x++) { // Loop through each column
      let posX = x * boxSize + boxSize/2; // Calculate the x-coordinate of the current square
      let posY = y * boxSize + boxSize/2; // Calculate the y-coordinate of the current square
      push(); // Save the current transformation matrix
      translate(posX, posY, -boxZ/2); // Move to the current square
      fill(255); // Set the fill color to white
      stroke(0); // Set the stroke color to black
      box(boxSize, boxSize, boxZ); // Draw the square
      pop(); // Restore the transformation matrix
    }
  }
  pop();

  push();
  // Draw the grid in zy plane
  translate(boxSize * (cols) + boxZ/2, 0, 0); // Move to the side of the first grid
  for (let y = 0; y < rows; y++) { // Loop through each row
    for (let z = 0; z < cols; z++) { // Loop through each column
      let posY = y * boxSize + boxSize/2; // Calculate the y-coordinate of the current square
      let posZ = z * boxSize + boxSize/2; // Calculate the z-coordinate of the current square
      push(); // Save the current transformation matrix
      translate(0, posY, posZ); // Move to the current square
      fill(255); // Set the fill color to white
      stroke(0); // Set the stroke color to black
      box(boxZ, boxSize, boxSize); // Draw the square
      pop(); // Restore the transformation matrix
    }
  }
  pop();

  push();
  translate(0, boxSize * (rows) + boxZ / 2, 0); // Move to the bottom of the first grid
  for (let y = 0; y < rows; y++) { // Loop through each row
    for (let z = 0; z < cols; z++) { // Loop through each column
      let posY = y * boxSize + boxSize/2; // Calculate the y-coordinate of the current square
      let posZ = z * boxSize + boxSize/2; // Calculate the z-coordinate of the current square
      push(); // Save the current transformation matrix
      translate(posY, 0, posZ); // Move to the current square
      fill(255); // Set the fill color to white
      stroke(0); // Set the stroke color to black
      box(boxSize, boxZ, boxSize); // Draw the square
      pop(); // Restore the transformation matrix
    }
  }
  pop();

  // Draw the axes
  push();
  stroke(255, 0, 0); // Set the color for the x-axis to red
  line(0, 0, 0, boxSize * cols, 0, 0); // Draw the x-axis
  stroke(0, 255, 0); // Set the color for the y-axis to green
  line(0, 0, 0, 0, boxSize * rows, 0); // Draw the y-axis
  stroke(0, 0, 255); // Set the color for the z-axis to blue
  line(0, 0, 0, 0, 0, boxSize * cols); // Draw the z-axis
  pop();
}
