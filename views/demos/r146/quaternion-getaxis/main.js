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
const getAxisAndAngelFromQuaternion = (q) => {
  const radian = 2 * Math.acos( q.w );
  let s = 1;
  if ( !(1 - q.w * q.w < Number.MIN_VALUE) ) {
    s = Math.sqrt(1 - q.w * q.w);
  }
  return { axis: new THREE.Vector3(q.x / s, q.y / s, q.z / s), radian: radian };
};
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = new THREE.Mesh( new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial() );
scene.add(mesh1);
// ---------- ----------
// SETTING ROTATION WITH QUATERNION
// ---------- ----------
const q = new THREE.Quaternion();
const v_axis = new THREE.Vector3( 1, 1, 0 ).normalize();
const deg = 359.999;
q.setFromAxisAngle( v_axis, Math.PI / 180 * deg );
mesh1.rotation.setFromQuaternion(q);

const result = getAxisAndAngelFromQuaternion(q);
console.log( v_axis, deg);
console.log( result.axis, THREE.MathUtils.radToDeg( result.radian) );

// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
renderer.render(scene, camera);

