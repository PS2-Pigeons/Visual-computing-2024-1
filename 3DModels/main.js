
let tvModel;
let roomModel;
let tableModel;
let fanModel;
let ringModel;
let florp;
let florpT;

new p5(function(p5) {

p5.preload = function() {
    tvModel = p5.loadModel('Models/tv.obj', true);
    tableModel = p5.loadModel('Models/mesa.obj', true);
    roomModel = p5.loadModel('Models/room.obj', true);
    fanModel = p5.loadModel('Models/ventilador.obj', true);
    ringModel = p5.loadModel('Models/ring.obj', true);

    florp = p5.loadModel('..//Index/Models/Florp.obj', true);
    florpT = p5.loadImage('..//Index/Models/T_Florp.png');
};

p5.setup = function() {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    p5.windowResized();
    p5.angleMode(p5.DEGREES);
};

p5.draw = function() {

    const locX = p5.mouseX - p5.width / 2;
    const locY = p5.mouseY - p5.height / 2;
    p5.pointLight(255, 255, 255, locX, locY, 100);
    p5.spotLight(255, 0, 0, locX + 50, locY, 200, 0, 0, -1, Math.PI / 32);
    p5.ambientLight(128, 128, 128);
    p5.directionalLight(128, 128, 128, 0, 0, -1);
    p5.noStroke();

    p5.push();
        p5.ambientMaterial(modelHovered == 'Jgaravitoh - Room' ?  p5.color(0, 44, 125) : p5.color(0, 125, 125)); //Color del modelo 
        p5.translate(-550,0); 
        p5.rotateX(-20); 
        p5.rotateY(-20);
        p5.scale(-1.5,-1.5,1.5); //AJUSTAR
        p5.model(roomModel); //CAMBIAR
    p5.pop();

    p5.push();
        p5.ambientMaterial(modelHovered == 'Sreyeso - Old TV' ?  p5.color(115, 8, 49) : p5.color(0)); //Color del modelo 
        p5.scale(2,-2,-2); //AJUSTAR
        p5.model(tvModel); //CAMBIAR
    p5.pop();

    p5.push();
        p5.ambientMaterial(modelHovered == 'Jucabezasm - Furniture' ?  p5.color(176, 58, 40) : p5.color(176, 110, 40)); //Color del modelo 
        p5.scale(1,-1.2,1); //AJUSTAR
        p5.rotateY(-30);
        p5.translate(425,-110,-200); 
        p5.model(tableModel); //CAMBIAR
    p5.pop();

    p5.push();
        p5.ambientMaterial(modelHovered == 'Jucabezasm - Furniture' ?  p5.color(122, 91, 91) : p5.color(125)); //Color del modelo 
        p5.translate(430,-80); 
        p5.rotateY(80);
        p5.scale(1.5,-1.5,1.5); //AJUSTAR
        p5.model(fanModel); //CAMBIAR
    p5.pop();

    p5.push();
        p5.ambientMaterial(modelHovered == 'Dtobarl - Ring' ?  p5.color(200, 255, 0) : p5.color( 255, 215, 0)); //Color del modelo 
        p5.translate(480,0,200); 
        p5.rotateZ(-40);
        p5.scale(0.5,0.5,0.5); //AJUSTAR
        p5.model(ringModel); //CAMBIAR
    p5.pop();

    p5.push();
        p5.translate(0,-305); 
        p5.scale(1,-1,1);
        p5.rotateX(20);
        p5.texture(florpT);
        p5.model(florp); 
    p5.pop();

    
};

p5.windowResized =  function() {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
};

}, model);
