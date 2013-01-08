var util = require('util')
  , Force = require('../force');

function Repulsion(particle) {
  Force.apply(this, arguments);
}
module.exports = Repulsion;
util.inherits(Repulsion, Force);

Repulsion.prototype.applyTo = function (p2) {
  var p1 = this.particle;
  var d = p1.distanceBetweenSurfaces(p2);
  var min = 0; // TODO ~ should account for next tick
  
  var predictedDistance = this.calculatePredictedDistance(p1, p2);
  
  if(d <= min || predictedDistance <= min) {
    var m1 = p1.mass;
    var m2 = p2.mass;
    
    function calcVel(v1, v2) {
      var v2p = v2 * (m2 - m1) + (2 * m1 * v1);
      v2p = v2p / (m1 + m2);
      
      return v2p;
    }
  
    var x = calcVel(p1.vel.x, p2.vel.x);
    var y = calcVel(p1.vel.y, p2.vel.y);
    var z = calcVel(p1.vel.z, p2.vel.z);
    
    p2.delta.vel.x = x;
    p2.delta.vel.y = y;
    p2.delta.vel.z = z;
  }
}

Repulsion.prototype.calculatePredictedDistance = function (p1, p2) {
  var predPos1 = p1.predictedPostion();
  var predPos2 = p2.predictedPostion();
  
  return predPos1.distanceTo(predPos2) - p1.radius - p2.radius;
}