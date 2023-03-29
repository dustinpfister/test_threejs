//-------- ----------
// SCENE, CAMERA, RENDERER, LIGHT
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add(camera);
//-------- ----------
// CURVE
//-------- ----------
const v_start = new THREE.Vector3(-5, 0, 0);
const v_end = new THREE.Vector3(5, 0, 0);
const curve = new THREE.LineCurve3(v_start, v_end);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(10, 10, 0xffffff, 0xffffff));
const mesh1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1));
scene.add(mesh1);
console.log(curve.getPoint(0));
mesh1.position.copy( curve.getPoint(0.25) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(-8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
