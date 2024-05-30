import { AssignmentContainer } from '../../Index/assignmentContainer.js';

let container;
let containerSize;
let horizPadding;
let vertPadding;

let controlsText = "Second Assignment - 3D Tetris \nArrow keys to move the pieces\nH, J, K to rotate the piece in X, Y and Z respectively\nClick and drag to move camera, scroll to zoom\nSpacebar to reset camera";
let scoreText = `Lines Cleared: ${linesCleared} \n Score: ${score}`

new p5(function(p5) {

    p5.setup = async function() {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        container = new AssignmentContainer(p5, '../index.html', 'Back to menu', ['../Index/Images/back_0.png', '../Index/Images/back_1.png'], 'back btn');
        await container.preload();
        p5.windowResized();
    };

    p5.draw = function(){
        scoreText = `Lines Cleared: ${linesCleared} \nScore: ${score}`
        p5.clear();
        container.display();
        p5.cursor(container.isMouseInside() ?  p5.HAND : p5.ARROW);

        // Draw controls text
        p5.fill(0);
        p5.textSize(16);
        p5.textAlign(p5.LEFT, p5.CENTER);
        p5.text(controlsText, horizPadding, p5.windowHeight/2);
        p5.text(scoreText, horizPadding*5, p5.windowHeight/2);
        if (gameOver){
        p5.push();
        p5.fill(255, 0, 0);
        p5.rectMode(p5.CENTER);
        p5.rect(width / 2, height / 2, 300, 100);
        p5.textAlign(p5.CENTER, p5.CENTER);
        p5.fill(255);
        p5.textSize(24);
        p5.text("Game Over", width / 2, height / 2 - 15);
        p5.textSize(16);
        p5.text(`Max score: ${score}`, width / 2, height / 2 + 10);
        p5.text("Press F5 to try again", width / 2, height / 2 + 30);
        p5.pop();
        }
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
