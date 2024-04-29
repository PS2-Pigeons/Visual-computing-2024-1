let points = [], angle = 0;

function setup() {
  createCanvas(680, 480, WEBGL);
  

  //4D Cube
  //createCube();
  //4D Octahedron
  createOctahedron();
  
}

function createCube(){
  points[0] = [[-0.5], [-0.5], [-0.5], [-0.5]];
  points[1] = [[ 0.5], [-0.5], [-0.5], [-0.5]];
  points[2] = [[ 0.5], [ 0.5], [-0.5], [-0.5]];
  points[3] = [[-0.5], [ 0.5], [-0.5], [-0.5]];
  points[4] = [[-0.5], [-0.5], [ 0.5], [-0.5]];
  points[5] = [[ 0.5], [-0.5], [ 0.5], [-0.5]];
  points[6] = [[ 0.5], [ 0.5], [ 0.5], [-0.5]];
  points[7] = [[-0.5], [ 0.5], [ 0.5], [-0.5]];
  
  points[8] = [[-0.5], [-0.5], [-0.5], [ 0.5]];
  points[9] = [[ 0.5], [-0.5], [-0.5], [ 0.5]];
  points[10] = [[ 0.5], [ 0.5], [-0.5], [ 0.5]];
  points[11] = [[-0.5], [ 0.5], [-0.5], [ 0.5]];
  points[12] = [[-0.5], [-0.5], [ 0.5], [ 0.5]];
  points[13] = [[ 0.5], [-0.5], [ 0.5], [ 0.5]];
  points[14] = [[ 0.5], [ 0.5], [ 0.5], [ 0.5]];
  points[15] = [[-0.5], [ 0.5], [ 0.5], [ 0.5]];
}
function createOctahedron(){
  // (±1, 0, 0, 0), (0, ±1, 0, 0), (0, 0, ±1, 0), (0, 0, 0, ±1). All 
  //vertices are connected by edges except opposite pairs.
  // The edge length is √2.
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
  background(128);
  orbitControl();
  
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

  //drawCube(projected);
  drawOctahedron(projected);
  
}

function drawOctahedron(projected){
  for (let i=0; i<projected.length; i++) {
    if (i < 4) {
      stroke(255, 0, 0);
    } else {
      stroke(0, 255, 0);
    }
    strokeWeight(14);
    point(projected[i][0], projected[i][1], projected[i][2]);
  }
  
  for (let i=0; i<8; i++){
    for (let j=0; j<8; j++){
      if (j != i+1){ // No conecta los opuestos
        connect(i,   j,     projected);
      }
    }
  }


}

function drawCube(projected){
  for (let i=0; i<projected.length; i++) {
    if (i < 8) {
      stroke(255, 0, 0);
    } else {
      stroke(0, 255, 0);
    }
    strokeWeight(16);
    point(projected[i][0], projected[i][1], projected[i][2]);
  }
  
  for (let i=0; i<4; i++){
    connect(i,   (i+1) % 4,     projected);
    connect(i+4, (i+1) % 4 + 4, projected);
    connect(i,           i + 4, projected);
  }
  
  for (let i=0; i<4; i++){
    connect(i  +8,   (i+1) % 4     +8,     projected);
    connect(i+4+8,   (i+1) % 4 + 4 +8, projected);
    connect(i  +8,           i + 4 +8, projected);
  }
  
  for (let i=0; i<8; i++){
     connect(i, i+8, projected);
  }
}

function connect(i, j, points){
  stroke(255);
  strokeWeight(1);
  line(points[i][0], points[i][1], points[i][2],
       points[j][0], points[j][1], points[j][2]);
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