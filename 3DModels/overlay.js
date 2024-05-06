

class hoverContainer {
    constructor(p5, link, description, w, h) {
        this.p5 = p5; // Reference to p5 instance
        this.x = 0;
        this.y = 0;
        this.width = w;
        this.height = h;
        this.link = link;
        this.description = description;
    }

    display() {
        const p5 = this.p5;
        p5.rectMode(p5.CENTER);
        p5.push();
            p5.stroke(0,0,0,125);
            p5.noFill();
            p5.rect(this.x, this.y, this.width, this.height);
        p5.pop();
    }

    adjust(x,y){
        this.x = x;
        this.y = y;
    }

    isMouseInside() {
        const p5 = this.p5;

        const left = this.x - this.width / 2;
        const right = this.x + this.width / 2;
        const top = this.y - this.height / 2;
        const bottom = this.y + this.height / 2;

        return p5.mouseX > left && p5.mouseX < right &&
                p5.mouseY > top && p5.mouseY < bottom;
    }

    onclick() {
        window.open(this.link, '_blank');
    }
}


let hoverContainers = [];
let description = "";

new p5(function(p5) {

p5.setup = function() {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    hoverContainers.push(new hoverContainer(p5, 'https://www.youtube.com/watch?v=Pl0HBMzvlD0', 'Sreyeso - Old TV', 450, 520));
    //hoverContainers.push(new hoverContainer(p5, 'https://www.youtube.com/watch?v=AJNnZp0ZXEE', 'Jgaravitoh - ', 0, 0));
    //hoverContainers.push(new hoverContainer(p5, 'https://www.youtube.com/watch?v=AJNnZp0ZXEE', 'Dtobarl - ',0, 0));
    //hoverContainers.push(new hoverContainer(p5, 'https://www.youtube.com/watch?v=AJNnZp0ZXEE', 'Jucabezasm - ', 0, 0));
    p5.windowResized();
};

p5.draw = function() {

    p5.clear();
    let mouseOverAnyContainer = false;
    
    hoverContainers.forEach(container => {
        container.display();

        if (container.isMouseInside()) {
            p5.cursor(p5.HAND);
            mouseOverAnyContainer = true;
            description = container.description;
            modelHovered = container.description;
        }
    });

    if (!mouseOverAnyContainer) {
        p5.cursor(p5.ARROW);
        description = '';
        modelHovered = null;
    }

    p5.push();

    // Draw description
    p5.textSize(14);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.text(description, p5.width/2, p5.height - 100);

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
};

}, 'overlay');
