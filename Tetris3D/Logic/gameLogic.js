let matrixWidth = (8) + 2;  // Width of the playable area + 2 (borders)
let matrixHeight = (8) + 2; // Height of the playable area + 2 (borders)
let matrixDepth = (12) + 2;  // Depth of the playable area + 2 (borders)
let boxSize = 25;     // Size of each box
let gameMatrix = [];    // 3D array to store colors
let lineLengthX = matrixWidth * boxSize;
let lineLengthY = matrixHeight * boxSize;
let blackLineZ = matrixDepth * boxSize;
let cam;
let currentBlock;
let timeInterval = 60;


let zoomLevel = 1;    // Zoom level
let vertRotation = 0;    // Vertical rotation
let rotationZ = 0;    // Rotation angle around the Z-axis

function setup() {
  var myCanvas = createCanvas(800, 600, WEBGL); // Create a WebGL canvas
  // TESTING
  // Comentar siguiente linea para probar en vscode con extensión p5canvas
  // Descomentar para que quede en orden las cosas en el html deployeado / Live server
  myCanvas.parent("canvasContainer");
  
  frameRate(60);
  angleMode(DEGREES);

  cam = createCamera();
  cam.camera(lineLengthX * 1.55, lineLengthY * 1.55, blackLineZ * 1.85 , boxSize, boxSize, boxSize, 0, 0, -1);
  cam.perspective(40);

  // Initialize the 3D matrix
  for (let i = 0; i < matrixWidth; i++) {
    gameMatrix[i] = [];
    for (let j = 0; j < matrixHeight; j++) {
      gameMatrix[i][j] = [];
        for (let k = 0; k < matrixDepth; k++) {
          let col = 'transparent';
            if (i == 0 || i == matrixWidth - 1 || j == 0 || j == matrixHeight - 1 || k == 0) col = 'gray';
            if (k == matrixDepth - 1) col = 'purple';
                gameMatrix[i][j][k] = (col != 'transparent') ? { vert: [i, j, k] , col: col} : {col: col};
        }
    }
  }

  currentBlock = new Tetromino([[0,0,0], [1,0,0], [0,1,0], [1,1,0]] , "green")

}

function draw() {
  background(255);
  //Camera controls
  rotateX(-vertRotation);
  rotateY(vertRotation);
  rotateZ(rotationZ);

  // Draw 3D matrix
  for (let i = 0; i < matrixWidth - 1; i++) {
    for (let j = 0; j < matrixHeight - 1; j++) {
        for (let k = 0; k < matrixDepth - 1; k++) {
            push(); // Save the current transformation matrix
                translate(i * boxSize, j * boxSize, k * boxSize);
                let col = gameMatrix[i][j][k].col;    
                if (col != 'transparent') {
                    fill(col);
                } else {
                    noStroke();
                    noFill();
                } 
                box(boxSize);
            pop(); // Restore the previous transformation matrix
        }
    }
  }

  // Timer to control the update function
  if (frameCount % timeInterval === 0) update();
  if (currentBlock) currentBlock.draw();

}

function keyPressed(){
  //Movimiento lateral tetrominos, flechas y WASD
  if (keyCode == LEFT_ARROW || keyCode == 65 && currentBlock != null)   currentBlock.move(-1,0,0);
  if (keyCode == RIGHT_ARROW || keyCode == 68 && currentBlock != null)  currentBlock.move(1,0,0);
  if (keyCode == DOWN_ARROW || keyCode == 83 && currentBlock != null)   currentBlock.move(0,1,0);
  if (keyCode == UP_ARROW || keyCode == 87 && currentBlock != null)     currentBlock.move(0,-1,0);

  //Rotaciones tetrominos
  if (keyCode == 72 /* H */ && currentBlock != null)                    currentBlock.rotate(1,0,0);
  if (keyCode == 74 /* J */&& currentBlock != null)                     currentBlock.rotate(0,1,0);
  if (keyCode == 75 /* K */&& currentBlock != null)                     currentBlock.rotate(0,0,1);

  //Resetear camara
  if (key == ' ' /* Spacebar */) {
    rotationZ = 0;
    vertRotation = 0;
    zoomLevel = 1;
    cam.perspective(40);
  }

}

function update(){
  currentBlock ? currentBlock.update() : currentBlock = new Tetromino([[0,0,0], [1,0,0], [0,1,0], [1,1,0]], "green");
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
  rotationZ = constrain(rotationZ - dx * 0.05, -25 * zoomLevel, 25 * zoomLevel);
  vertRotation = constrain(vertRotation + dy * 0.05, -4.5 * zoomLevel, 12 * zoomLevel);
}

function mouseWheel(event) {
  zoomLevel += event.delta * 0.003;
  zoomLevel = constrain(zoomLevel, 0.5, 1.5);
  cam.perspective(40 * zoomLevel);
}

class Tetromino {
  // origin = [Math.floor(random(2, matrixWidth - 1)), Math.floor(random(2, matrixHeight - 1)), matrixDepth - 2];
  origin = [1, 1, 5];
  falling = true;

  constructor(vertexMatrix, color = "blue") {
      this.tetronimoMatrix = vertexMatrix;
      this.col = color;
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
        let emulOrigin = [this.origin[0], this.origin[1], this.origin[2] - 1]; // Falling position in the next update call
        let simVertPositions = this.matrixsumPosition(this.tetronimoMatrix, emulOrigin);

        if (this.checkCollision(simVertPositions)) {

            // TODO: Matar la pieza dsp de un tiempo, no instantaneamente
            this.falling = false;

            // push every Cube into the gamematrix
            for (let vert of this.matrixsumPosition(this.tetronimoMatrix,this.origin)) gameMatrix[vert[0]][vert[1]][vert[2]] = {vert: vert, col: this.col};
            currentBlock = null;
            
            //TODO: Delete complete matrix in xy
            return;

            // Check if a row is full to empty
            // Filter by Y layer and count if it has all the blocks in there.
            // This is for optimization purpouses, other ways to do this require a lot of comparison
            let iterative = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // esta mierda
            let toDelete = [];
            iterative.forEach((y) => {
            let filter = gameMatrix.filter((r) => r.vert[1] == y);
            let len = filter.length;
            if (
                len ==
                matrixWidth * matrixDepth + matrixWidth * 2 + matrixDepth
            ) {
                console.log("El layer Y" + y + "se debe borrar");
                filter.forEach((r) => {
                toDelete.push(gameMatrix.findIndex((k) => k == r));
                });
            }
            });
            let newGameMatrix = [];
            for (let m = 0; m < gameMatrix.length; m++) {
            if (toDelete.includes(m)) {
                continue;
            }
            newGameMatrix.push(gameMatrix[m]);
            }
            gameMatrix = newGameMatrix;
            // CHECK if some block in y =0, if true game over. This could also be done in current block
        }else{
          this.origin[2] -= 1;
        }
      }
  }

  move(x, y) {
     // Check if we can move to desired position without colliding before actually moving, simulating collision before
      let emulOrigin = [this.origin[0] + x, this.origin[1] + y, this.origin[2]];
      let simVertPositions = this.matrixsumPosition(this.tetronimoMatrix, emulOrigin);

      if (!this.checkCollision(simVertPositions)) {
        this.origin[0] += x;
        this.origin[1] += y;
      } else {
        // TODO: Indicador que diga que ahi no se puede mover, cambiar el color slightly maybe
      }

  }

  checkCollision(matrix) {
    let gameMatrixVertices = gameMatrix.flat(2).filter((element) => element.vert).map((element) => element.vert);
    return gameMatrixVertices.some((a) =>matrix.some((b) => compareArrays(a, b)));
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
