//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CREATE A NEW BOX3
//-------- ----------
const v_min = new THREE.Vector3(0, 0, 0);
const x = 1 / 12 * 4;
const y = 1 / 12 * 2;
const z = 8;
const v_max = new THREE.Vector3(x, y, z);

const box3 = new THREE.Box3(v_min, v_max);
// THE GET SIZE METHOD OF BOX 3
// can be used to copy a size to a Vector3 instance
const v_size = new THREE.Vector3();
box3.getSize(v_size);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
// I CAN THEN USE THAT SIZE VECTOR TO DO
// SOMETHING LIKE SCALING A MESH OBJECT TO THE SIZE
// OF THE BOX
const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(mesh);
mesh.scale.copy(v_size);
// grid helper
scene.add(new THREE.GridHelper(10, 10));
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(mesh.position);
renderer.render(scene, camera);