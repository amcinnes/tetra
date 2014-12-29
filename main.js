function skybox_mesh() {
  var g = new THREE.Geometry();
  g.vertices = [
    new THREE.Vector3(100, 100, 100),
    new THREE.Vector3(100, 100, -100),
    new THREE.Vector3(100, -100, 100),
    new THREE.Vector3(100, -100, -100),
    new THREE.Vector3(-100, 100, 100),
    new THREE.Vector3(-100, 100, -100),
    new THREE.Vector3(-100, -100, 100),
    new THREE.Vector3(-100, -100, -100)
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

function object_mesh() {
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
  var m = new THREE.MeshPhongMaterial({color: 0x00ff00});
  return new THREE.Mesh(g, m);
}

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
scene.add(skybox_mesh());
scene.add(object_mesh());
var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(0, 0, 1);
scene.add(light);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.rotation.order = 'YXZ';
camera.position.z = 5;

var nextUpdate = null;
var keysDown = {};

$(document).keydown(function(e) {
    keysDown[e.which] = true;
});

$(document).keyup(function(e) {
  delete keysDown[e.which];
});

function update() {
  if (keysDown[38]) camera.rotation.x += 0.01;
  if (keysDown[40]) camera.rotation.x -= 0.01;
  if (keysDown[37]) camera.rotation.y += 0.01;
  if (keysDown[39]) camera.rotation.y -= 0.01;
  while (camera.rotation.y < 0) camera.rotation.y += 2 * Math.PI;
  while (camera.rotation.y >= 2 * Math.PI) camera.rotation.y -= 2 * Math.PI;
  if (camera.rotation.x > Math.PI / 2) camera.rotation.x = Math.PI / 2;
  if (camera.rotation.x < -Math.PI / 2) camera.rotation.x = -Math.PI / 2;
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
