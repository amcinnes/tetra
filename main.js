var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var skybox_geometry = new THREE.Geometry();
skybox_geometry.vertices = [
  new THREE.Vector3(100, 100, 100),
  new THREE.Vector3(100, 100, -100),
  new THREE.Vector3(100, -100, 100),
  new THREE.Vector3(100, -100, -100),
  new THREE.Vector3(-100, 100, 100),
  new THREE.Vector3(-100, 100, -100),
  new THREE.Vector3(-100, -100, 100),
  new THREE.Vector3(-100, -100, -100)
];
skybox_geometry.faces = [
  new THREE.Face3(0, 1, 2),
  new THREE.Face3(2, 1, 3),

  new THREE.Face3(0, 4, 1),
  new THREE.Face3(1, 4, 5),

  new THREE.Face3(1, 5, 3),
  new THREE.Face3(3, 5, 7),

  new THREE.Face3(2, 3, 6),
  new THREE.Face3(6, 3, 7),

  new THREE.Face3(0, 2, 4),
  new THREE.Face3(4, 2, 6),

  new THREE.Face3(4, 6, 5),
  new THREE.Face3(5, 6, 7)
];
skybox_geometry.faceVertexUvs = [[
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

var skybox_texture = THREE.ImageUtils.loadTexture("skybox.png");
var skybox_material = new THREE.MeshBasicMaterial({
  //color: 0x00ff00,
  map: skybox_texture
});
var skybox_mesh = new THREE.Mesh(skybox_geometry, skybox_material);
scene.add(skybox_mesh);

var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(0, 0, 1);
scene.add(light);
var geometry = new THREE.Geometry();
geometry.vertices.push(
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
);
geometry.faces.push(
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
);
geometry.computeFaceNormals();
var material = new THREE.MeshPhongMaterial({
  color: 0x00ff00
});
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
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
}

function render(timestamp) {
  if (nextUpdate == null) {
    nextUpdate = timestamp;
  }

  while (nextUpdate <= timestamp) {
    update();
    nextUpdate += 10;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
