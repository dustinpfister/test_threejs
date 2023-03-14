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
const cube3 = cube1.clone();
scene.add(cube1);
scene.add(cube2);
scene.add(cube3);
//-------- ----------
// SETTING POSITION WITH Vector3.copy, normalize, and Vector3.multiplyScalar
//-------- ----------
const radian = THREE.MathUtils.degToRad(90 + 45);
const radius = 4;
const vec = new THREE.Vector3(
    Math.cos(radian) * radius,
    0,
    Math.sin(radian) * radius
);
cube1.position.copy(vec);
const scalar = 1 + Math.round( 2 * Math.random() )
cube2.position.copy(vec).normalize().multiplyScalar(scalar);
// adjust rotation of cubes
cube1.lookAt(0, 0, 0);
cube2.lookAt(0, 0, 0);
cube3.lookAt(cube1.position);
//-------- ----------
// render static scene
//-------- ----------
camera.position.set(7, 7, 7);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
