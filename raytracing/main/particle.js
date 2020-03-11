class Particle{
  constructor(){
    this.pos = createVector(width/2, height/2);
    this.rays = [];
    this.heading = 0;
    for(let a = -60; a < 60; a += 1){
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  rotate(angle){
    this.heading += angle;
    for(let i = 0; i < this.rays.length; i += 1){
      this.rays[i].setAngle(radians(i) + this.heading);
    }
  }

  update(x, y){
    this.pos.set(x, y);
  }

  look(walls){
    const scene = [];
    for(let i = 0; i < this.rays.length; i ++){
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;
      for(let wall of walls){
        const pt = ray.cast(wall);
        if(pt){
          let d = p5.Vector.dist(this.pos, pt);
          const a = ray.dir.heading() - this.heading;
          if(!mouseIsPressed){
          d *= cos(a);
        }
          if(d < record){
            record = d;
            closest = pt;
          }
        }
      }
      if(closest){
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
      scene[i] = record;
    }
    return scene;
  }

  show(){
    fill(200, 50, 200);
    ellipse(this.pos.x, this.pos.y, 16);
    for(let ray of this.rays){
      ray.show();
    }
  }
}
