const {World, Bodies, Body} = Matter;

import { Meteorite } from './meteorite.js';

export class MeteoriteSystem{

    constructor(world, meteoriteSpeedMultiplier = 0.5, startingSize = 30){
        this.world = world;
        this.meteorites = [];
        this.speedMultiplier = meteoriteSpeedMultiplier;
        this.startingSize = startingSize;
    }

    addMeteorite(radius){
        // Como la friccion del aire está en cero, la gravedad del mundo en cero, se simula que el meteorito esté en el espacio
        const body = Bodies.circle(random(width), random(height), radius, {label : "Meteorite", frictionAir: 0, restitution: 0.9, });
        const velocity = p5.Vector.random2D().mult(this.speedMultiplier);
        Body.setVelocity(body, { x: velocity.x, y: velocity.y });
        World.add(this.world, body);
        this.meteorites.push(new Meteorite(body));
    }

    // Function to split a meteorite into two
    splitMeteorite(meteorite) {
        // Remove the destroyed meteorite from the array
        const index = this.meteorites.indexOf(meteorite);
        if (index !== -1) this.meteorites.splice(index, 1);

        // Remove the original meteorite's body from the world
        World.remove(this.world, meteorite.body);

        if (meteorite.maxHp == 1) return;
    
        // Create two new meteorites
        const pos = meteorite.body.position;
        const radius = meteorite.body.circleRadius;

        let half1 = new Meteorite(Bodies.circle(pos.x + random(-radius , radius), pos.y + random(-radius, radius), radius / 2, {label : "Meteorite", frictionAir: 0, restitution: 0.9 }));
        let half2 = new Meteorite(Bodies.circle(pos.x - random(-radius , radius), pos.y - random(-radius, radius), radius / 2, {label : "Meteorite", frictionAir: 0, restitution: 0.9 }));
    
        // Reduce life of new meteorites
        half1.maxHp = meteorite.maxHp - 1;
        half2.maxHp = meteorite.maxHp - 1;
        half1.hp = meteorite.maxHp - 1;
        half2.hp = meteorite.maxHp - 1;

        // Set velocities for new meteorites
        const speed = (4 - half1.hp) * this.speedMultiplier;
        const velocity1 = p5.Vector.random2D().mult(speed);
        const velocity2 = p5.Vector.random2D().mult(speed);

        Body.setVelocity(half1.body, { x: velocity1.x, y: velocity1.y });
        Body.setVelocity(half2.body, { x: velocity2.x, y: velocity2.y });
    
        // Add bodies of new meteorites to the world
        World.add(this.world, [half1.body, half2.body]);
        
        // Add new meteorites to the array
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
    
    spawnMeteorites(n_meteorites, radius){
        for(let i = 0; i<n_meteorites; i++) this.addMeteorite(radius);
    }

}
