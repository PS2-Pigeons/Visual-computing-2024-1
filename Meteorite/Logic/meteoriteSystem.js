import { Meteorite } from './meteorite.js';

export class MeteoriteSystem{

    constructor(meteoriteSpeedMultiplier = 0.5){
        this.SpeedMultiplier = meteoriteSpeedMultiplier;
        this.meteorites = [];
    }

    addMeteorite(){
        this.meteorites.push(new Meteorite(this));
    }

    addDestroyedMeteorite(meteorite){
        if (meteorite.life-1 > 0){
            let destroyed_meteorite = new Meteorite(this);
            destroyed_meteorite.life = meteorite.life-1;
            destroyed_meteorite.radius = meteorite.radius/2;
            destroyed_meteorite.pos.x = meteorite.pos.x;
            destroyed_meteorite.pos.y = meteorite.pos.y;
            destroyed_meteorite.velocity = meteorite.velocity * 1.5;
            this.meteorites.push(destroyed_meteorite);
        }
    }

    update(){
        for (let meteorite of this.meteorites){
            meteorite.update();
            
            if (meteorite.isDestroyed()){
                let datos = meteorite;
                for(let z=0; z<2; z++){
                    this.addDestroyedMeteorite(datos);
                }
                
            }
        }
        this.meteorites = this.meteorites.filter(p => !p.isDestroyed());
    }

    render(){
        for (let meteorite of this.meteorites) meteorite.render();
    }
    
    spawnMeteorites(n_meteorites){
        for(let i = 0; i<n_meteorites; i++){
            this.addMeteorite();
        }
    }
}
