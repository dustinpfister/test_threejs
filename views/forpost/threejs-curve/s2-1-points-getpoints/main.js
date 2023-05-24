//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CURVE
//-------- ----------
const v_start = new THREE.Vector3(5, 0, 5);
const v_end = new THREE.Vector3(-5, 0, -5);
const v_control = v_start.clone().lerp(v_end, 0.5).add( new THREE.Vector3(-5,0,5) );
const curve = new THREE.QuadraticBezierCurve3( v_start, v_control, v_end);
//-------- ----------
// v3_array
//-------- ----------
const v3array = curve.getPoints(50);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BufferGeometry().setFromPoints(v3array);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) );
const material = new THREE.PointsMaterial({ size: 0.25, color: 0xffff00})
const points1 = new THREE.Points(geometry, material);
scene.add(points1);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(10, 5, 7);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
