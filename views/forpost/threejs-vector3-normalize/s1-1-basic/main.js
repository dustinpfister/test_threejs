//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// VECTOR3
//-------- ----------
const v_dir = new THREE.Vector3(0, 0, 18).normalize();
console.log(v_dir.x, v_dir.y, v_dir.z); // 0, 0, 1
//-------- ----------
// OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(2, 2) );
const mesh1 = new THREE.Mesh( new THREE.SphereGeometry(0.1, 10, 10) );
mesh1.position.copy(v_dir);
scene.add(mesh1);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
