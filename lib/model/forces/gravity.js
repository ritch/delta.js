var util = require('util')
  , Force = require('../force')
  , GRAV_CONSTANT = 6.674 * Math.pow(10, -11);
  
function Gravity(particle) {
  Force.apply(this, arguments);
}
module.exports = Gravity;
util.inherits(Gravity, Force);



Gravity.prototype.applyTo = function (p2) {
  var p1 = this.particle;
  var d = p1.distanceTo(p2);
  
  var m1 = p1.mass;
  var m2 = p2.mass;
  
  var x1 = p1.pos.x;
  var x2 = p2.pos.x;
  var y1 = p1.pos.y;
  var y2 = p2.pos.y;
  var z1 = p1.pos.z;
  var z2 = p2.pos.z;
  
  function calcVel(v1, p1, p2) {
    if(p2 - p1) {
      var r = (p2 - p1) / Math.abs(p2 - p1);
      var f = -GRAV_CONSTANT * ((m1 * m2) / Math.pow(d, 2)) * r;
    
      var v2p = f / m2;
      
      // if(Math.abs(v2p) > 1) {
      //   console.log('grav vel', v2p);
      //   return v1;
      // }
    
      return v1 + v2p;
    } else {
      return v1;
    }
  }
  
  // calculate gravity vectors for each dimension
  p2.delta.vel.x = calcVel(p2.vel.x, x1, x2);
  p2.delta.vel.y = calcVel(p2.vel.y, y1, y2);
  p2.delta.vel.z = calcVel(p2.vel.z, z1, z2);
}