import { ProjectileSystem } from './projectileSystem.js';
const {World, Bodies, Body, Vector, Composite} = Matter;

export class Ship {

    constructor(world, maxVel = 3, attackCooldown = 1000) {
        // Nave
        this.body = Bodies.circle(width / 2, height / 2, 10, {isSensor : true, label : "Ship", frictionAir: 0.01});
        World.add(world, this.body);
        this.body.owner = this;

        this.hp = 1;

        this.force = createVector(0, 0);
        this.impulse = false;
        this.maxVel = maxVel;

        //Proyectiles
        this.attackCooldown = attackCooldown;
        this.lastAttackTime = -attackCooldown;
        this.projectiles = new ProjectileSystem(world);
    }

    update() {
        // Movimiento
        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.setRotation(-5);
        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) this.setRotation(5);
        if (keyIsDown(UP_ARROW) || keyIsDown(87)) this.goForward();
        if (!keyIsDown(UP_ARROW) && !keyIsDown(87)) this.impulse = false;

        // Constraints en la pantalla
        const pos = this.body.position;
        if (pos.x > width - 30) Body.setPosition(this.body, { x: 3, y: pos.y });
        if (pos.x < 3) Body.setPosition(this.body, { x: width - 30, y: pos.y });
        if (pos.y > height - 5) Body.setPosition(this.body, { x: pos.x, y: 5 });
        if (pos.y < 5) Body.setPosition(this.body, { x: pos.x, y: height -5 });

        // Shooting
        if (keyIsDown( 32 /* spacebar */)) {
            if (millis() - this.lastAttackTime >= this.attackCooldown) {
                this.projectiles.addProjectile(this.body);
                this.lastAttackTime = millis();
            }
        }
        this.projectiles.update();
    }

    onCollision(body) {
        if (body.label == "Meteorite"){
            this.hp -=1;
        }
    }
    
    setRotation(delta) {
        let rotation = this.body.angle + delta;
        if (rotation > 360) rotation = 0;
        if (rotation < 0) rotation = 360;
        Body.setAngle(this.body, rotation);
    }
    
    goForward() {
        this.impulse = true; 
        // añadir fuerza segun rotacion actual de la nave
        Body.setVelocity(this.body, {x: this.body.velocity.x + cos(this.body.angle) / 10, y: this.body.velocity.y + sin(this.body.angle) / 10});
        // limitar velocidad 
        if (this.body.velocity.x > this.maxVel) Body.setVelocity(this.body, {x: this.maxVel, y: this.body.velocity.y});
        if (this.body.velocity.x < -this.maxVel) Body.setVelocity(this.body, {x: -this.maxVel, y: this.body.velocity.y});
        if (this.body.velocity.y > this.maxVel) Body.setVelocity(this.body, {x: this.body.velocity.x, y: this.maxVel});
        if (this.body.velocity.y < -this.maxVel) Body.setVelocity(this.body, {x: this.body.velocity.x, y: -this.maxVel});
    }

    render() {
        // Dibujar la nave
        push();
            stroke(255);
            noFill();
            translate(this.body.position.x, this.body.position.y);
            rotate(this.body.angle);
            // Cuerpo de la nave
            line(-5.5, -4.5, 6, 0);
            line(-5.5, 4.5, 6, 0);
            arc(-6, 0, 10, 10, 300, 410);
            // Fueguito de la nave al impulsarse
            if (this.impulse) {
                stroke("orange");
                line(-5, 0, -2, -1.5);
                line(-5, 0, -2, 1.5);
            }
        pop();

        // Renderizar proyectiles de la nave
        this.projectiles.render();
    }

    isAlive(){
        return this.hp > 0;
    }
}