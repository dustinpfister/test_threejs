//-------- ----------
// SCENE, CAMERA
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY - rotation by way of quaternion object
//-------- ----------
const geometry = new THREE.CylinderGeometry(0, 1, 5, 40, 40);
const q = new THREE.Quaternion();
q.setFromAxisAngle( new THREE.Vector3( 0, 0, 1), 45 );
geometry.applyQuaternion(q);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
const material = new THREE.PointsMaterial( { size: 0.1} );
const points = new THREE.Points( geometry, material );
scene.add(points);
scene.add( new THREE.GridHelper( 10, 10 ) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 1, 5);
camera.lookAt( 0, 0.0, 0);
renderer.render(scene, camera);
