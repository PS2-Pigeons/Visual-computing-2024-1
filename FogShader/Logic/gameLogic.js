
let cam;
let timeInterval = 60;
let rot =  0;
let canvas, img, offset;
let shaderFog, fogColor, fogDensity;
let sliderDensity;

function preload() {
  img = loadImage('pigeon.png');
}
function setup() {
  var myCanvas = createCanvas(800, 600, WEBGL); // Create a WebGL canvas 
  // TESTING
  // Comentar siguiente linea para probar en vscode con extensión p5canvas
  // Descomentar para que quede en orden las cosas en el html deployeado / Live server
  // myCanvas.parent("canvasContainer");
  
  frameRate(60);
  angleMode(DEGREES);
  shaderFog = createShader(shaderFogVert, shaderFogFrag);
  fogColor = [0.45,0.45,0.55,1.0];
  fogDensity = 0.002;

  sliderDensity = createSlider(0, 1.0, 0.25, 0.05);
  sliderDensity.position(width-120, 60);
  sliderDensity.size(100);

  //make another thing that shows the values
  valueDisplayer = createP();
  valueDisplayer.position(width-110,25);
  noStroke();
}

function draw() {
  background(fogColor[0]*255,fogColor[1]*255,fogColor[2]*255);
   // Enable orbiting with the mouse.
  orbitControl();

  valueDisplayer.html("Fog Density: " + sliderDensity.value());

  rot += 0.3;
  fogDensity = sliderDensity.value();

  shaderFog.setUniform("sTexture", img);
  shaderFog.setUniform("fillCol", [0.2,0.2,0.5]);
  shaderFog.setUniform("uFogColor", fogColor);
  shaderFog.setUniform("uFogDensity", fogDensity);
  
  shader(shaderFog);
  translate(0,0,300);
  push();
  for (let i = 0; i < 5; i++){
    translate(16, 0, -64);
    push();
    rotateZ(rot);
    rotateX(rot);
    rotateY(rot);
    box(32);
    pop();
  }
  pop();

  push();
  for (let i = 0; i < 5; i++){
    translate(-16, 0, -64);
    push();
    rotateZ(rot);
    rotateX(rot);
    rotateY(rot);
    box(32);
    pop();
  }
  pop();

  push();
  translate(16*5,0,-64*5);
  for (let i = 0; i < 5; i++){
    translate(-16, 0, -64);
    push();
    rotateZ(rot);
    rotateX(rot);
    rotateY(rot);
    box(32);
    pop();
  }
  pop();
  push();
  translate(-16*5,0,-64*5);
  for (let i = 0; i < 5; i++){
    translate(16, 0, -64);
    push();
    rotateZ(rot);
    rotateX(rot);
    rotateY(rot);
    box(32);
    pop();
  }
  pop();
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

varying vec3 vPos;

void main() {
  // Camera looking objects
  vTexCoord = aTexCoord;
  gl_Position = uProjectionMatrix * 
    uModelViewMatrix *
    vec4(aPosition, 1.0); 

  // Position in camera perspective
  vPos = (uModelViewMatrix * vec4(aPosition, 1.0)).xyz;
}

`;

const shaderFogFrag = `
precision mediump float;
 
// Passed in from the vertex shader.
varying vec2 vTexCoord;
varying vec3 vPos;
// The texture.
uniform sampler2D sTexture;
 
uniform vec4 uFogColor;
uniform float uFogDensity;
 
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

  #define LOG2 1.442695
  // Se añade el fog
  float fogDist = length(vPos)/100.0;
  float fogAmount = 1. - exp2(-uFogDensity * uFogDensity * fogDist * fogDist * LOG2);
  fogAmount = clamp(fogAmount, 0., 1.);
  gl_FragColor = mix(col, uFogColor, fogAmount);  
}

`;