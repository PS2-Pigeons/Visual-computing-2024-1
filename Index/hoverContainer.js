export class hoverContainer {
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
        p5.push();
            p5.rectMode(p5.CENTER);
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