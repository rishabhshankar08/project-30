class Stone{
    constructor(x,y,r){
        var opt = {
            isStatic:false,
            restitution: 0.1,
            friction: 0.2,
            density: 0.5,
        }
        this.body = Bodies.circle(x, y, r, opt);
        
        World.add(world, this.body);
    }
    show() {
        let pos = this.body.position;
        push();
        rectMode(CENTER);
        noStroke();
        fill(148,127,146);
        rect(pos.x,pos.y, this.r);
        pop();
      }
}
