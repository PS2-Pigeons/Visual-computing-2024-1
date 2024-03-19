const {Body} = Matter;

export class Meteorite{
    constructor(body){
        this.body = body;
        this.body.owner = this;
        this.maxHp = 3;
        this.hp = this.hp;
    }

    update(){
        const pos = this.body.position;
        if (pos.x > width) Body.setPosition(this.body, { x: 0, y: pos.y });
        if (pos.x < 0) Body.setPosition(this.body, { x: width, y: pos.y });
        if (pos.y > height) Body.setPosition(this.body, { x: pos.x, y: 0 });
        if (pos.y < 0) Body.setPosition(this.body, { x: pos.x, y: height });
    }

    render(){
        push();
            noFill();
            stroke(255);
            translate(this.body.position.x, this.body.position.y);
            rotate(this.body.angle);
            ellipse(0,0, this.body.circleRadius * 2);
        pop();
    }

    onCollision(body) {
        return
    }

    loseHp(){
        this.hp -= 1;
    }

    isDestroyed(){
        return this.hp == 0;
    }

}
