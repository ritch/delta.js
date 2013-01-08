var Universe = require('./model/universe')
  , Point = require('./model/point')
  , Particle = require('./model/particle')
  , View = require('./view/view')
  , ParticleView = require('./view/particle');

function Simulation(timeScale, universeScale) {
  var sim = this;
  this.views = [];
  timeScale = timeScale || 100;
  this.timeScale = timeScale;
  this.universeScale = universeScale || 0.0001;
  var universe = this.universe = new Universe();
  var renderer = this.renderer = new View(this.universe);
  
  var lastFrame = +new Date;
  
  function loop(now) {
    requestAnimationFrame(loop);
    
    var dt = now - lastFrame;
    
    universe.tick(dt * sim.timeScale, universeScale);
    sim.tick(dt);
    
    if ( dt < 160 ) {
      renderer.render();
    }
    
    lastFrame = now;
  }
  
  loop(lastFrame);
}
module.exports = Simulation;

Simulation.prototype.createParticle = function (radius) {
  var p = new Particle();
  p.radius = radius;
  
  var v = new ParticleView(p, this.renderer.scene, this.universeScale);
  
  
  this.universe.particles.push(p);
  this.addView(v);
  
  return p;
}

Simulation.prototype.addView = function (view) {
  this.renderer.scene.add(view.mesh);
  this.renderer.scene.add(view.historyLine);
  this.views.push(view);
}

Simulation.prototype.tick = function (dt) {
  for(var i = 0; i < this.views.length; i++) {
    this.views[i].render(dt);
  }
}


