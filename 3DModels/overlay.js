
import { hoverContainer } from '../Index/hoverContainer.js';

let hoverContainers = [];
let description = "";

new p5(function(p5) {

p5.setup = function() {
    
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    hoverContainers.push(new hoverContainer(p5, 'https://www.youtube.com/watch?v=Pl0HBMzvlD0', 'Sreyeso - Old TV', 450, 520));
    hoverContainers.push(new hoverContainer(p5, 'https://www.youtube.com/watch?v=1e-urj8Hk5Q', 'Jgaravitoh - Room', 560, 350));
    hoverContainers.push(new hoverContainer(p5, 'https://drive.google.com/file/d/1b6jfSN06P-MbBpt_ZQMI8q9mUHDPZ1MB/view', 'Dtobarl - Ring',160, 110));
    hoverContainers.push(new hoverContainer(p5, 'https://drive.google.com/file/d/1dKKChRb-7mpwoBRWx_qD0JG07DHQ9I1p/view', 'Jucabezasm - Furniture', 150, 520));
    hoverContainers.push(new hoverContainer(p5, 'https://drive.google.com/file/d/1dKKChRb-7mpwoBRWx_qD0JG07DHQ9I1p/view', 'Jucabezasm - Furniture', 300, 50));
    hoverContainers.push(new hoverContainer(p5, 'https://drive.google.com/file/d/1dKKChRb-7mpwoBRWx_qD0JG07DHQ9I1p/view', 'Jucabezasm - Furniture', 280, 200));
    hoverContainers.push(new hoverContainer(p5, 'https://www.youtube.com/watch?v=AJNnZp0ZXEE', 'Florp', 200, 90));
    p5.windowResized();
};

p5.draw = function() {

    p5.clear();

    let mouseOverAnyContainer = false;

    p5.push();
                p5.rectMode(p5.CENTER);
                p5.noStroke();
                p5.fill(255);
                p5.rect(p5.width / 2, p5.height - 50, 650, 60);
            p5.pop();
    
    hoverContainers.forEach(container => {
        //container.display();

        if (container.isMouseInside()) {
            p5.cursor(p5.HAND);
            mouseOverAnyContainer = true;
            description = container.description;
            modelHovered = container.description;
        }
    });

    if (!mouseOverAnyContainer) {
        p5.cursor(p5.ARROW);
        description = 'ESC para volver al Landing';
        if (p5.keyIsPressed === true && p5.keyCode === p5.ESCAPE) {
            window.location.href = '../index.html';
        }
        modelHovered = null;
    }

    p5.push();

    // Draw description
    p5.textSize(50);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.text(description, p5.width/2, p5.height - 50);

p5.pop();


};

p5.mouseClicked = function() {
    hoverContainers.forEach(container => {
        if (container.isMouseInside()) container.onclick();
    });
};

p5.windowResized =  function() {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    hoverContainers[0].adjust(p5.width / 2, p5.height / 2);
    hoverContainers[1].adjust(p5.width / 2 - 590, p5.height / 2 + 22);
    hoverContainers[2].adjust(p5.width / 2 + 645, p5.height / 2);
    hoverContainers[3].adjust(p5.width / 2 + 450, p5.height / 2);
    hoverContainers[4].adjust(p5.width / 2 + 450, p5.height / 2 - 105);
    hoverContainers[5].adjust(p5.width / 2 + 500, p5.height / 2 + 170);
    hoverContainers[6].adjust(p5.width / 2 , p5.height / 2 - 310);
};

}, 'overlay');
