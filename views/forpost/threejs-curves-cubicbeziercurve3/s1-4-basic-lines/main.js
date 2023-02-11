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
const v_start = new THREE.Vector3(-5,0,0);
const v_end = new THREE.Vector3(5,0,0);
// line with THREE.CubicBezierCurve3
v_start.z = 2;
v_end.z = 2;
const curve1 = new THREE.CubicBezierCurve3(
    v_start.clone(),
    v_start.clone().lerp(v_end, 0.25),
    v_start.clone().lerp(v_end, 0.75),
    v_end.clone());
// line with THREE.QuadraticBezierCurve3
v_start.z = 1;
v_end.z = 1;
const curve2 = new THREE.QuadraticBezierCurve3(
    v_start.clone(),
    v_start.clone().lerp(v_end, 0.5),
    v_end.clone());
// line with THREE.LineCurve3
v_start.z = 0;
v_end.z = 0;
const curve3 = new THREE.LineCurve3(
    v_start.clone(),
    v_end.clone());
// ---------- ----------
// OBJECTS
// ---------- ----------
// grid helper
scene.add( new THREE.GridHelper(10, 10) );
// points
const material = new THREE.PointsMaterial({ size: 0.25, color: new THREE.Color(0,1,0) });
const geo1 = new THREE.BufferGeometry().setFromPoints( curve1.getPoints(50) );
const points1 = new THREE.Points(geo1, material);
scene.add(points1);
const geo2 = new THREE.BufferGeometry().setFromPoints( curve2.getPoints(50) );
const points2 = new THREE.Points(geo2, material);
scene.add(points2);
const geo3 = new THREE.BufferGeometry().setFromPoints( curve3.getPoints(50) );
const points3 = new THREE.Points(geo3, material);
scene.add(points3);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(5,2,5);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
