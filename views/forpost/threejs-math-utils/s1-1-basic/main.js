//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
scene.add(camera);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10));
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
// SETTING POSITION OF THE MESH OBJECT
const radian = THREE.MathUtils.degToRad(20);
const x = Math.cos(radian) * 5;
const z = Math.sin(radian) * 5;
mesh.position.set(x, 0, z);
//-------- ----------
// render static scene
//-------- ----------
camera.position.set(8, 8, 8);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);
