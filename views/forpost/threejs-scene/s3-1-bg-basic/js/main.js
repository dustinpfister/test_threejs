// CREATE A SCENE
var scene = new THREE.Scene();
// background
scene.background = new THREE.Color(0xffffff);
var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(2, 1, 2); 
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
var container = document.getElementById('demo') || document.body;
container.appendChild(renderer.domElement);
var mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
scene.add(mesh);
renderer.render(scene, camera);
