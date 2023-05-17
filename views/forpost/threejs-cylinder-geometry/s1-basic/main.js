//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
const geometry = new THREE.CylinderGeometry(1, 1, 3, 10, 10);
const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
scene.add(mesh);
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
