let cols = 10; // Number of columns in the grid
let rows = 10; // Number of rows in the grid
let boxSize = 30; // Spacing between grid lines
let boxZ = 10;
let angle; 

let gameMatrix =  []; // x,y,z, cada una con 10 espacios iniciados en 0
let currentBlock;

class Cube{
  constructor(){
    this.position = [0, 0, 0];
    this.falling = true;
  }
  draw(){
    push();
    translate(boxSize/2, boxSize/2, boxSize/2);
    translate(boxSize * this.position[0],
              boxSize * this.position[1],
              boxSize * this.position[2]);
    fill(250,255,50);
    box(boxSize,boxSize);
    translate(boxSize, 0, 0);
    box(boxSize,boxSize);
    translate(0, 0, boxSize);
    box(boxSize,boxSize);
    translate(-boxSize, 0, 0);
    box(boxSize,boxSize);


    translate(0, -boxSize, -boxSize);
    box(boxSize,boxSize);
    translate(boxSize, 0, 0);
    box(boxSize,boxSize);
    translate(0, 0, boxSize);
    box(boxSize,boxSize);
    translate(-boxSize, 0, 0);
    box(boxSize,boxSize);
    pop();
  }
  update(){
    // Falling
    if (this.falling){
      this.position[1] += 1;
      // check for last grid
      if (this.position[1] == 9){
        this.falling = false;
        currentBlock = null;
        gameMatrix[this.position[0]][this.position[1]][this.position[2]] = true;
        gameMatrix[this.position[0]][this.position[1]][this.position[2]+1] = true;
        gameMatrix[this.position[0]+1][this.position[1]][this.position[2]] = true;
        gameMatrix[this.position[0]+1][this.position[1]][this.position[2]+1] = true;

        gameMatrix[this.position[0]][this.position[1]-1][this.position[2]] = true;
        gameMatrix[this.position[0]][this.position[1]-1][this.position[2]+1] = true;
        gameMatrix[this.position[0]+1][this.position[1]-1][this.position[2]] = true;
        gameMatrix[this.position[0]+1][this.position[1]-1][this.position[2]+1] = true;
      } 
      // check for collision with 1 cube layer below him
      else if (gameMatrix[this.position[0]][this.position[1] +1][this.position[2]] == true ||
        gameMatrix[this.position[0]][this.position[1] +1][this.position[2]+1] == true ||
        gameMatrix[this.position[0]+1][this.position[1] +1][this.position[2]] == true ||
        gameMatrix[this.position[0]+1][this.position[1] +1][this.position[2]+1] == true)
        {
        this.falling = false;
        currentBlock = null;
        gameMatrix[this.position[0]][this.position[1]][this.position[2]] = true;
        gameMatrix[this.position[0]][this.position[1]][this.position[2]+1] = true;
        gameMatrix[this.position[0]+1][this.position[1]][this.position[2]] = true;
        gameMatrix[this.position[0]+1][this.position[1]][this.position[2]+1] = true;

        gameMatrix[this.position[0]][this.position[1]-1][this.position[2]] = true;
        gameMatrix[this.position[0]][this.position[1]-1][this.position[2]+1] = true;
        gameMatrix[this.position[0]+1][this.position[1]-1][this.position[2]] = true;
        gameMatrix[this.position[0]+1][this.position[1]-1][this.position[2]+1] = true;
        
    }
    }
  }
  move(x,y,z){
    // CHECK IF I CAN MOVE IN THAT DIRECTION
    if (gameMatrix[this.position[0] + x][this.position[1] ][this.position[2]] == false &&
      gameMatrix[this.position[0] + x][this.position[1] ][this.position[2]+1] == false &&
      gameMatrix[this.position[0]+1 +x][this.position[1] ][this.position[2]] == false &&
      gameMatrix[this.position[0]+1 + x][this.position[1] ][this.position[2]+1] == false &&
      
      gameMatrix[this.position[0] + x][this.position[1] -1][this.position[2]] == false &&
      gameMatrix[this.position[0] + x][this.position[1] -1][this.position[2]+1] == false &&
      gameMatrix[this.position[0]+1 +x][this.position[1] -1][this.position[2]] == false &&
      gameMatrix[this.position[0]+1 + x][this.position[1] -1][this.position[2]+1] == false)
      {
      this.position[0] += x;
    }
    if (this.position[0] < 0){
      this.position[0] = 0;
    }
    if (this.position[0] >= 9){
      this.position[0] = 9;
    }
    // Falta para el resto de movimientos
    if (gameMatrix[this.position[0] ][this.position[1] ][this.position[2] + z] == false && 
      gameMatrix[this.position[0] ][this.position[1] ][this.position[2]+1 + z] == false && 
      gameMatrix[this.position[0]+1][this.position[1] ][this.position[2]+ z] == false && 
      gameMatrix[this.position[0]+1 ][this.position[1] ][this.position[2]+1+ z] == false && 

      gameMatrix[this.position[0] ][this.position[1] -1][this.position[2]+ z] == false && 
      gameMatrix[this.position[0] ][this.position[1] -1][this.position[2]+1+ z] == false && 
      gameMatrix[this.position[0]+1][this.position[1] -1][this.position[2]+ z] == false && 
      gameMatrix[this.position[0]+1 ][this.position[1] -1][this.position[2]+1+ z] == false)
      {
      this.position[2] += z;
      }
    if (this.position[2] < 0){
      this.position[2] = 0;
    }
    if (this.position[2] >= 9){
      this.position[2] = 9;
    }

  }
}

function keyPressed(){
  if (keyCode == LEFT_ARROW){
    if (currentBlock != null){
      currentBlock.move(-1,0,0);
    }
  }
  if (keyCode == RIGHT_ARROW){
    if (currentBlock != null){
      currentBlock.move(1,0,0);
    }
  }
  if (keyCode == DOWN_ARROW){
    if (currentBlock != null){
      currentBlock.move(0,0,1);
    }
  }
  if (keyCode == UP_ARROW){
    if (currentBlock != null){
      currentBlock.move(0,0,-1);
    }
  }
}

function setup() {
  var myCanvas = createCanvas(800, 600, WEBGL); // Create a WebGL canvas
  // TESTING
  // Comentar siguiente linea para probar en vscode con extensión p5canvas
  // Descomentar para que quede en orden las cosas en el html deployeado / Live server
  // myCanvas.parent("canvasContainer");

  angle = atan(1/sqrt(2)); // Calculate the angle for an isometric view
  frameRate(3);
  createCanvas(800, 600, WEBGL); // Create a WebGL canvas
  angle = atan(1/sqrt(2)); // Calculate the angle for an isometric view
  for (let x = 0; x < 10; x++) {
    gameMatrix[x] = []; // Crear un arreglo anidado
    for (let y = 0; y < 10; y++) {
      gameMatrix[x][y] = [];
      for (let z = 0; z < 10; z++) {
        gameMatrix[x][y][z] = false;
      }
    }
  }
  // Dummy cube to test
  currentBlock = new Cube();
}

function draw() {
  orbitControl();
  background(220);
  rotateX(-QUARTER_PI); // Rotate the camera on the x-axis
  rotateY(angle); // Rotate the camera on the y-axis
  translate(-boxSize * (cols / 2), -boxSize * (rows / 2), -boxSize * (cols / 2)); // Center the grid
  update();
  // DRAW THE GRID
  gridDraw();
  // Draw the axes X RED, Y GREEN, Z BLUE
  axesDraw();

  if (currentBlock != null){
    currentBlock.draw();
  }
  // Draw tetris blocks
  for (let x = 0; x < 10; x++){
    for (let y = 0; y < 10; y++){
      for (let z = 0; z < 10; z++){
        if (gameMatrix[x][y][z] == true){
          push();
          translate(boxSize/2, boxSize/2, boxSize/2);
          translate(boxSize * x,boxSize * y,boxSize *z);
          fill(250,255,50);
          box(boxSize,boxSize);
          pop();
        }
      }
    }
  }
}

function update(){
  // Current block update
  if (currentBlock != null){
    currentBlock.update();
  }
  else{ // If block is null then throw the next one
    currentBlock = new Cube();
  }
  // Check if a row is full to empty then.

  // CHECK if some block in y =0, if true game over

}

function axesDraw(){
  push();
  stroke(255, 0, 0); // Set the color for the x-axis to red
  line(0, 0, 0, boxSize * cols, 0, 0); // Draw the x-axis
  stroke(0, 255, 0); // Set the color for the y-axis to green
  line(0, 0, 0, 0, boxSize * rows, 0); // Draw the y-axis
  stroke(0, 0, 255); // Set the color for the z-axis to blue
  line(0, 0, 0, 0, 0, boxSize * cols); // Draw the z-axis
  pop();
}

function gridDraw(){
  
  // Draw the grid in xy plane
  push();
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

  // Draw the grid in zy plane
  push();
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

  
  // Draw the grid in xz plane
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

}
