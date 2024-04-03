let matrixWidth = (7) + 1;  // Width of the playable area + 2 (borders)
let matrixHeight = (9) + 1; // Height of the playable area + 2 (borders)
let matrixDepth = (7) + 1;  // Depth of the playable area + 2 (borders)
let boxSize = 25;     // Size of each box
let gameMatrix = [];    // 3D array to store colors
let lineLengthX = matrixWidth * boxSize;
let lineLengthY = matrixHeight * boxSize;
let blackLineZ = matrixDepth * boxSize;
let cam;

let zoomLevel = 1;    // Zoom level
let vertRotation = 0;    // Vertical rotation
let rotationZ = 0;    // Rotation angle around the Z-axis

class Cube{
  constructor(vertexMatrix, color = "blue"){
    this.position = [5, 0, 5];
    this.falling = true;
    this.tetronimeMatrix = vertexMatrix;
    this.col = color;   
  }
  update(){
    // Falling
    if (this.falling){
      this.position[1] += 1;
      let emulPos = [this.position[0],this.position[1]+1,this.position[2]];
      let matrixCol = matrixSumPosition(this.tetronimeMatrix, emulPos);

      if (this.checkCollision(matrixCol)){
        //console.log('colisiona');
        this.falling = false;
        let matrixWithPos = matrixSumPosition(this.tetronimeMatrix, this.position);
        // push every cube in gamematrix
        for (let i = 0; i < matrixWithPos.length; i++){
          gameMatrix.push({"vert":matrixWithPos[i],"col": this.col});
        }
        currentBlock = null;


        // Check if a row is full to empty
        // Filter by Y layer and count if it has all the blocks in there. 
        // This is for optimization purpouses, other ways to do this require a lot of comparison 
        let iterative = [0,1,2,3,4,5,6,7,8,9,10]; // esta mierda
        let toDelete = [];
        iterative.forEach(y => {
          let filter = gameMatrix.filter(r => r.vert[1] == y);
          let len = filter.length;
          if (len == matrixWidth*matrixDepth+matrixWidth*2 + matrixDepth)
          {
            console.log('El layer Y'+ y + "se debe borrar");
            filter.forEach(r => {
              toDelete.push(gameMatrix.findIndex(k => k == r));
            });
          }
        });
        let newGameMatrix = [];
        for (let m = 0; m< gameMatrix.length; m++){
          if (toDelete.includes(m)){
            continue;
          }
          newGameMatrix.push(gameMatrix[m]);
        }
        gameMatrix = newGameMatrix;
        // CHECK if some block in y =0, if true game over. This could also be done in current block
      }
    }
  }
  move(x,y,z){
    // CHECK IF I CAN MOVE IN THAT DIRECTION
    if (x!=0){
      // simulate collision after move and check
      let emulPos = [this.position[0]+x,this.position[1],this.position[2]];
      let matrixCol = matrixSumPosition(this.tetronimeMatrix, emulPos);

      if (!this.checkCollision(matrixCol)){
        this.position[0] += x;
      }
      else{// console log pa testing, tocaria cambiarle el color o hacer algo funny si intenta moverse donde no cabe
        //console.log('trata de moverse en x cuando colisionaria');
      }
    }
    if (z!=0){
      // simulate collision after move and check
      let emulPos = [this.position[0],this.position[1],this.position[2]+z];
      let matrixCol = matrixSumPosition(this.tetronimeMatrix, emulPos);
      if (!this.checkCollision(matrixCol)){
        this.position[2] += z;
      }
      else{// console log pa testing, tocaria cambiarle el color o hacer algo funny si intenta moverse donde no cabe
        //console.log('trata de moverse en z cuando colisionaria');
      }
    }
  }
  rotate(planeX,planeY,planeZ){
    let rotationMatrix;
    let newMatrix = null;
    if (planeX){// Si el argumento es rotar en X
      rotationMatrix = [[1,0,0],[0,0,-1],[0,1,0]]; // Estas matriz de rotacion esta sacada de matematicas con un angulo de 90 grados
      
      // simulate collision after move and check
      let emulRot = matrixMult(this.tetronimeMatrix, rotationMatrix);
      let matrixCol = matrixSumPosition(emulRot, this.position);
      if (!this.checkCollision(matrixCol)){
        newMatrix = emulRot;
      }
      else{// console log pa testing, tocaria cambiarle el color o hacer algo funny si intenta moverse donde no cabe
        console.log('trata de rotar en x cuando colisionaria');
      }
    }
    if (planeY){// Si el argumento es rotar en Y
      rotationMatrix = [[0,0,1],[0,1,0],[-1,0,0]];

      // simulate collision after move and check
      let emulRot = matrixMult(this.tetronimeMatrix, rotationMatrix);
      let matrixCol = matrixSumPosition(emulRot, this.position);
      if (!this.checkCollision(matrixCol)){
        newMatrix = emulRot;
      }
      else{// console log pa testing, tocaria cambiarle el color o hacer algo funny si intenta moverse donde no cabe
        console.log('trata de rotar en y cuando colisionaria');
      }
    }
    if (planeZ){// Si el argumento es rotar en Z
      rotationMatrix = [[0,-1,0],[1,0,0],[0,0,1]];

      // simulate collision after move and check
      let emulRot = matrixMult(this.tetronimeMatrix, rotationMatrix);
      let matrixCol = matrixSumPosition(emulRot, this.position);
      if (!this.checkCollision(matrixCol)){
        newMatrix = emulRot;
      }
      else{// console log pa testing, tocaria cambiarle el color o hacer algo funny si intenta moverse donde no cabe
        console.log('trata de rotar en z cuando colisionaria');
      }
    }
    if (newMatrix != null){
      this.tetronimeMatrix = newMatrix;
    }
  }
  draw(){
    push();
    translate(boxSize/2, boxSize/2, boxSize/2); // Translate para centrar la pieza
    translate(boxSize * this.position[0],
      boxSize * this.position[1],
      boxSize * this.position[2]);//Translate para poner la pieza en la posicion actual
    fill(this.col); // colorea
    for (let n = 0; n < this.tetronimeMatrix.length; n++){ // Dibuja cada cubo de la pieza segun las coordenadas de su matriz
      let vert = this.tetronimeMatrix[n];
      let x = vert[0];
      let y = vert[1];
      let z = vert[2];
      push();
      translate(boxSize * x,boxSize * y,boxSize *z);
      box(boxSize,boxSize);
      pop();
    }
    pop();
  }
  
  checkCollision(matrix){
    let gameMatrixVertex = gameMatrix.map(function(element){
      return element.vert;
  });
    let found = gameMatrixVertex.some(a => matrix.some(b => compareArrays(a,b)));
    if (found){
      return true;
    }
  return false;
  }
}

function keyPressed(){
  if (keyCode == LEFT_ARROW || keyCode == 65){ // A
    if (currentBlock != null){
      currentBlock.move(-1,0,0);
    }
  }
  if (keyCode == RIGHT_ARROW || keyCode == 68){
    if (currentBlock != null){
      currentBlock.move(1,0,0);
    }
  }
  if (keyCode == DOWN_ARROW || keyCode == 83){
    if (currentBlock != null){
      currentBlock.move(0,0,1);
    }
  }
  if (keyCode == UP_ARROW || keyCode == 87){
    if (currentBlock != null){
      currentBlock.move(0,0,-1);
    }
  }
  if (keyCode == 72){ // h
    if (currentBlock != null){
      currentBlock.rotate(1,0,0);
    }
  }
  if (keyCode == 74){ // j
    if (currentBlock != null){
      currentBlock.rotate(0,1,0);
    }
  }
  if (keyCode == 75){ // k
    if (currentBlock != null){
      currentBlock.rotate(0,0,1);
    }
  }
  
  
}

function setup() {
  var myCanvas = createCanvas(800, 600, WEBGL); // Create a WebGL canvas
  // TESTING
  // Comentar siguiente linea para probar en vscode con extensión p5canvas
  // Descomentar para que quede en orden las cosas en el html deployeado / Live server
  // myCanvas.parent("canvasContainer");
  
  createCanvas(800, 600, WEBGL); // Create a WebGL canvas
  angleMode(DEGREES);
  cam = createCamera();
  cam.camera(lineLengthX * 0.1, lineLengthY * 0.3, blackLineZ * 3.5 , boxSize, boxSize, boxSize, 0, 0, -1);
  cam.perspective(40);
  frameRate(3);
  gridDraw();

  // Dummy cube to tests
  currentBlock = new Cube([[1,1,1],[0,1,0],[1,1,0],[0,1,1]], "blue");
}

function draw() {
  background(255);
  rotateX(-vertRotation);
  rotateY(vertRotation);
  rotateZ(rotationZ); // Rotate around the Y-axis
  update();

  // Draw the axes X RED, Y GREEN, Z BLUE
  axesDraw();

  if (currentBlock != null){
    currentBlock.draw();
  }
  // Draw tetris blocks
  push();
  translate(boxSize/2, boxSize/2, boxSize/2);
  for (let n = 0; n < gameMatrix.length; n++){
    let vert = gameMatrix[n].vert;
    if (gameMatrix[n].col != "transparent"){
      fill(gameMatrix[n].col);
    }
    else{
      noStroke();
      noFill();
    }
    let x = vert[0];
    let y = vert[1];
    let z = vert[2];
    push();
    translate(boxSize * x,boxSize * y,boxSize *z);
    box(boxSize,boxSize);
    pop();
  }
  pop();
}

function update(){
  // Current block update
  if (currentBlock != null){
    currentBlock.update();
  }
  else{ // If block is null then throw the next one
    currentBlock = new Cube([[1,1,1],[0,1,0],[1,1,0],[0,1,1]],"green");
  }
}

mouseDragged = function() {
  let dx = mouseX - pmouseX;
  let dy = mouseY - pmouseY;
  rotationZ = constrain(rotationZ - dx * 0.05, -25 * zoomLevel, 25 * zoomLevel);
  vertRotation = constrain(vertRotation + dy * 0.05, -4.5 * zoomLevel, 12 * zoomLevel);
};

mouseWheel = function(event) {
  zoomLevel += event.delta * 0.003;
  zoomLevel = constrain(zoomLevel, 0.5, 1.5);
  cam.perspective(40 * zoomLevel);
};

function axesDraw(){
  push();
  stroke(255, 0, 0); // Set the color for the x-axis to red
  line(0, 0, 0, boxSize * matrixWidth, 0, 0); // Draw the x-axis
  stroke(0, 255, 0); // Set the color for the y-axis to green
  line(0, 0, 0, 0, boxSize * matrixHeight, 0); // Draw the y-axis
  stroke(0, 0, 255); // Set the color for the z-axis to blue
  line(0, 0, 0, 0, 0, boxSize * matrixDepth); // Draw the z-axis
  pop();
}

function gridDraw(){
  // For testing finishing layer
  // Draw the grid in xz plane
  for (let x = 0; x < matrixWidth-2; x++) { // Loop through each row
    for (let z = 1; z < matrixDepth; z++) { // Loop through each column
      vert = [x,matrixHeight-1,z];
      col = "blue";
      grid = {"vert":vert,"col":col};
      gameMatrix.push(grid);
    }
  }
  for (let x = matrixWidth-2; x < matrixWidth; x++) { // Loop through each row
    for (let z = matrixDepth-5; z < matrixDepth; z++) { // Loop through each column
      vert = [x,matrixHeight-1,z];
      col = "blue";
      grid = {"vert":vert,"col":col};
      gameMatrix.push(grid);
    }
  }

  // Draw the grid in xy plane
  for (let y = 0; y < matrixHeight; y++) { // Loop through each row
    for (let x = 0; x < matrixWidth; x++) { // Loop through each column
      vert = [x,y,0];
      col = "grey";
      grid = {"vert":vert,"col":col};
      gameMatrix.push(grid);
    }
  }
  for (let y = 0; y < matrixHeight; y++) { // Loop through each row
    for (let z = 0; z < matrixDepth; z++) { // Loop through each column
      vert = [matrixWidth,y,z];
      col = "grey";
      grid = {"vert":vert,"col":col};
      gameMatrix.push(grid);
    }
  }
    // Draw the grid in xz plane
    for (let x = 0; x < matrixWidth; x++) { // Loop through each row
      for (let z = 0; z < matrixDepth; z++) { // Loop through each column
        vert = [x,matrixHeight,z];
        col = "grey";
        grid = {"vert":vert,"col":col};
        gameMatrix.push(grid);
      }
    }

  // Draw the invisible collider grid in xy plane
  for (let y = 0; y < matrixHeight; y++) { // Loop through each row
    for (let x = 0; x < matrixWidth; x++) { // Loop through each column
      vert = [x,y,matrixDepth];
      col = "transparent";
      grid = {"vert":vert,"col":col};
      gameMatrix.push(grid);
    }
  }
  
  for (let y = 0; y < matrixHeight; y++) { // Loop through each row
    for (let z = 0; z < matrixDepth; z++) { // Loop through each column
      vert = [-1,y,z];
      col = "transparent";
      grid = {"vert":vert,"col":col};
      gameMatrix.push(grid);
    }
  }
}

// UTILITY FUNCTIONS TO DO MATH MAGIC

function matrixMult(A, B) {
  if(A[0].length !== B.length) return "A col != B row";
  l = A.length;      // Number of rows in A
  m = A[0].length;   // Number of columns in A and number of rows in B
  n = B[0].length;   // Number of columns in B
  
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
  for(i = 0; i < v.length; i++){
    sum += v[i] * w[i];
  }
  return sum;
}

function matrixSumPosition(A,B){
  let finalMatrix = [];
  for (let i = 0; i<A.length; i++){
    let x = A[i][0] + B[0];
    let y = A[i][1] + B[1];
    let z = A[i][2] + B[2];
    let vec3 = [x,y,z];
    finalMatrix.push(vec3);
  }
  return finalMatrix;
}

function compareArrays(a,b){
  //console.log('a '+a.join()+"b "+b.join());
  return a.join() == b.join();
}