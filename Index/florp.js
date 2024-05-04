let centerModel;
let modelTexture;
let centerVertStartPos;

new p5(function(p5) {

p5.preload = function() {
    centerModel = p5.loadModel('Index/Models/Florp.obj', true);
    modelTexture = p5.loadImage('Index/Models/T_Florp.png');
};

p5.setup = async function() {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    await p5.preload();
    p5.windowResized();
    p5.angleMode(p5.DEGREES);
};

p5.draw = function() {
    p5.noStroke();
    p5.clear();
    p5.translate(0, centerVertStartPos);
    p5.rotateX(p5.map(p5.mouseY, 0, p5.height, 20, -45));
    p5.rotateY(p5.map(p5.mouseX, 0, p5.width, -45, 45));
    p5.scale(1,-1,1);
    p5.model(centerModel);
    p5.texture(modelTexture);
};

p5.windowResized =  function() {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    centerVertStartPos = - p5.windowHeight * 0.08;
};

}, model);
