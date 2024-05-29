
import { AssignmentContainer } from '../Index/assignmentContainer.js';

let container;
let containerSize;
let horizPadding;
let vertPadding;

let controlsText = "Fog Shader\nOrbit controls enabled";


new p5(function(p5) {

    p5.setup = async function() {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        container = new AssignmentContainer(p5, '../index.html', 'Back to menu', ['../Index/Images/back_0.png', '../Index/Images/back_1.png'], 'back btn');
        await container.preload();
        p5.windowResized();
    };

    p5.draw = function(){
        p5.clear();
        container.display();
        p5.cursor(container.isMouseInside() ?  p5.HAND : p5.ARROW);

        // Draw controls text
        p5.fill(0);
        p5.textSize(16);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.text(controlsText, p5.width/2, 80);

        // Optionally, display slider values for debugging
        p5.text(`Fog Density: ${fogDensity*100}%`, p5.width/2, 110);

    };

    p5.mouseClicked = function() {
        if (container.isMouseInside()) container.onclick();
    };

    p5.windowResized = function() {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        containerSize = p5.windowHeight * 0.25;
        horizPadding = p5.windowWidth * 0.05;
        vertPadding = p5.windowHeight * 0.0625;
        let y = vertPadding + (containerSize + vertPadding);
        container.adjust(p5.constrain(p5.windowWidth - horizPadding - containerSize, 3 * (horizPadding + containerSize), p5.windowWidth - horizPadding - containerSize) , y, containerSize);
    };

}, 'menu');
