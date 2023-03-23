// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// helper functions
// ---------- ----------
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
// get a vector to use to make an arrow for an angle
const getAngleVector = (deg) => {
    const v = new THREE.Vector3();
    const e = new THREE.Euler();
    e.y = THREE.MathUtils.degToRad(deg);
    return v.set(1,0,0).applyEuler(e);
};
// create an arrow and set the direction to the given vector3
const createArrow = (v3, x) => {
    const arrow = new THREE.ArrowHelper();
    arrow.position.set(x, 0.01, 0);
    arrow.setDirection(v3);
    return arrow;
};
// ---------- ----------
// QUATERNION
// ---------- ----------
const q = new THREE.Quaternion();
const v_axis = new THREE.Vector3( -1, 1, 0 ).normalize();
const deg = 360 - 0.001;
q.setFromAxisAngle( v_axis, Math.PI / 180 * deg );
// ---------- ----------
// GET AXIS AND ANGLE FROM QUATERNION
// ---------- ----------
const v_axis2 = getAxisFromQuaternion(q);
const deg2 = THREE.MathUtils.radToDeg( getRadianFromQuaternion(q)  );
console.log( v_axis, deg);
console.log( v_axis2, deg2 );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add(new THREE.GridHelper(10, 10));
scene.add( createArrow(v_axis, 0) );
scene.add( createArrow(v_axis2, 1) );
scene.add( createArrow(getAngleVector(deg), 0) );
scene.add( createArrow(getAngleVector(deg2), 1) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(1, 1, 3);
camera.lookAt(0.5,0,0);
renderer.render(scene, camera);

