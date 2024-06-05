
import { AssignmentContainer } from '../../Index/assignmentContainer.js';

let container;
let gemFrenzy;
let repo;
let containerSize;
let horizPadding;
let vertPadding;

let controlsText = "Godot Proyect\nInteractive Complex Scene\nShameless Gem Frenzy plug\n\nOpen Source!\nCode for project and all assignments";

new p5(function(p5) {

    p5.setup = async function() {
        p5.createCanvas(p5.windowWidth, p5.windowHeight);
        container = new AssignmentContainer(p5, '../../index.html', 'Back to menu', ['../../Index/Images/back_0.png', '../../Index/Images/back_1.png'], 'back btn');
        gemFrenzy = new AssignmentContainer(p5, 'https://theyippies.itch.io/gem-frenzy', 'Epic self insert', ['../../Index/Images/gemFrenzy_1.png', '../../Index/Images/gemFrenzy_2.png'], 'gem frenzy');
        repo = new AssignmentContainer(p5, 'https://github.com/PS2-Pigeons/Visual-computing-2024-1', 'Repo Here', ['../../Index/Images/repo_0.png','../../Index/Images/repo_1.png'], 'repo');
        await container.preload();
        await gemFrenzy.preload();
        await repo.preload();
        p5.windowResized();
    };

    p5.draw = function(){
        p5.clear();
        container.display();
        gemFrenzy.display();
        repo.display();
        p5.cursor(container.isMouseInside() ?  p5.HAND : p5.ARROW);

        // Draw controls text
        p5.fill(0);
        p5.textSize(16);
        p5.textAlign(p5.LEFT, p5.CENTER);
        p5.text(controlsText, horizPadding, p5.windowHeight/2);
    };

    p5.mouseClicked = function() {
        if (container.isMouseInside()) container.onclick();
        if (gemFrenzy.isMouseInside()) window.open('https://theyippies.itch.io/gem-frenzy', '_blank');;
        if (repo.isMouseInside()) window.open('https://github.com/PS2-Pigeons/Visual-computing-2024-1', '_blank');;
    };

    p5.windowResized = function() {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
        containerSize = p5.windowHeight * 0.25;
        horizPadding = p5.windowWidth * 0.05;
        vertPadding = p5.windowHeight * 0.0625;
        container.adjust(p5.constrain(p5.windowWidth - horizPadding - containerSize, 3 * (horizPadding + containerSize), p5.windowWidth - horizPadding - containerSize) , vertPadding + (2) * (containerSize + vertPadding), containerSize);
        gemFrenzy.adjust(p5.constrain(p5.windowWidth - horizPadding - containerSize, 3 * (horizPadding + containerSize), p5.windowWidth - horizPadding - containerSize) , vertPadding + (1) * (containerSize + vertPadding), containerSize);
        repo.adjust(p5.constrain(p5.windowWidth - horizPadding - containerSize, 3 * (horizPadding + containerSize), p5.windowWidth - horizPadding - containerSize) , vertPadding + (0) * (containerSize + vertPadding), containerSize);
    }

}, 'menu');
