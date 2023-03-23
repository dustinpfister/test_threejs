// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
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

const vector = new THREE.Vector3( -1, 0, 0 ).normalize();
q.x = vector.x;
q.y = vector.y;
q.z = vector.z;
q.w = -0.5;

//q.setFromAxisAngle( new THREE.Vector3( -1, 0, 0 ).normalize(), Math.PI / 180 * 180 );

mesh1.rotation.setFromQuaternion(q);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
renderer.render(scene, camera);

