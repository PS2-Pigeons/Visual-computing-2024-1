const {World, Bodies, Body} = Matter;

import { Meteorite } from './meteorite.js';

export class MeteoriteSystem{

    meteorites = [];
    scoreUpdate = null;

<<<<<<< HEAD
    constructor(world, meteoriteSpeedMultiplier, startingSize, meteoriteMaxHp){
=======
    constructor(world, meteoriteSpeedMultiplier = 0.5, startingSize = 40, meteoriteMaxHp = 4){
>>>>>>> e2eb2062336a2a015134d5a8bc9e80e7bc0348d1
        this.world = world;
        this.speedMultiplier = meteoriteSpeedMultiplier;
        this.startingSize = startingSize;
        this.meteoriteMaxHp = meteoriteMaxHp;
    }

    addMeteorite(radius){
        // Como la friccion del aire está en cero, la gravedad del mundo en cero, se simula que el meteorito esté en el espacio
        const meteorite = new Meteorite(this.meteoriteMaxHp);
        const body = Bodies.circle(random(width), random(height), radius, {label : "Meteorite", frictionAir: 0, restitution: 0.9, });
        const velocity = p5.Vector.random2D().mult(this.speedMultiplier);
        Body.setVelocity(body, { x: velocity.x, y: velocity.y });

        body.owner = this;
        body.object = meteorite;
        meteorite.body = body;

        World.add(this.world, body);
        this.meteorites.push(meteorite);
    }

    splitMeteorite(meteorite, projectile) {

        // update score
        if (this.scoreUpdate) this.scoreUpdate(this.meteoriteMaxHp - (meteorite.maxHp - 1));

        // Remove the destroyed meteorite from the array
        const index = this.meteorites.indexOf(meteorite);
        if (index !== -1) this.meteorites.splice(index, 1);
    
        // Remove the original meteorite's body from the world
        World.remove(this.world, meteorite.body);
    
        if (meteorite.maxHp == 1) return;
    
        // Create two new meteorites
        const pos = meteorite.body.position;
        const radius = meteorite.body.circleRadius;
    
        const half1 = new Meteorite(this.meteoriteMaxHp);
        const half2 = new Meteorite(this.meteoriteMaxHp);
        
        let body1 = Bodies.circle(pos.x + random(-radius , radius), pos.y + random(-radius, radius), radius / 2, {label : "Meteorite", frictionAir: 0, restitution: 0.9 });
        let body2 = Bodies.circle(pos.x - random(-radius , radius), pos.y - random(-radius, radius), radius / 2, {label : "Meteorite", frictionAir: 0, restitution: 0.9 });
    
        half1.maxHp = meteorite.maxHp - 1;
        half2.maxHp = meteorite.maxHp - 1;
        half1.hp = meteorite.maxHp - 1;
        half2.hp = meteorite.maxHp - 1;
    
        // Set velocities for new meteorites
        const speed = (this.meteoriteMaxHp - half1.hp) * this.speedMultiplier;
        const velocity1 = p5.Vector.fromAngle(projectile.angle).mult(-speed);
        const velocity2 = p5.Vector.fromAngle(projectile.angle + HALF_PI).mult(speed);
    
        Body.setVelocity(body1, { x: velocity1.x, y: velocity1.y });
        Body.setVelocity(body2, { x: velocity2.x, y: velocity2.y });
    
        body1.owner = this;
        body2.owner = this;
        body1.object = half1;
        body2.object = half2;
    
        half1.body = body1;
        half2.body = body2;
    
        World.add(this.world, [body1, body2]);
        this.meteorites.push(half1, half2);
    }
    

    update() {
        for (let i = this.meteorites.length - 1; i >= 0; i--) {
            const meteorite = this.meteorites[i];
            meteorite.update();
            if (meteorite.isDestroyed()) {
                World.remove(this.world, meteorite.body); // Remove from Matter.js world
                this.meteorites.splice(i, 1); // Remove from array
            }
        }
    }

    render(){
        for (let meteorite of this.meteorites) meteorite.render();
    }

    onCollision(meteorite, body) {
        if (body.label == "Projectile") this.splitMeteorite(meteorite.object, body);
    }
    
    spawnMeteorites(n_meteorites, radius){
        for(let i = 0; i<n_meteorites; i++) this.addMeteorite(radius);
    }

}
