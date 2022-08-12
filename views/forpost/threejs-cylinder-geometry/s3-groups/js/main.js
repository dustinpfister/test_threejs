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
// LIGHT
//******** **********
var dl = new THREE.DirectionalLight(0xffffff, 1.0);
dl.position.set(3, 4, 1);
scene.add(dl);

//******** **********
// MESH
//******** **********

var materials = [
    new THREE.MeshStandardMaterial({ color: 0xff0000}),
    new THREE.MeshStandardMaterial({ color: 0x00ff00}),
    new THREE.MeshStandardMaterial({ color: 0x00ffff})
];

var mesh1 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 4, 20, 20), materials);
scene.add(mesh1);

var mesh2 = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 4, 20, 20), materials);
mesh2.position.set(0, 0, 1);
mesh2.rotation.z = Math.PI * 0.6;
scene.add(mesh2);

//******** **********
// RENDER
//******** **********
renderer.render(scene, camera);      
