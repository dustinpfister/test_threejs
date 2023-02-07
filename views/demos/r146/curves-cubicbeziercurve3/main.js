// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CURVES
// ---------- ----------
const v_start = new THREE.Vector3(5,0,5);
const v_end = new THREE.Vector3(-5,0,-5);
const v_control_1 = new THREE.Vector3(5,0,-10);
const v_control_2 = new THREE.Vector3(-5,0,10);
const curve = new THREE.CubicBezierCurve3(v_start, v_control_1, v_control_2, v_end);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const material = new THREE.PointsMaterial({ size: 0.2, color: new THREE.Color(0,1,0) });
const geometry = new THREE.BufferGeometry().setFromPoints( curve.getPoints(100) );
const points = new THREE.Points(geometry, material);
scene.add(points);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(-8,5,8);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
