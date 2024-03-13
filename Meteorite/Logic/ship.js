import { ProjectileSystem } from './projectileSystem.js';
const {World, Bodies, Body, Vector, Composite} = Matter;

export class Ship {

    constructor(world, attackCooldown = 1000) {
        this.rotation = 0;
        this.velocity = createVector(0, 0);
        this.force = createVector(0, 0);
        this.pos = createVector(width / 2, height / 2);
        this.impulse = false;
        this.maxVel = 3;
        this.attackCooldown = attackCooldown;
        this.lastAttackTime = -attackCooldown;
        this.projectiles = new ProjectileSystem();
        this.collider = Bodies.circle(this.pos.x, this.pos.y, 10, {isSensor : true, label : "Ship"});
        this.world = world;
        World.add(this.world, this.collider);
    }

    update() {
        if (this.hasBody()){
            if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.setRotation(-5);
            if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) this.setRotation(5);
            if (keyIsDown(UP_ARROW) || keyIsDown(87)) this.goForward();
            if (!keyIsDown(UP_ARROW) && !keyIsDown(87)) this.impulse = false;

            if (keyIsDown(32) /* spacebar */) {
                if (millis() - this.lastAttackTime >= this.attackCooldown) {
                    this.projectiles.addProjectile(this);
                    this.lastAttackTime = millis();
                }
            }

            this.pos.x += this.velocity.x;
            this.pos.y += this.velocity.y;
            // Loop en el borde de la pantalla
            // A veces se perdia entre bordes, pequeño tweak a los limites
            if (this.pos.x > width - 30) this.pos.x = 3;
            if (this.pos.x < 3) this.pos.x = width -30;
            if (this.pos.y > height -5) this.pos.y = 5;
            if (this.pos.y < 5) this.pos.y = height -5;

            // Actualizar posicion de mi colision
            Body.setPosition(this.collider,new Vector.create(this.pos.x, this.pos.y));
        }   
        this.projectiles.update();
    }
    
    setRotation(rot) {
        this.rotation += rot;
        if (this.rotation > 360) this.rotation = 0;
        if (this.rotation < 0) this.rotation = 360;
    }
    
    goForward() {
        // añadir fuerza segun rotacion actual de la nave
        this.force.x = cos(this.rotation) / 10;
        this.force.y = sin(this.rotation) / 10;
        this.velocity.x += this.force.x;
        this.velocity.y += this.force.y;
        this.impulse = true;
        // limitar impulso o velocidad
        if (this.velocity.x > this.maxVel) this.velocity.x = this.maxVel;
        if (this.velocity.x < -this.maxVel) this.velocity.x = -this.maxVel;
        if (this.velocity.y > this.maxVel) this.velocity.y = this.maxVel;
        if (this.velocity.y < -this.maxVel) this.velocity.y = -this.maxVel;
    }

    hasBody(){ 
        return Composite.get(this.world, this.collider.id, this.collider.type) != null;
    }

    render() {
        if (this.hasBody()){
        // Dibujar la nave
        push();
            stroke(255);
            noFill();
            translate(this.collider.position.x, this.collider.position.y);
            rotate(this.rotation);
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
        // Renderizar proyectiles de la nave
        pop();
        }
        this.projectiles.render();
    }
}