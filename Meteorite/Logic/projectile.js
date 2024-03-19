const {World, Bodies, Body, Vector, Composite} = Matter;

export class Projectile{
    constructor(body, lifeSpan = 100){
        this.body = body;
        this.body.owner = this;
        this.lifeSpan = lifeSpan;
        this.timeAlive = 0;
    }

    update(){
        this.timeAlive += 1;
        const pos = this.body.position;
        if (pos.x > width) Body.setPosition(this.body, { x: 0, y: pos.y });
        if (pos.x < 0) Body.setPosition(this.body, { x: width, y: pos.y });
        if (pos.y > height) Body.setPosition(this.body, { x: pos.x, y: 0 });
        if (pos.y < 0) Body.setPosition(this.body, { x: pos.x, y: height });
    }

    render(){
        push();
            rectMode(CENTER);
            stroke(255); 
            translate(this.body.position.x, this.body.position.y);
            rotate(this.body.angle);
            rect(0,0,2,2);
        pop();
    }

    onCollision(body) {
        return
    }

    isExpired(){
        return this.timeAlive  > this.lifeSpan;
    }
}
