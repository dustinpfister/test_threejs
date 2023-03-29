// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
const getAxisRadianFromQuaternion = (q) => {
    return 2 * Math.acos( q.w );
};
//-------  ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
scene.add(mesh1);
// ---------- ----------
// Getting axis angle from quaternion
// ---------- ----------
// creating a quaternion from Euler
const e1 = new THREE.Euler();
e1.y = THREE.MathUtils.degToRad(35);
e1.x = THREE.MathUtils.degToRad(0);
const q1 = new THREE.Quaternion().setFromEuler(e1);
mesh1.quaternion.copy(q1);
// getting axis angle in radians
const radian_axis = getAxisRadianFromQuaternion(q1);
console.log(THREE.MathUtils.radToDeg(radian_axis)); // 35
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
renderer.render(scene, camera);

