function View(universe) {
  this.universe = universe;
  var scene = this.scene = new THREE.Scene();
  var camera = this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 50000);
  var renderer = this.renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 700;
}

View.prototype.render = function () {
  this.renderer.render(this.scene, this.camera);
}

module.exports = View;