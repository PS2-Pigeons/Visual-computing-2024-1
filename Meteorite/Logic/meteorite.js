export class Meteorite{
    constructor(meteoriteSystem){
        this.destroybool = true;
        this.time = millis();
        this.life = 3;
        this.radius = 45;
        this.rotation = Math.floor(Math.random() * 360); // Random rotationthis.pos = createVector((width/2) + (Math.random() * (2 - 1) + 1) * cos(this.rotation),
        this.pos = createVector((width/4) + (Math.random() * (200 - 25) + 25) * cos(this.rotation),
        (height/4)+ (Math.random() * (200 - 25) + 25) * sin(this.rotation));
        this.velocity = createVector( cos(this.rotation) * meteoriteSystem.SpeedMultiplier,
                                      sin(this.rotation) * meteoriteSystem.SpeedMultiplier);
    }

    update(){
        
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        if (this.pos.x > width/2) this.pos.x = 0;
        if (this.pos.x < 0) this.pos.x = width/2;
        if (this.pos.y > height/2) this.pos.y = 0;
        if (this.pos.y < 0) this.pos.y = height/2;
    }

    render(){
        push();
            noFill();
            translate(this.pos.x,this.pos.y);
            stroke(255);
            ellipse(this.pos.x,this.pos.y, this.radius);
        pop();
    }

    isDestroyed(){
        if (millis()-this.time>1000 & this.destroybool){
            console.log("1 segundo pasó desde instancia")
            console.log(this)
            this.destroybool = false;
            return true;
        }
        else{
            return false;
        }
    }

}
