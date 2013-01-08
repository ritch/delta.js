function ParticleView(model, scene, universeScale) {
  var view = this;
  this.model = model;
  this.scene = scene;
  
  var sphere = this.mesh = new THREE.Mesh(new THREE.SphereGeometry(model.radius * universeScale, 50, 50), new THREE.MeshLambertMaterial({
    color: 0xffffff
  }));
  
  this.viewPosition = model.viewPosition = sphere.position;
  
  sphere.overdraw = true;
  
  // setInterval(function () {
  //   // view.updateHistory();
  // }, 1000);
}
module.exports = ParticleView;

ParticleView.prototype.render = function (dt) {
}

ParticleView.prototype.updateHistory = function () {
  var sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 50, 50), new THREE.MeshLambertMaterial({
    color: 0xffffff
  }));
  
  sphere.position.x = this.viewPosition.x;
  sphere.position.y = this.viewPosition.y;
  sphere.position.z = this.viewPosition.z;
  
  this.scene.add(sphere);
}