// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPER FUNCTIONS
// ---------- ----------
// update a quaternion by a given axis vector3 (normalized or not)
// and degree value
const setRotationByAxis = (q, v_axis, n_degree) => {
    const vector = v_axis.normalize();
    const radian = THREE.MathUtils.degToRad(n_degree);
    q.setFromAxisAngle(vector, radian);
};
const getAxisFromQuaternion = (q) => {
  let s = 1;
  if ( !(1 - q.w * q.w < Number.MIN_VALUE) ) {
    s = Math.sqrt(1 - q.w * q.w);
  }
  return new THREE.Vector3(q.x / s, q.y / s, q.z / s);
};
const getRadianFromQuaternion = (q) => {
    return 2 * Math.acos( q.w );
};
// create an object that will display the current state
// of a quaternion object
const quaternionHelper = (q, opt) => {

    const v_axis = getAxisFromQuaternion(q)
    opt = opt = {};
    const group = new THREE.Group();
    const gud = group.userData;
    gud.q = q;

    const arrow_axis = new THREE.ArrowHelper();
    arrow_axis.setDirection(v_axis);
    group.add(arrow_axis);

    const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0, 0.125, 1, 20)
    );
    mesh.rotation.setFromQuaternion(q);

    group.add(mesh);

    return group;
};
// ---------- ----------
// QUATERNION
// ---------- ----------
const q = new THREE.Quaternion();
// vector does not need to be normalized, and
// I can use degree values for the angle with this custom
// set rotation by axis method
const v_axis = new THREE.Vector3( 1, 1, 1);
const degree = 90.001
setRotationByAxis(q, v_axis, degree);

// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );

const helper = quaternionHelper(q);
scene.add(helper);

/*
const mesh1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0, 0.25, 1),
    new THREE.MeshNormalMaterial({transparent: true, opacity: 0.8}));
mesh1.geometry.rotateX(Math.PI * 0.5);
mesh1.lookAt(0, 0, 1);
scene.add(mesh1);
mesh1.rotation.setFromQuaternion(q);
*/
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
