// CREATE A SCENE
var scene = new THREE.Scene();
// add a CAMERA to it so we can see something
var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(2, 1, 2); // position the camera away from the mesh
camera.lookAt(0, 0, 0); // look at 0,0,0
// we need a RENDERER to render the scene
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
var container = document.getElementById('demo') || document.body;
container.appendChild(renderer.domElement);
// add a Mesh to look at
var mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
scene.add(mesh);
// render the scene with the camera
renderer.render(scene, camera);
