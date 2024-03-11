import { Projectile } from './projectile.js';

export class ProjectileSystem{

    constructor(projectileLifeSpan = 100, projectileSpeedMultiplier = 5){
        this.lifeSpan = projectileLifeSpan; // Numero de frames
        this.SpeedMultiplier = projectileSpeedMultiplier;
        this.projectiles = [];
    }

    addProjectile(ship){
        this.projectiles.push(new Projectile(ship, this));
    }

    update(){
        for (let projectile of this.projectiles) projectile.update();
        this.projectiles = this.projectiles.filter(p => !p.isExpired());
    }

    render(){
        for (let projectile of this.projectiles) projectile.render();
    }

}
