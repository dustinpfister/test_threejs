//******** **********
// SCENE, GRID HELPER, CAMERA, RENDERER
//******** **********
let scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) )
let camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 3, 0);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
//******** **********
// MESH
//******** **********
var geo = new THREE.CylinderGeometry(1, 1, 3, 10, 10);
var mesh = new THREE.Mesh(geo, new THREE.MeshNormalMaterial());
scene.add(mesh);
//******** **********
// RENDER
//******** **********
renderer.render(scene, camera);      
