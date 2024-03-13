const {World, Bodies, Body, Vector, Composite} = Matter;

export class Projectile{
    constructor(ship, projectileSystem){
        this.rotation = ship.rotation;
        this.pos = createVector(ship.pos.x, ship.pos.y);
        this.velocity = createVector( cos(this.rotation) * projectileSystem.SpeedMultiplier,
                                        sin(this.rotation) * projectileSystem.SpeedMultiplier);
        this.timeAlive = 0;
        this.lifeSpan = projectileSystem.lifeSpan;
        
        this.collider = Bodies.circle(this.pos.x, this.pos.y, 2, {isSensor : true, label : "Projectile"});
        this.world = ship.world;
        World.add(this.world, this.collider);
    }

    update(){
        if (this.hasBody()){
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
        this.timeAlive += 1;

        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;
        Body.setPosition(this.collider,new Vector.create(this.pos.x, this.pos.y));
        }
    }
    hasBody(){ 
        return Composite.get(this.world, this.collider.id, this.collider.type) != null;
    }

    render(){
        if (this.hasBody()){
        push();
            translate(this.collider.position.x,this.collider.position.y);
            stroke(255);
            rect(0,0,2,2);
        pop();
        }
    }

    isExpired(){
        if (this.timeAlive  > this.lifeSpan){
            Composite.remove(this.world, this.collider);
        }
        return this.timeAlive  > this.lifeSpan;
    }
}
