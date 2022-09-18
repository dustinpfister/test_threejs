//-------- ----------
// SCENE OBJECT
//-------- ----------
const scene = new THREE.Scene();
//-------- ----------
// CAMERA, and RENDERER TO USE WITH THE SCENE OBJECT
//-------- ----------
const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(2, 1, 2); // position the camera away from the mesh
camera.lookAt(0, 0, 0); // look at 0,0,0
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// ADD A MESH OBJECT TO THE SCENE OBJECT
//-------- ----------
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// RENDER THE SCENE OBJECT 
//-------- ----------
renderer.render(scene, camera);
