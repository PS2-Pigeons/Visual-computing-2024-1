
export class AssignmentContainer {
    constructor(p5, link, text, imageUrls = ['Index/Images/construction_0.png',  'Index/Images/construction_1.png'] , description = 'Under Construction...') {
        this.p5 = p5; // Reference to p5 instance
        this.x = 0;
        this.y = 0;
        this.size = 0; // Size of a side
        this.imageUrls = imageUrls;
        this.link = link;
        this.text = text; // Text to display under the image
        this.description = description;
        this.currentImageIndex = 0;
        this.images = [];
    }

    async preload() {
        for (let url of this.imageUrls) {
            const image = await this.p5.loadImage(url);
            this.images.push(image);
        }
    }

    adjust(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
    }

    display() {
        const p5 = this.p5;
        this.currentImageIndex = this.isMouseInside() ? 1 : 0;

        p5.push();
            p5.noStroke();
            p5.fill(0,0,0,125);
            p5.rect(this.x, this.y, this.size, this.size);

            // Draw image
            if (this.images[this.currentImageIndex]) {
                const imageSize = this.size * 0.7;
                const imageX = this.x + (this.size - imageSize) / 2; // Centered horizontally
                const imageY = this.y + this.size * 0.1; // Moved upwards by 10% of the container height
                p5.image(this.images[this.currentImageIndex], imageX, imageY, imageSize, imageSize);
            }

            p5.fill(255);
            p5.textAlign(p5.CENTER, p5.CENTER);
            p5.textSize(this.size * 0.1);
            p5.text(this.text, this.x, this.y + this.size * 0.9, this.size); // Centered text below the image
        p5.pop();
    }

    isMouseInside() {
        const p5 = this.p5;
        return  p5.mouseX > this.x && p5.mouseX < this.x + this.size &&
                p5.mouseY > this.y && p5.mouseY < this.y + this.size;
    }

    onclick() {
        window.location.href = this.link;
    }
}
