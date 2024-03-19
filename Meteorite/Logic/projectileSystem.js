const {World, Bodies, Body} = Matter;

import { Projectile } from './projectile.js';

export class ProjectileSystem{

    constructor(world, projectileLifeSpan = 100, projectileSpeedMultiplier = 5){
        this.world = world;
        this.projectiles = [];
        this.projectileLifeSpan = projectileLifeSpan; // Numero de frames
        this.speedMultiplier = projectileSpeedMultiplier;
    }

    addProjectile(origin){
        const originPos = origin.position;
        const originRot = origin.angle;
        const body = Bodies.circle(originPos.x, originPos.y, 2, {isSensor : true, label : "Projectile", frictionAir: 0, restitution: 0.9, });
        const velocity = createVector( cos(originRot) * this.speedMultiplier, sin(originRot) * this.speedMultiplier);
        Body.setVelocity(body, { x: velocity.x, y: velocity.y });
        World.add(this.world, body);
        this.projectiles.push(new Projectile(body, this.projectileLifeSpan));
    }

    update(){
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            projectile.update();
            if (projectile.isExpired()) {
                World.remove(this.world, projectile.body); // Remove from Matter.js world
                this.projectiles.splice(i, 1); // Remove from array
            }
        }
    }

    render(){
        for (let projectile of this.projectiles) projectile.render();
    }

}
