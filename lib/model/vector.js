function Vector(x, y, z) {
  if(x instanceof Vector) {
    var v = x;
    x = v.x;
    y = v.y;
    z = v.z;
  }
  
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}
module.exports = Vector;

Vector.prototype.add = function (vec) {
  return {
    x: this.x + vec.x,
    y: this.y + vec.y,
    z: this.z + vec.z
  };
}

Vector.prototype.mult = function (vec) {
  if(typeof vec === 'number') {
    vec = {x: vec, y: vec, z: vec};
  }
  
  return {
    x: this.x * vec.x,
    y: this.y * vec.y,
    z: this.z * vec.z
  };
}