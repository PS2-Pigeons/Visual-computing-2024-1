export class Meteorite{
    constructor(meteoriteSystem){
        this.life = 3;
        this.radius = 45;
        this.pos = createVector(random(width), random(height)); // Random position on the screen
        // Adjust the generated velocity based on the meteorite's current life
        let speed = (4 - this.life) * meteoriteSystem.SpeedMultiplier;
        // Generate a random 2D velocity vector with magnitude based on the adjusted speed
        this.velocity = p5.Vector.random2D().mult(speed);
    }

    update(){
        
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    }

    render(){
        push();
            noFill();
            translate(this.pos.x,this.pos.y);
            stroke(255);
            ellipse(0,0, this.radius); // Con el translate ya me muevo a la pos del meteorito, el centro es (0,0)
        pop();
    }

    isDestroyed(){
        return this.life==0;
    }

}
