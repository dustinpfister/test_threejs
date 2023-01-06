//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(5, 5));
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH 
//-------- ----------
var box2 = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
// using object3d rotation and position properties
box2.rotation.y = Math.PI / 180 * 45;
box2.position.set(-2, 0, 0);
// box helper
scene.add(new THREE.BoxHelper(box2, new THREE.Color('red'))); 
scene.add(box2);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);