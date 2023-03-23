// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// Helpers
// ---------- ----------
const setRotationByAxis = (q, v_axis, n_degree) => {
    const vector = v_axis.normalize();
    const angle = THREE.MathUtils.degToRad(n_degree);
    const halfAngle = angle / 2, s = Math.sin( halfAngle );
    q.x = vector.x * s;
    q.y = vector.y * s;
    q.z = vector.z * s;
    q.w = Math.cos( halfAngle );
};
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = new THREE.Mesh( new THREE.CylinderGeometry(0, 0.25, 1), new THREE.MeshNormalMaterial());
mesh1.geometry.rotateX(Math.PI * 0.5);
//mesh1.lookAt(0, 0, 1);
scene.add(mesh1);
// ---------- ----------
// SETTING ROTATION WITH QUATERNION
// ---------- ----------
const q = new THREE.Quaternion();
// vector does not need to be normalized, and
// I can use degree values for the angle with this custom
// set rotation by axis method
const v_axis = new THREE.Vector3( 0, 10, 0);
const degree = 45;
setRotationByAxis(q, v_axis, degree);
mesh1.rotation.setFromQuaternion(q);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
