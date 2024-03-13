const {World, Bodies, Body, Vector, Composite} = Matter;

export class Meteorite{
    constructor(world, meteoriteSystem){
        this.life = 3;
        this.radius = 45;
        this.pos = createVector(random(width), random(height)); // Random position on the screen
        // Adjust the generated velocity based on the meteorite's current life
        let speed = (4 - this.life) * meteoriteSystem.SpeedMultiplier;
        // Generate a random 2D velocity vector with magnitude based on the adjusted speed
        this.velocity = p5.Vector.random2D().mult(speed);
        // Collider
        this.collider = Bodies.circle(this.pos.x, this.pos.y, this.radius, {isSensor : false, label : "Meteorite"});
        this.world = world
        World.add(this.world, this.collider);
    }

    update(){
        if (this.hasBody()){
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.y > height) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height;

        // Actualizar posicion de mi colision
        Body.setPosition(this.collider,new Vector.create(this.pos.x, this.pos.y));
        }
        else if (!this.isDestroyed()){// sio no tiene body es pq lo golpearon
            this.life -= 1;
            // se vuelve a poner un collider
            this.collider = Bodies.circle(this.pos.x, this.pos.y, this.radius, {isSensor : false, label : "Meteorite"});
            World.add(this.world, this.collider);
        }
    }

    hasBody(){ 
        return Composite.get(this.world, this.collider.id, this.collider.type) != null;
    }

    render(){
        if (this.hasBody()){
        push();
            noFill();
            translate(this.collider.position.x,this.collider.position.y);
            stroke(255);
            ellipse(0,0, this.radius); // Con el translate ya me muevo a la pos del meteorito, el centro es (0,0)
        pop();
        }
        else if (!this.isDestroyed()){
            push();
            Fill(255,0,0);
            translate(this.pos.x,this.pos.y);
            stroke(255);
            ellipse(0,0, this.radius); // Con el translate ya me muevo a la pos del meteorito, el centro es (0,0)
        pop();
        }
    }
    isDestroyed(){
        if (this.life == 0){
            Composite.remove(this.world, this.collider); // Elimina meteorito actual
        }
        return this.life==0;
    }

}
