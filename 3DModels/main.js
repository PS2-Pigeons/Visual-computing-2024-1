let tvModel;
let modelTexture;
let centerVertStartPos;

new p5(function(p5) {

p5.preload = function() {
    tvModel = p5.loadModel('Models/tv.obj', true);
};

p5.setup = async function() {
    p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
    await p5.preload();
    p5.windowResized();
    p5.angleMode(p5.DEGREES);
};

p5.draw = function() {
    p5.background(125);

    // p5.push();
    //     p5.noStroke();
    //     p5.rotateX(45);
    //     p5.plane(800,800);
    // p5.pop();

    //PEGAR ESTE CODIGO PARA INSERTAR SUS MODELOS
    p5.push();
        p5.noStroke();
        p5.ambientLight(128, 128, 128);
        p5.directionalLight(128, 128, 128, 0, 0, -1);
        const locX = p5.mouseX - p5.width / 2;
        const locY = p5.mouseY - p5.height / 2;
        p5.pointLight(255, 255, 255, locX, locY, 100);
        p5.spotLight(255, 0, 0, locX + 50, locY, 200, 0, 0, -1, Math.PI / 32);

        p5.ambientMaterial(modelHovered == 'Sreyeso - Old TV' ?  p5.color(176, 110, 40) : p5.color(0, 0, 0)); //Color del modelo 
        
        //HACER TRASLACIONES Y ROTACIONES SI ES NECESARIO
        p5.scale(2,-2,-2); //AJUSTAR
        p5.model(tvModel); //CAMBIAR
    p5.pop();

    
};

p5.windowResized =  function() {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
};

}, model);
