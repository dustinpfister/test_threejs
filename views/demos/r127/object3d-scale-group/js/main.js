var size = 3,
scale = 1 / size,
halfScale = scale / 2;

var box = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshNormalMaterial());
box.position.set(0, 0, 0);

var group = new THREE.Group();

var copy1 = box.clone();
copy1.scale.set(scale, scale, scale);
copy1.position.set(2, 0, 0);

var grid = new THREE.GridHelper(5, 5);

// scene
var scene = new THREE.Scene();
scene.add(box);
scene.add(copy1);
scene.add(grid);

// camera and renderer
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
