
// this variable will hold our shader object
let theShader;
// this variable will hold our webcam video
let cam;

const frag = `

// casey conchinha - @kcconch ( https://github.com/kcconch )
// louise lessel - @louiselessel ( https://github.com/louiselessel )
// more p5.js + shader examples: https://itp-xstory.github.io/p5js-shaders/

precision mediump float;

// grab texcoords from vert shader
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;


void main() {
    vec2 uv = vTexCoord;
    
    // the texture is loaded upside down and backwards by default so lets flip it
    uv.y = 1.0 - uv.y;
    
    vec4 tex = texture2D(tex0, uv);
    
    float gray = (tex.r + tex.g + tex.b) / 3.0;
    
    float res = 20.0;
    float scl = res / (10.0);
    
    float threshR = (fract(floor(tex.r*res)/scl)*scl) * gray ;
    float threshG = (fract(floor(tex.g*res)/scl)*scl) * gray ;
    float threshB = (fract(floor(tex.b*res)/scl)*scl) * gray ;
    vec3 thresh = vec3(threshR, threshG, threshB);
    
    // render the output
    gl_FragColor = vec4(thresh, 1.0);
}

`;

const vert = `
// vert file and comments from adam ferriss
// https://github.com/aferriss/p5jsShaderExamples

// our vertex data
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// lets get texcoords just for fun!
varying vec2 vTexCoord;

void main() {
    // copy the texcoords
    vTexCoord = aTexCoord;
    
    // copy the position data into a vec4, using 1.0 as the w component
    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
    
    // send the vertex information on to the fragment shader
    gl_Position = positionVec4;
}
`;


new p5(function(p5) {

    p5.setup = function() {
        p5.createCanvas(325, 245, p5.WEBGL);
        theShader = p5.createShader(vert, frag);
        // shaders require WEBGL mode to work
        p5.noStroke();
        cam = p5.createCapture(p5.VIDEO);
        cam.size(710, 400);
        cam.hide();
    };
    
    p5.draw = function() {
    
        p5.clear();
        // shader() sets the active shader with our shader
        p5.shader(theShader);
        // passing cam as a texture
        theShader.setUniform('tex0', cam);

        // rect gives us some geometry on the screen
        p5.rect(0,0,20,20);
    
    };
    
    
    }, 'tvScreen');
    