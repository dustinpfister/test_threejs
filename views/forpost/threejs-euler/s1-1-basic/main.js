//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// EULER
//-------- ----------
// AN INSTANCE OF THREE.Euler
var euler = new THREE.Euler(Math.PI / 180 * 45, 0, 0)
// a Mesh
var meshA = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
// cloning this mesh
var box1 = meshA.clone(),
box2 = meshA.clone(),
box3 = meshA.clone();
// USING THE INSTANCE OF EULER TO SET THE STATE
// OF THE EULER INSTANCES OF THESE MESH CLONES
box2.rotation.copy(euler);
box3.rotation.copy(euler);
// adjusting positions
box2.position.set(-1,0,0);
box3.position.set(1,0,0);
// add the box mesh to the scene
scene.add(box1);
scene.add(box2);
scene.add(box3);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
