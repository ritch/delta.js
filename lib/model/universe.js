var Particle = require('./particle');

function Universe(x, y, z, options) {
  this.particles = [];
}
module.exports = Universe;

Universe.prototype.tick = function (dt, universeScale) {
  this.particles.forEach(function (p1) {
    this.particles.forEach(function (p2) {
      if(p1 !== p2) {
        p1.interact(p2);
      }
    });
  }.bind(this));
  
  // all calculations complete
  this.particles.forEach(function (p) {
    p.update(dt);
    
    p.viewPosition.x = p.pos.x * universeScale;
    p.viewPosition.y = p.pos.y * universeScale;
    p.viewPosition.z = p.pos.z * universeScale;
  }.bind(this));
}

Universe.prototype.createParticle = function (x, y, z) {
  var p = new Particle(x, y, z);
  
  this.particles.push(p);
  
  return p;
}
