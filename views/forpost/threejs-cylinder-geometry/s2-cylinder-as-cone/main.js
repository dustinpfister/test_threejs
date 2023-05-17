//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//---------- ----------
// OBJECTS
//---------- ----------
// some values for a cone
const rTop = 0,
rBottom = 1,
length = 3;
// making a cone with CylinderGeometry
const geo1 = new THREE.CylinderGeometry(rTop, rBottom, length, 20, 20);
const mesh1 = new THREE.Mesh(geo1, new THREE.MeshNormalMaterial());
scene.add(mesh1);
// making a cone with ConeGeometry
const geo2 = new THREE.ConeGeometry(rBottom, length, 20, 20);
const mesh2 = new THREE.Mesh(geo2, new THREE.MeshNormalMaterial());
mesh2.position.set(0, 0, 3);
scene.add(mesh2);
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) );
//---------- ----------
// RENDER
//---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
