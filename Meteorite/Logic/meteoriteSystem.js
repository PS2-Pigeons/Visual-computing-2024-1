import { Meteorite } from './meteorite.js';

export class MeteoriteSystem{

    constructor(world, meteoriteSpeedMultiplier = 0.5){
        this.SpeedMultiplier = meteoriteSpeedMultiplier;
        this.meteorites = [];
        this.world = world;
    }

    addMeteorite(){
        this.meteorites.push(new Meteorite(this.world,this));
    }

    // Function to split a meteorite into two
    splitMeteorite(meteorite) {
        // Create two new meteorites
        let half1 = new Meteorite(this.world, this,meteorite.radius / 2);
        let half2 = new Meteorite(this.world, this,meteorite.radius / 2);
        // Reduce life and adjust radius of new meteorites
        half1.maxLife = meteorite.maxLife - 1; // la vida aca es cero y le restan y queda menos 1 caraloco
        half2.maxLife = meteorite.maxLife - 1;
        half1.life = meteorite.maxLife - 1;
        half2.life = meteorite.maxLife - 1;
        
        // Calculate random movement for the new meteorites
        let offsetX = random(-meteorite.radius / 2, meteorite.radius / 2);
        let offsetY = random(-meteorite.radius / 2, meteorite.radius / 2);
        // Set positions of new meteorites relative to the center of the destroyed meteorite
        half1.pos.x = meteorite.pos.x + offsetX;
        half1.pos.y = meteorite.pos.y + offsetY;
        half2.pos.x = meteorite.pos.x - offsetX;
        half2.pos.y = meteorite.pos.y - offsetY;
        // Generate new velocities based on the meteorites life
        let speed = (4 - half1.life) * this.SpeedMultiplier;
        // Generate a random 2D velocity vector with magnitude based on the adjusted speed
        half1.velocity = p5.Vector.random2D().mult(speed);
        half2.velocity = p5.Vector.random2D().mult(speed);

        // Add new meteorites to the array
        this.meteorites.push(half1, half2);

        // Remove the destroyed meteorite from the array
        // let index = this.meteorites.indexOf(meteorite);
        // if (index !== -1) this.meteorites.splice(index, 1);
    }

    update() {
        for (let meteorite of this.meteorites) 
        {
            meteorite.update();
            if (meteorite.isDestroyed()){
                if (meteorite.maxLife > 1){
                    this.splitMeteorite(meteorite);
                }
                else{
                    // Eliminar pa siempre meteorito
                }
            }
        }
        this.meteorites = this.meteorites.filter(p => !p.isDestroyed());
    }

    render(){
        for (let meteorite of this.meteorites) meteorite.render();
    }
    
    spawnMeteorites(n_meteorites){
        for(let i = 0; i<n_meteorites; i++) this.addMeteorite();
    }

}
