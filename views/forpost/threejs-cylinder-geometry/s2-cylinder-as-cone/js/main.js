//******** **********
// SCENE, GRID HELPER, CAMERA, RENDERER
//******** **********
let scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
let camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// MESH
//******** **********

// some values for a cone
var rTop = 0,
rBottom = 1,
length = 3;

// making a cone with CylinderGeometry
var geo1 = new THREE.CylinderGeometry(rTop, rBottom, length, 20, 20);
var mesh1 = new THREE.Mesh(geo1, new THREE.MeshNormalMaterial());
scene.add(mesh1);

// making a cone with ConeGeometry
var geo2 = new THREE.ConeGeometry(rBottom, length, 20, 20);
var mesh2 = new THREE.Mesh(geo2, new THREE.MeshNormalMaterial());
mesh2.position.set(0, 0, 3);
scene.add(mesh2);

//******** **********
// RENDER
//******** **********
renderer.render(scene, camera);      
