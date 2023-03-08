//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
//OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(5, 5));
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// Using Vector3 clamp
//-------- ----------
mesh.position.set(0, 0, -5);
mesh.position.clamp(
    new THREE.Vector3(-2, 0, -2),
    new THREE.Vector3(2, 0, 2));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

