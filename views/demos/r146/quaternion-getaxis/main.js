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
// ---------- ----------
// QUATERNION
// ---------- ----------
const q = new THREE.Quaternion();
const v_axis = new THREE.Vector3( 1, 1, 0 ).normalize();
const deg = 65;
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
const arrow1 = new THREE.ArrowHelper();
arrow1.position.y = 0.01;
arrow1.setDirection(v_axis);
scene.add(arrow1);
scene.add(new THREE.GridHelper(10, 10));
const arrow2 = new THREE.ArrowHelper();
arrow2.position.set(1, 0.01, 0)
arrow2.setDirection(v_axis2);
scene.add(arrow2);

// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(1, 1, 3);
camera.lookAt(0.5,0,0);
renderer.render(scene, camera);

