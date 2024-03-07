export class Projectile{
    constructor(ship, projectileSystem){
        this.rotation = ship.rotation;
        this.pos = createVector(ship.pos.x, ship.pos.y);
        this.velocity = createVector( cos(this.rotation) * projectileSystem.SpeedMultiplier,
                                        sin(this.rotation) * projectileSystem.SpeedMultiplier);
        this.timeAlive = 0;
        this.lifeSpan = projectileSystem.lifeSpan;
    }

    update(){
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
        this.timeAlive += 1;

        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
    }

    render(){
        push();
            translate(this.pos.x,this.pos.y);
            stroke(255);
            rect(0,0,2,2);
        pop();
    }

    isExpired(){
        return this.timeAlive  > this.lifeSpan;
    }
}
