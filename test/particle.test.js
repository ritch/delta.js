var assert = require('assert');
var Particle = require('../lib/model/particle');
var Force = require('../lib/model/force');

describe('Particle', function(){
  describe('.interact(particle)', function(){
    it('should not change another particle with a generic force', function() {
      var p1 = new Particle();
      var p2 = new Particle();
    
      p1.forces = p2.forces = [];
    
      p1.interact(p2);
    
      assert.deepEqual(p1.pos, p2.pos);
    });
  });
  
  describe('.distanceTo(particle)', function(){
    it('should return the distance in meters between the particles', function() {
      var p1 = new Particle(0, 0, 10);
      var p2 = new Particle(0, 0, 20);
      
      assert.equal(p1.distanceTo(p2), 10);
    });
  });
  
  describe('gravity', function(){
    it('should move two particles together', function() {
      var p1 = new Particle();
      var p2 = new Particle(0, 0, 500);
      
      p1.mass = 100;
      p2.mass = 100;
      
      p1.interact(p2);
      p2.interact(p1);
      
      // update the particles
      p1.update(10);
      p2.update(10);

      assert(p1.pos.z > 0, 'gravity should attract p1 towards p2');
      assert(p2.pos.z < 500, 'gravity should attract p2 towards p1');
    });
  });
  
  describe('repulsion', function(){
    it('should bounce two particles away from each other', function() {
      var p1 = new Particle();
      var p2 = new Particle(0, 0, 200);
      
      p1.radius = 100;
      p2.radius = 100;
      
      p1.mass = 100;
      p2.mass = 100;
      
      p1.vel.z = 10;
      p2.vel.z = -10;
      
      p1.interact(p2);
      p2.interact(p1);
      
      // update the particles
      p1.update(1);
      p2.update(1);
      
      assert.equal(p2.vel.z, 10, 'p2 should swap z velocity');
      assert.equal(p1.vel.z, -10, 'p1 should swap z velocity');
    });
    
    it('should prevent particles from intersecting', function() {
      var p1 = new Particle();
      var p2 = new Particle(0, 0, 21);
      
      p1.radius = 10;
      p2.radius = 10;
      
      p1.mass = 10;
      p2.mass = 10;
      
      p1.vel.z = 5;
      
      p1.interact(p2);
      p2.interact(p1);
      p1.update(1);
      p2.update(1);
      
      var distance = p1.distanceBetweenSurfaces(p2);
      
      console.log(distance);
      
      assert(distance >= 0, 'distance should never be negative');
    });
  });
});