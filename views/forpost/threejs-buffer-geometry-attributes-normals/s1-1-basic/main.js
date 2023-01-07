//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ---------- 
// GEOMETRY - starting with a cube
//-------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
//-------- ----------
// MESH
//-------- ---------- 
// use the geometry with a mesh
const mesh = new THREE.Mesh(geometry, 
    new THREE.MeshNormalMaterial()
);
//-------- ----------
// REF TO NORMAL AND POSITION ATTRIBUTES
//-------- ---------- 
// check out the normal attribute of a cube
const normal = geometry.getAttribute('normal');
const position = geometry.getAttribute('position');
// create and set up an arrow helper to find the direction of the first normal value
const dir = new THREE.Vector3(normal.array[0], normal.array[1], normal.array[2]),
origin = new THREE.Vector3(position.array[0], position.array[1], position.array[2]);
const helper = new THREE.ArrowHelper(dir, origin, 1, 0x00ff00);
helper.position.copy(origin);
scene.add(mesh);
scene.add(helper);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
