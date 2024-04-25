
let cam;
let timeInterval = 60;
let rot =  0;
let canvas, img, offset;
let shaderFog, fogColor, fogNearest, fogFar;

function setup() {
  var myCanvas = createCanvas(800, 600, WEBGL); // Create a WebGL canvas 
  // TESTING
  // Comentar siguiente linea para probar en vscode con extensión p5canvas
  // Descomentar para que quede en orden las cosas en el html deployeado / Live server
  // myCanvas.parent("canvasContainer");
  
  frameRate(60);
  angleMode(DEGREES);

  cam = createCamera();
  cam.perspective(40);
  img = loadImage("pigeon.png");
  shaderFog = createShader(shaderFogVert, shaderFogFrag);
  fogColor = [0.45,0.45,0.55,1.0];
  fogNearest = 0.1;
  fogFar = 1500;
}

function draw() {
  background(fogColor[0]*255,fogColor[1]*255,fogColor[2]*255);
   // Enable orbiting with the mouse.
  orbitControl();
  rot += 0.5;

  shaderFog.setUniform("sTexture", img);
  shaderFog.setUniform("fillCol", [0.2,0.2,0.5]);
  shaderFog.setUniform("uFogColor", fogColor);
  shaderFog.setUniform("uFogNearest", fogNearest);
  shaderFog.setUniform("uFogFar", fogFar);
  
  shader(shaderFog);

  translate(0, 0, 200);
  box(100);
  translate(50, 0, -150);
  box(100);
  translate(50, 0, -150);
  box(100);
  translate(50, 0, -150);
  box(100);
  translate(50, 0, -150);
  box(100);
  translate(50, 0, -150);
  box(100);
  // Timer to control the update function
  if (frameCount % timeInterval === 0) update();

}

function update(){
  shaderFog.setUniform("uNoise", getNoiseValue());
}

function getNoiseValue() {
  let value = noise(millis()/100);
  return map(value, 0, 1, 0, 0.5);
}

const shaderFogVert = `
precision mediump float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec2 vTexCoord;

varying float vFogDepth;

void main() {
  // Camera looking objects
  vTexCoord = aTexCoord;
  gl_Position = uProjectionMatrix * 
    uModelViewMatrix *
    vec4(aPosition, 1.0); 

  // Fog Depth
  vFogDepth = -(uModelViewMatrix * vec4(aPosition, 1.0)).z;
}

`;

const shaderFogFrag = `
precision mediump float;
 
// Passed in from the vertex shader.
varying vec2 vTexCoord;
varying float vFogDepth;
// The texture.
uniform sampler2D sTexture;
 
uniform vec4 uFogColor;
uniform float uFogNear;
uniform float uFogFar;
 
uniform vec3 fillCol;
uniform float uNoise;

void main() {
  // dibuja la textura y el color de relleno
  vec3 filler;
  filler.r = fillCol.r + uNoise;
  filler.g = fillCol.g - uNoise;
  filler.b = fillCol.b + uNoise;
  
  vec4 col = texture2D(sTexture, vTexCoord).rgba;
  if (col.a < 1.0){
    col = vec4(filler,1.0);
  }

  // Se añade el fog
  float fogAmount = smoothstep(uFogNear, uFogFar, vFogDepth);
  gl_FragColor = mix(col, uFogColor, fogAmount);  
}

`;

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