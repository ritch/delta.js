function Point(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}
module.exports = Point;

Point.prototype.distanceTo = function (pos) {
  var x1 = this.x;
  var x2 = pos.x;
  var y1 = this.y;
  var y2 = pos.y;
  var z1 = this.z;
  var z2 = pos.z;
  
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1-z2, 2)); 
}