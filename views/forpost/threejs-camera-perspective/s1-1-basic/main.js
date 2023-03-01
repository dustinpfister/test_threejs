//-------- ---------
// SCENE, RENDERER
//-------- ---------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const renderer = new THREE.WebGL1Renderer();
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
renderer.setSize(640, 480, false);
//-------- ---------
// CAMERA
//-------- ---------
const fieldOfView = 50,
aspectRatio = 4 / 3,
near = 0.1,
far = 1000,
camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
//-------- ---------
// MESH
//-------- ---------
scene.add(new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial()));
//-------- ---------
// RENDER
//-------- ---------
camera.position.set(2, 2, 2); // position camera
camera.lookAt(0, 0, 0);       // have camera look at 0,0,0
renderer.render(scene, camera);