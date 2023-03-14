//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(9, 9));
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECTS
//-------- ----------
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
const cube2 = cube1.clone();
scene.add(cube1);
scene.add(cube2); 
// SETTING POSITION WITH Vector3.set and Vector3.multiplyScalar
cube1.position.set(-1, 0, -1).multiplyScalar(4);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
