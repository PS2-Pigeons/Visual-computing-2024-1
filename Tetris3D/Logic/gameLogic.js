let matrixWidth = (8) + 2;  // Width of the playable area + 2 (borders)
let matrixHeight = (12) + 2; // Height of the playable area + 2 (borders)
let matrixDepth = (8) + 2;  // Depth of the playable area + 2 (borders)
let boxSize = 25;     // Size of each box
let gameMatrix = [];    // 3D array to store colors
let lineLengthX = matrixWidth * boxSize;
let lineLengthY = matrixHeight * boxSize;
let blackLineZ = matrixDepth * boxSize;
let cam;
let currentBlock;
let timeInterval = 60;
let level = 1;
gameOver = false; //Track if GameOver
let previousClearedLines = 0;
let zoomLevel = 1;    // Zoom level
let horiRotation = 0;    // Horizontal rotation
let vertRotation = 0;    // Vertical rotation
let tetrominoArray = [];
function setup() {
  linesCleared = 0;
  score = 0;
  var myCanvas = createCanvas(windowWidth, windowHeight, WEBGL); // Create a WebGL canvas 
  // TESTING
  // Comentar siguiente linea para probar en vscode con extensión p5canvas
  // Descomentar para que quede en orden las cosas en el html deployeado / Live server
  myCanvas.parent("canvasContainer");
  frameRate(60);
  angleMode(DEGREES);

  cam = createCamera();
  cam.camera(lineLengthX * 1.55 * 1.2, lineLengthY * 1.85 * 1.2, blackLineZ * 1.55 * 1.2 , boxSize, boxSize, boxSize, 0, -1, 0);
  cam.perspective(40);

  // Initialize the 3D matrix
  for (let i = 0; i < matrixWidth; i++) {
    gameMatrix[i] = [];
    for (let j = 0; j < matrixHeight; j++) {
      gameMatrix[i][j] = [];
        for (let k = 0; k < matrixDepth; k++) {
          let col = null;
          if (i == 0 || i == matrixWidth - 1 || j == 0 || j == matrixHeight - 1 || k == 0 || k == matrixDepth-1) col = 'gray'; // side borders
          if (j == matrixHeight - 1) col = 'purple'; // top border
          gameMatrix[i][j][k] = col;
        }
    }
  }
  // Descomentar la siguiente linea para que aparezca un nivel prehecho
  // testingSetup();
  tetrominoArray = [[[[3,0,0], [2,0,0], [1,0,0], [0,0,0]], "cyan"],     // I-BLOCK
                    [[[2,0,0], [1,0,0], [1,0,1], [0,0,1]], "red"],      // Z-BLOCK
                    [[[2,0,1], [1,0,0], [1,0,1], [0,0,0]], "green"],    // S-BLOCK
                    [[[2,0,1], [1,0,0], [0,0,1], [1,0,1]], "purple"],   // T-BLOCK
                    [[[2,0,1],[2,0,0],[1,0,0],[0,0,0]],    "orange"],   // L-BLOCK
                    [[[2,0,0],[1,0,0],[0,0,0],[0,0,1]],    "blue"],     // J-BLOCK
                    [[[0,0,0], [1,0,0], [0,0,1], [1,0,1]], "yellow"]    // O-BLOCK
                    ];

  currentBlock = selectRandomTetromino(tetrominoArray);
}

function draw() {
  clear();


  //Camera controls
  rotateX(-vertRotation);
  rotateZ(vertRotation);
  rotateY(horiRotation);

  // Draw 3D matrix
  for (let i = 0; i < matrixWidth - 1 ; i++) {
    for (let j = 0; j < matrixHeight - 1; j++) {
        for (let k = 0; k < matrixDepth - 1; k++) {
                if (gameMatrix[i][j][k]) {
                  push(); // Save the current transformation matrix
                    translate(i * boxSize, j * boxSize, k * boxSize);
                    fill(gameMatrix[i][j][k]);
                    box(boxSize);
                    pop(); // Restore the previous transformation matrix
                }
        }
    }
  }

  if (gameOver) {
    clear();
    //Camera controls
    rotateX(-vertRotation);
    rotateZ(vertRotation);
    rotateY(horiRotation);
    // Display game over message
    push();
    for (let i = 0; i < matrixWidth - 1 ; i++) {
      for (let j = 0; j < matrixHeight - 1; j++) {
          for (let k = 0; k < matrixDepth - 1; k++) {
                  if (gameMatrix[i][j][k]) {
                    push(); // Save the current transformation matrix
                      translate(i * boxSize, j * boxSize, k * boxSize);
                      fill(gameMatrix[i][j][k]);
                      box(boxSize);
                      pop(); // Restore the previous transformation matrix
                  }
          }
      }
    }
    fill(0);
    pop();
    return;
  }

  // Timer to control the update function
  if (frameCount % timeInterval === 0) update();
  if (currentBlock) currentBlock.draw();

}

function keyPressed(){
  //Movimiento lateral tetrominos, flechas 
  if (keyCode == LEFT_ARROW  && currentBlock != null)   currentBlock.move(1,0);
  if (keyCode == RIGHT_ARROW && currentBlock != null)  currentBlock.move(-1,0);
  if (keyCode == DOWN_ARROW  && currentBlock != null)   currentBlock.move(0,1);
  if (keyCode == UP_ARROW  && currentBlock != null)     currentBlock.move(0,-1);


  //Rotaciones tetrominos
  if (keyCode == 90 /* Z */ && currentBlock != null)                    currentBlock.rotate(1,0,0);
  if (keyCode == 88 /* X */&& currentBlock != null)                     currentBlock.rotate(0,1,0);
  if (keyCode == 67 /* C */&& currentBlock != null)                     currentBlock.rotate(0,0,1);

  if (keyCode == 86 /* C */&& currentBlock != null){
    while (currentBlock){
      currentBlock.update();
    }
  }                     

  //Resetear camara
  if (key == ' ' /* Spacebar */) {
    horiRotation = 0;
    vertRotation = 0;
    zoomLevel = 1;
    cam.perspective(40);
  }

}

function update(){
  switch (linesCleared){
    case 10:
      level = 2;
      timeInterval = 55;
      break;
    case 20:
      level = 3;
      timeInterval = 48;
      break;
    case 30:
      level = 4;
      timeInterval = 38;
      break;
    case 40:
      level = 5;
      timeInterval = 26;
  }
  if (currentBlock != null){
    currentBlock.update(); // If block is null then throw the next one
  }
  else{
    // Check for lose condition
    for (let x = 1; x < matrixWidth - 1; x++) {
      for (let z = 1; z < matrixDepth - 1; z++) {
        if (gameMatrix[x][matrixHeight - 2][z] !== null) {
          gameOver = true;
          for (let i = 1; i < matrixWidth - 1 ; i++) {
            for (let j = 1; j < matrixHeight - 1; j++) {
                for (let k = 1; k < matrixDepth - 1; k++) {
                        if (gameMatrix[i][j][k] != null) {
                          gameMatrix[i][j][k] = 'black'
                        }
                }
            }
          }
          return; // Exit update function immediately
        }
      }
    }
    currentBlock = selectRandomTetromino(tetrominoArray); // new random block
  }
}

// UTILITY FUNCTIONS TO DO MATH MAGIC

function matrixMult(A, B) {
  if(A[0].length !== B.length) return "A col != B row";
  let l = A.length;      // Number of rows in A
  let m = A[0].length;   // Number of columns in A and number of rows in B
  let n = B[0].length;   // Number of columns in B
  
  let C = [];
  for(let i = 0; i < l; i++){
    C[i] = [];
    for(let j = 0; j < n; j++){
      C[i][j] = [];
    }
  }
  
  for(let row = 0; row < l ; row++){
    for(let col = 0; col < n; col++){
      let v = [];
      let w = [];
      for(let i = 0; i < m ; i++){
        v.push(A[row][i]);
        w.push(B[i][col]);
      }
      C[row][col] = dot(v,w);
    }
  }
  return C;
}

function dot(v, w){
  if(v.length != w.length) return "Error, vector lengths do not match";
  let sum = 0;
  for(let i = 0; i < v.length; i++){
    sum += v[i] * w[i];
  }
  return sum;
}

function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) return false;
  return true;
}

function mouseDragged(){
  let dx = mouseX - pmouseX;
  let dy = mouseY - pmouseY;
  // TODO: Elemento dom o algo para poder invertir la camara, modificar signo
  horiRotation = constrain(horiRotation - /* este signo xd */ dx * 0.05, -25 * zoomLevel, 25 * zoomLevel);
  vertRotation = constrain(vertRotation - /* este signo xd */ dy * 0.05, -4.5 * zoomLevel, 12 * zoomLevel);
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function mouseWheel(event) {
  zoomLevel += event.delta * 0.003;
  zoomLevel = constrain(zoomLevel, 0.5, 1.5);
  cam.perspective(40 * zoomLevel);
}

function moveYLayers(yLayer) {
  // We ignore borders and max move to height - 2
  for (let y = yLayer; y < matrixHeight - 2; y++) {
    for (let x = 1; x < matrixWidth - 1; x++) {
        for (let z = 1; z < matrixDepth - 1; z++) {
          gameMatrix[x][y][z] = gameMatrix[x][y+1][z]; // Moving layers
        }
      }
    }
}

function testingSetup(){
// Llenar bloques en el setup para destruirlos facilmente
for (let i = 1; i < matrixWidth - 3; i++) {
  for (let k = 1; k < matrixDepth - 2; k++) {
    let col = "blue";
    gameMatrix[i][1][k] = col;
  }
}
for (let i = 1; i < matrixWidth - 1; i++) {
  for (let k = 4; k < matrixDepth - 1; k++) {
    let col = "blue";
    gameMatrix[i][1][k] = col;
  }
}
for (let i = 1; i < matrixWidth - 3; i++) {
  for (let k = 1; k < matrixDepth - 2; k++) {
    let col = "blue";
    gameMatrix[i][2][k] = col;
  }
}
for (let i = 1; i < matrixWidth - 1; i++) {
  for (let k = 3; k < matrixDepth - 1; k++) {
    let col = "blue";
    gameMatrix[i][2][k] = col;
  }
}
for (let i = 1; i < matrixWidth - 3; i++) {
  for (let k = 3; k < matrixDepth - 3; k++) {
    let col = "red";
    gameMatrix[i][3][k] = col;
  }
}
}
function selectRandomTetromino(tetrominos) {
  // Selecciona un tetromino aleatorio del array de tetrominos.
    var randomIndex = Math.floor(Math.random() * tetrominos.length);
    var tetromino = tetrominos[randomIndex][0];
    var color = tetrominos[randomIndex][1];
    var newTetromino = new Tetromino(tetromino, color);
    
    // Define los límites dónde puede aparecer en base a su forma y rotación original.
    var maxValX = 0;
    var maxValZ = 0;
    for (var i = 0; i<tetromino.length; i++){
      maxValX = Math.max(maxValX,newTetromino.tetronimoMatrix[i][0]); // Revisa los valores máximos que tenga en el eje x y z del tetromino
      maxValZ = Math.max(maxValZ,newTetromino.tetronimoMatrix[i][2]); // para saber dónde puede colocarlo.
    }
    // Elige aleatoriamente un lugar para aparecer
    var randomPosX = 1+Math.floor(Math.random() * (matrixWidth-2 - maxValX));
    var randomPosZ = 1+Math.floor(Math.random() * (matrixWidth-2 - maxValZ));
    newTetromino.origin = [randomPosX, matrixHeight - 2, randomPosZ];
    
    // Hace las rotaciones aleatorias 
    var numberOfRotations = Math.floor(Math.random() * 6); // random returns [0,6)
    for(var i = 0; i<numberOfRotations; i++){
      var rotation=Math.floor(Math.random() * 3); // rotations in x, y and z axis => x=0, y=1, z=2
      switch(rotation){
        case 0: newTetromino.rotate(1,0,0);
          break;
        case 1: newTetromino.rotate(0,1,0);
          break;
        case 2: newTetromino.rotate(0,0,1);
          break;  
      }
    }
    return newTetromino;
}



class Tetromino {
  constructor(vertexMatrix, color = "blue") {
    this.tetronimoMatrix = vertexMatrix;
    this.col = color;
    this.origin = [1, matrixHeight - 2, 1];
    this.falling = true;
  }

  draw() {
    push();
      translate(boxSize * this.origin[0],boxSize * this.origin[1], boxSize * this.origin[2]); //Moverse al origen de la ficha 
      fill(this.col);
      for (let vert of this.tetronimoMatrix) {
        push(); 
          translate(boxSize * vert[0], boxSize * vert[1], boxSize * vert[2]); //moverse a las coordenadas relativas del vértice
          box(boxSize, boxSize);
        pop();
      }
    pop();
}

  update() {
      if (this.falling) {
        let emulOrigin = [this.origin[0], this.origin[1] - 1, this.origin[2]]; // Falling position in the next update call
        let simVertPositions = this.matrixsumPosition(this.tetronimoMatrix, emulOrigin);

        if (this.checkCollision(simVertPositions)) {

            // TODO: Matar la pieza dsp de un tiempo, no instantaneamente
            this.falling = false;

            // push every Cube into the gamematrix
            for (let coord of this.matrixsumPosition(this.tetronimoMatrix,this.origin)) gameMatrix[coord[0]][coord[1]][coord[2]] = this.col;
            currentBlock = null;
            
            //TODO: Delete complete matrix in xy
            
            // Check if a row is full to empty
            // Filter by Y layer and count if it has all the blocks in there.
            // This is for optimization purpouses, other ways to do this require a lot of comparison
            
            // We ignore: all the grey and purple box
            previousClearedLines = linesCleared
            for (let y = 1; y < matrixHeight - 1; y++) {
              let yLayerCount = 0;
              for (let x = 1; x < matrixWidth - 1; x++) {
                  for (let z = 1; z < matrixDepth - 1; z++) {
                      if (gameMatrix[x][y][z] !== null) {
                          yLayerCount += 1; // Count blocks of the yLayer not null
                      }
                  }
              }
              if (yLayerCount == (matrixWidth-2)*(matrixDepth-2)){ // length ignoring borders
                //Delete actual y layer then move others
                moveYLayers(y);
                linesCleared++; // Contar líneas añadidas
                y--; // We going back to see if after the movement of layers there is another one to move in the new position
              }
            }
            if (linesCleared - previousClearedLines != 0){
              switch (linesCleared - previousClearedLines){
                case 1:
                  score += level * 100;
                  break;
                case 2:
                  score += level * 300;
                  break;
                case 3:
                  score += level * 500;
                  break;
                case 4:
                  score += level * 800;
                  break;
              }
            }
            // CHECK if some block in y =0, if true game over. This could also be done in current block
        }else{
          this.origin[1] -= 1;
        }
      }
  }

  move(x, z) {
     // Check if we can move to desired position without colliding before actually moving, simulating collision before
      let emulOrigin = [this.origin[0] + x, this.origin[1] , this.origin[2] + z];
      let simVertPositions = this.matrixsumPosition(this.tetronimoMatrix, emulOrigin);

      if (!this.checkCollision(simVertPositions)) {
        this.origin[0] += x;
        this.origin[2] += z;
      } else {
        // TODO: Indicador que diga que ahi no se puede mover, cambiar el color slightly maybe
      }

  }

  checkCollision(matrix) {
    let tetrominoVertices = new Set(matrix.map(vertex => vertex.join(',')));

    for (let j = 0; j < matrixHeight; j++) {
        for (let i = 0; i < matrixWidth; i++) {
            for (let k = 0; k < matrixDepth; k++) {
                if (gameMatrix[i][j][k] !== null) {
                    if (tetrominoVertices.has([i, j, k].join(','))) return true; // Collision detected
                }
            }
        }
    }

    return false;
  }

  rotate(planeX, planeY, planeZ) {
    let rotationMatrix;
    let newMatrix = null;

    if (planeX) {
        rotationMatrix = [
            [1, 0, 0],
            [0, 0, -1],
            [0, 1, 0],
        ];
    } else if (planeY) {
        rotationMatrix = [
            [0, 0, 1],
            [0, 1, 0],
            [-1, 0, 0],
        ];
    } else if (planeZ) {
        rotationMatrix = [
            [0, -1, 0],
            [1, 0, 0],
            [0, 0, 1],
        ];
    }

    if (rotationMatrix) {
        let emulRot = matrixMult(this.tetronimoMatrix, rotationMatrix);
        let matrixCol = this.matrixsumPosition(emulRot, this.origin);
        
        if (!this.checkCollision(matrixCol)) {
            newMatrix = emulRot;
        } else {
            let message = `trata de rotar en ${planeX ? 'x' : planeY ? 'y' : 'z'} cuando colisionaria`;
            console.log(message);
        }
    }

    if (newMatrix) {
        this.tetronimoMatrix = newMatrix;
    }
}

  matrixsumPosition(vertexMatrix, origin) {
    let simVertPositions = [];
    for (let vert of vertexMatrix) {
        let simVert = [
            vert[0] + origin[0],
            vert[1] + origin[1],
            vert[2] + origin[2]
        ];
        simVertPositions.push(simVert);
    }
    return simVertPositions;
}

}


// Set up the canvas and main functions
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
window.mouseDragged = mouseDragged;
window.mouseWheel = mouseWheel;
