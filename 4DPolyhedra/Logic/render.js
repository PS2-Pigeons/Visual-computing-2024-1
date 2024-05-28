let points = [], angle = 0;

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight, WEBGL);
  // TESTING
  // Comment the following line to test in vscode with p5canvas extension
  // Uncomment to deploy in HTML or use Live server
  myCanvas.parent("canvasContainer");
  frameRate(30);

  //4D Octahedron
  points[0] = [[-0.5], [0], [0], [0]];
  points[1] = [[ 0.5], [0], [0], [0]];
  points[2] = [[ 0], [0.5], [0], [0]];
  points[3] = [[ 0], [-0.5], [0], [0]];
  points[4] = [[ 0], [0], [-0.5], [0]];
  points[5] = [[ 0], [0], [0.5], [0]];
  points[6] = [[ 0], [0], [0], [-0.5]];
  points[7] = [[ 0], [0], [0], [0.5]];
}

function draw() {  
  clear();
  orbitControl(1,1,0.2);

  angle += 0.01;
  
  const rotationZW = [
    [cos(angle), -sin(angle), 0, 0],
    [sin(angle),  cos(angle), 0, 0],
    [         0,           0, 1, 0],
    [         0,           0, 0, 1]
  ];
  
  const rotationXY = [
    [1, 0,          0,           0],
    [0, 1,          0,           0],
    [0, 0, cos(angle), -sin(angle)],
    [0, 0, sin(angle),  cos(angle)]
  ];
  
  let projected = [];
  for (let i=0; i<points.length; i++) {
    let rotated = matmult(rotationZW, points[i]); // 4x4 * 4x1 => 4x1
    rotated = matmult(rotationXY, rotated); // 4x4 * 4x1 => 4x1
    
    // Orthographic
    const orthographic = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0]
    ];
    
    let distance = 2;
    let w = 1 / (distance - rotated[3]);
    
    const perspective = [
      [w, 0, 0, 0],
      [0, w, 0, 0],
      [0, 0, w, 0],
    ];
    
    const projection = perspective;
    
    const p = matmult(projection, rotated); // 3x4 * 4x1 => 3x1
    const p1 = [height/2 * p[0], height/2 * p[1], height/2 * p[2]]; // a * 3x1 => 3x1
    projected.push(p1);
  }

  drawOctahedron(projected);
}

function drawOctahedron(projected){
  for (let i=0; i<8; i++){
    for (let j=0; j<8; j++){
      if (j != i+1){ // No conecta los opuestos
        connect(i,   j,     projected);
      }
    }
  }

  // desde aca se pinta a mano para sacar todas las caras posibles
  push();
  stroke(0);
  fill(200,77,0, 50);
  // CARAS INTERNAS BOTTOM
  beginShape(LINES);
  // Central point
  vertex(projected[6][0], projected[6][1], projected[6][2]);
  vertex(projected[2][0], projected[2][1], projected[2][2]);
  vertex(projected[0][0], projected[0][1], projected[0][2]);
  endShape();

  beginShape(LINES);
  vertex(projected[6][0], projected[6][1], projected[6][2]);
  vertex(projected[2][0], projected[2][1], projected[2][2]);
  vertex(projected[5][0], projected[5][1], projected[5][2]);
  endShape();

  beginShape(LINES);
  vertex(projected[6][0], projected[6][1], projected[6][2]);
  vertex(projected[2][0], projected[2][1], projected[2][2]);
  vertex(projected[1][0], projected[1][1], projected[1][2]);
  endShape();

  beginShape(LINES);
  vertex(projected[6][0], projected[6][1], projected[6][2]);
  vertex(projected[2][0], projected[2][1], projected[2][2]);
  vertex(projected[1][0], projected[1][1], projected[1][2]);
  endShape();
  
  beginShape(LINES);
  vertex(projected[6][0], projected[6][1], projected[6][2]);
  vertex(projected[2][0], projected[2][1], projected[2][2]);
  vertex(projected[4][0], projected[4][1], projected[4][2]);
  endShape();
  pop();

  // Caras externas 
  push();
  stroke(0);
  fill(200,122,0, 50);
  // CARAS INTERNAS TOP
  beginShape(LINES);
  // Central point
  vertex(projected[6][0], projected[6][1], projected[6][2]);
  vertex(projected[3][0], projected[3][1], projected[3][2]);
  vertex(projected[0][0], projected[0][1], projected[0][2]);
  endShape();
  beginShape(LINES);
  // Central point
  vertex(projected[6][0], projected[6][1], projected[6][2]);
  vertex(projected[3][0], projected[3][1], projected[3][2]);
  vertex(projected[4][0], projected[4][1], projected[4][2]);
  endShape();
  beginShape(LINES);
  // Central point
  vertex(projected[6][0], projected[6][1], projected[6][2]);
  vertex(projected[3][0], projected[3][1], projected[3][2]);
  vertex(projected[1][0], projected[1][1], projected[1][2]);
  endShape();
  beginShape(LINES);
  // Central point
  vertex(projected[6][0], projected[6][1], projected[6][2]);
  vertex(projected[3][0], projected[3][1], projected[3][2]);
  vertex(projected[5][0], projected[5][1], projected[5][2]);
  endShape();
  pop();

  // Caras externas
  push();
  stroke(0);
  fill(0,122,122, 50);
  // CARAS externas TOP
  beginShape(LINES);
  vertex(projected[3][0], projected[3][1], projected[3][2]);
  vertex(projected[4][0], projected[4][1], projected[4][2]);
  vertex(projected[0][0], projected[0][1], projected[0][2]);
  endShape();
  beginShape(LINES);
  vertex(projected[3][0], projected[3][1], projected[3][2]);
  vertex(projected[4][0], projected[4][1], projected[4][2]);
  vertex(projected[1][0], projected[1][1], projected[1][2]);
  endShape();
  beginShape(LINES);
  vertex(projected[3][0], projected[3][1], projected[3][2]);
  vertex(projected[1][0], projected[1][1], projected[1][2]);
  vertex(projected[5][0], projected[5][1], projected[5][2]);
  endShape();
  beginShape(LINES);
  vertex(projected[3][0], projected[3][1], projected[3][2]);
  vertex(projected[0][0], projected[0][1], projected[0][2]);
  vertex(projected[5][0], projected[5][1], projected[5][2]);
  endShape();

  // Caras externas Bottom
  push();
  stroke(0);
  fill(50,50,255, 50);
  // CARAS externas TOP
  beginShape(LINES);
  vertex(projected[2][0], projected[2][1], projected[2][2]);
  vertex(projected[4][0], projected[4][1], projected[4][2]);
  vertex(projected[0][0], projected[0][1], projected[0][2]);
  endShape();
  beginShape(LINES);
  vertex(projected[2][0], projected[2][1], projected[2][2]);
  vertex(projected[4][0], projected[4][1], projected[4][2]);
  vertex(projected[1][0], projected[1][1], projected[1][2]);
  endShape();
  beginShape(LINES);
  vertex(projected[2][0], projected[2][1], projected[2][2]);
  vertex(projected[1][0], projected[1][1], projected[1][2]);
  vertex(projected[5][0], projected[5][1], projected[5][2]);
  endShape();
  beginShape(LINES);
  vertex(projected[2][0], projected[2][1], projected[2][2]);
  vertex(projected[0][0], projected[0][1], projected[0][2]);
  vertex(projected[5][0], projected[5][1], projected[5][2]);
  endShape();
  
  for (let i=0; i<projected.length; i++) {
    if (i < 4) {
      stroke(255, 0, 0);
    } else {
      stroke(0, 255, 0);
    }
    push();
    strokeWeight(15);
    point(projected[i][0], projected[i][1], projected[i][2]);
    pop();
  }
  
}

function connect(i, j, points){
  stroke(0);
  strokeWeight(1);
  line(points[i][0], points[i][1], points[i][2],
       points[j][0], points[j][1], points[j][2]);
}

function face(i, points){
  vertex(points[i][0], points[i][1], points[i][2]);
}

function matmult(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const rowsB = matrixB.length;
  const colsB = matrixB[0].length;
  
  if (colsA !== rowsB) {
    throw new Error("Invalid matrix dimensions");
  }
  
  const result = new Array(rowsA).fill()
    .map(() => new Array(colsB).fill(0));
  
  for (let i=0; i<rowsA; i++) {
    for (let j=0; j<colsB; j++) {
      result[i][j] = 0;
      for (let k=0; k<colsA; k++) {
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }
  
  return result;
}

window.setup = setup;
window.draw = draw;
