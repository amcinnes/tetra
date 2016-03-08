function skybox_mesh() {
  var g = new THREE.Geometry();
  g.vertices = [
    new THREE.Vector3(500, 500, 500),
    new THREE.Vector3(500, 500, -500),
    new THREE.Vector3(500, -500, 500),
    new THREE.Vector3(500, -500, -500),
    new THREE.Vector3(-500, 500, 500),
    new THREE.Vector3(-500, 500, -500),
    new THREE.Vector3(-500, -500, 500),
    new THREE.Vector3(-500, -500, -500)
  ];
  g.faces = [
    new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 3), // Right
    new THREE.Face3(0, 4, 1), new THREE.Face3(1, 4, 5), // Up
    new THREE.Face3(1, 5, 3), new THREE.Face3(3, 5, 7), // Front
    new THREE.Face3(2, 3, 6), new THREE.Face3(6, 3, 7), // Down
    new THREE.Face3(0, 2, 4), new THREE.Face3(4, 2, 6), // Back
    new THREE.Face3(4, 6, 5), new THREE.Face3(5, 6, 7)  // Left
  ];
  g.faceVertexUvs = [[
    [new THREE.Vector2(1, 2/3), new THREE.Vector2(3/4, 2/3), new THREE.Vector2(1, 1/3)],
    [new THREE.Vector2(1, 1/3), new THREE.Vector2(3/4, 2/3), new THREE.Vector2(3/4, 1/3)],
    [new THREE.Vector2(1/4, 1), new THREE.Vector2(1/4, 2/3), new THREE.Vector2(2/4, 1)],
    [new THREE.Vector2(2/4, 1), new THREE.Vector2(1/4, 2/3), new THREE.Vector2(2/4, 2/3)],
    [new THREE.Vector2(3/4, 2/3), new THREE.Vector2(2/4, 2/3), new THREE.Vector2(3/4, 1/3)],
    [new THREE.Vector2(3/4, 1/3), new THREE.Vector2(2/4, 2/3), new THREE.Vector2(2/4, 1/3)],
    [new THREE.Vector2(1/4, 0), new THREE.Vector2(2/4, 0), new THREE.Vector2(1/4, 1/3)],
    [new THREE.Vector2(1/4, 1/3), new THREE.Vector2(2/4, 0), new THREE.Vector2(2/4, 1/3)],
    [new THREE.Vector2(0, 2/3), new THREE.Vector2(0, 1/3), new THREE.Vector2(1/4, 2/3)],
    [new THREE.Vector2(1/4, 2/3), new THREE.Vector2(0, 1/3), new THREE.Vector2(1/4, 1/3)],
    [new THREE.Vector2(1/4, 2/3), new THREE.Vector2(1/4, 1/3), new THREE.Vector2(2/4, 2/3)],
    [new THREE.Vector2(2/4, 2/3), new THREE.Vector2(1/4, 1/3), new THREE.Vector2(2/4, 1/3)]
  ]];
  var t = THREE.ImageUtils.loadTexture("skybox.png");
  var m = new THREE.MeshBasicMaterial({map: t});
  return new THREE.Mesh(g, m);
}

var tetra_geometry = (function() {
  var g = new THREE.Geometry();
  g.vertices = [
    new THREE.Vector3(2/3, 2/3, 2/3),
    new THREE.Vector3(1, 1/3, 1/3),
    new THREE.Vector3(1/3, 1, 1/3),
    new THREE.Vector3(1/3, 1/3, 1),

    new THREE.Vector3(2/3, -2/3, -2/3),
    new THREE.Vector3(1, -1/3, -1/3),
    new THREE.Vector3(1/3, -1, -1/3),
    new THREE.Vector3(1/3, -1/3, -1),

    new THREE.Vector3(-2/3, -2/3, 2/3),
    new THREE.Vector3(-1, -1/3, 1/3),
    new THREE.Vector3(-1/3, -1, 1/3),
    new THREE.Vector3(-1/3, -1/3, 1),

    new THREE.Vector3(-2/3, 2/3, -2/3),
    new THREE.Vector3(-1, 1/3, -1/3),
    new THREE.Vector3(-1/3, 1, -1/3),
    new THREE.Vector3(-1/3, 1/3, -1)
  ];
  g.faces = [
    new THREE.Face3(0, 1, 2),
    new THREE.Face3(1, 0, 3),
    new THREE.Face3(0, 2, 3),

    new THREE.Face3(4, 5, 6),
    new THREE.Face3(5, 4, 7),
    new THREE.Face3(4, 6, 7),

    new THREE.Face3(8, 9, 10),
    new THREE.Face3(9, 8, 11),
    new THREE.Face3(8, 10, 11),

    new THREE.Face3(12, 13, 14),
    new THREE.Face3(13, 12, 15),
    new THREE.Face3(12, 14, 15),

    new THREE.Face3(3, 5, 1),
    new THREE.Face3(3, 6, 5),
    new THREE.Face3(3, 10, 6),
    new THREE.Face3(3, 11, 10),

    new THREE.Face3(2, 1, 5),
    new THREE.Face3(2, 5, 7),
    new THREE.Face3(2, 7, 15),
    new THREE.Face3(2, 15, 14),

    new THREE.Face3(2, 11, 3),
    new THREE.Face3(2, 9, 11),
    new THREE.Face3(2, 13, 9),
    new THREE.Face3(2, 14, 13),

    new THREE.Face3(6, 10, 9),
    new THREE.Face3(6, 9, 13),
    new THREE.Face3(6, 13, 15),
    new THREE.Face3(6, 15, 7)
  ];
  g.computeFaceNormals();
  return g;
})();

function object_mesh(c) {
  var m = new THREE.MeshPhongMaterial({color: c});
  return new THREE.Mesh(tetra_geometry, m);
}

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
var skybox = skybox_mesh()
scene.add(skybox);

for (var y = -5; y < 1; y++) {
  for (var x = -10; x < 10; x++) {
    for (var z = -10; z < 10; z++) {
      var m = object_mesh(0x999999);
      m.position.x = 4/3 * x - 4/3 * z;
      m.position.z = 4/3 * x + 4/3 * z;
      m.position.y = 2/3 * y;
      if ((y & 1) == 1) {
        m.position.x += 4/3;
        m.rotation.y = Math.PI / 2;
      }
      scene.add(m);
    }
  }
}

var light = new THREE.DirectionalLight(0xffffff, 0.8);
light.position.set(-0.1, 1, 0.1);
scene.add(light);
scene.add(new THREE.AmbientLight(0x111111));

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.rotation.order = 'YXZ';
camera.position.y = 2.1;
camera.position.z = 5;

var nextUpdate = null;
var keysDown = {};

$(document).keydown(function(e) {
    keysDown[e.which] = true;
});

$(document).keyup(function(e) {
  delete keysDown[e.which];
});

$(window).resize(function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

function update() {
  if (keysDown[38]) camera.rotation.x += 0.01; // Up
  if (keysDown[40]) camera.rotation.x -= 0.01; // Down
  if (keysDown[37]) camera.rotation.y += 0.01; // Left
  if (keysDown[39]) camera.rotation.y -= 0.01; // Right
  while (camera.rotation.y < 0) camera.rotation.y += 2 * Math.PI;
  while (camera.rotation.y >= 2 * Math.PI) camera.rotation.y -= 2 * Math.PI;
  if (camera.rotation.x > Math.PI / 2) camera.rotation.x = Math.PI / 2;
  if (camera.rotation.x < -Math.PI / 2) camera.rotation.x = -Math.PI / 2;

  if (keysDown[87]) { // W
    camera.position.x -= 0.1 * Math.sin(camera.rotation.y);
    camera.position.z -= 0.1 * Math.cos(camera.rotation.y);
  }
  if (keysDown[83]) { // S
    camera.position.x += 0.1 * Math.sin(camera.rotation.y);
    camera.position.z += 0.1 * Math.cos(camera.rotation.y);
  }
  if (keysDown[65]) { // A
    camera.position.x -= 0.1 * Math.cos(camera.rotation.y);
    camera.position.z += 0.1 * Math.sin(camera.rotation.y);
  }
  if (keysDown[68]) { // D
    camera.position.x += 0.1 * Math.cos(camera.rotation.y);
    camera.position.z -= 0.1 * Math.sin(camera.rotation.y);
  }

  skybox.position.x = camera.position.x;
  skybox.position.y = camera.position.y;
  skybox.position.z = camera.position.z;
}

function render() {
  var t = Date.now();
  if (nextUpdate === null || nextUpdate < t - 1000) {
    nextUpdate = t;
  }

  while (nextUpdate <= t) {
    update();
    nextUpdate += 10;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
