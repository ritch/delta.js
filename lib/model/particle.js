var Point = require('./point')
  , Gravity = require('./forces/gravity')
  , Vector = require('./vector')
  , Repulsion = require('./forces/repulsion');

function Particle(x, y, z) {
  this.pos = new Point(x, y, z);
  this.forces = [new Gravity(this), new Repulsion(this)];
  this.mass = 10; // Kilograms
  this.vel = new Vector(); // m/s
  this.delta = {};
  this.delta.vel = new Vector();
  this.delta.time = 1;
}
module.exports = Particle;

Particle.prototype.update = function (dt) {
  // calc position
  this.pos.x += this.delta.vel.x * dt;
  this.pos.y += this.delta.vel.y * dt;
  this.pos.z += this.delta.vel.z * dt;
  
  // reset
  this.vel = this.delta.vel;
  this.delta.vel = {
    x: this.vel.x,
    y: this.vel.y,
    z: this.vel.z
  };
  this.delta.time = dt;
}

Particle.prototype.interact = function (particle) {
  this.forces.forEach(function (f) {
    f.applyTo(particle);
  });
}

Particle.prototype.predictedPostion = function () {
  var dt = this.delta.time;
  var x = this.pos.x + this.vel.x * dt;
  var y = this.pos.y + this.vel.y * dt;
  var z = this.pos.z + this.vel.z * dt;
  
  return new Point(x, y, z);
}

Particle.prototype.distanceTo = function (particle) {
  return this.pos.distanceTo(particle.pos);
}

Particle.prototype.distanceBetweenSurfaces = function (particle) {
  return this.pos.distanceTo(particle.pos) - this.radius - particle.radius;
}

Particle.prototype.momentum = function () {
  return this.vel.mult(this.mass);
}