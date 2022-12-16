//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(1, 1, 1);
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(6.5, 6.5, 6.5);
camera.lookAt(0, -3.25, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
const geoFromCurve = (curve, detail) => {
    detail = detail === undefined ? 100: detail;
    return new THREE.BufferGeometry().setFromPoints( curve.getPoints(detail) );
};
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(2, 1, 0);
scene.add(dl);
const dl2 = new THREE.DirectionalLight(0xffffff, 1);
dl2.position.set(2, -1, 0);
scene.add(dl2);
// ---------- ----------
// CURVES
// ---------- ----------
const c1_start = new THREE.Vector3(-5,0,5), 
c1_control = new THREE.Vector3(0, 5, 0), 
c1_end = new THREE.Vector3(5,0,5),
c2_start = new THREE.Vector3(-5,0,-5), 
c2_control = new THREE.Vector3(0, -5, 0), 
c2_end = new THREE.Vector3(5,0,-5);
const curve1 = new THREE.QuadraticBezierCurve3(c1_start, c1_control, c1_end);
const curve2 = new THREE.QuadraticBezierCurve3(c2_start, c2_control, c2_end);
// ---------- ----------
// LINES
// ---------- ----------
const material_line = new THREE.LineBasicMaterial({ linewidth: 8, color: 0xff0000});
const line1 = new THREE.Line( geoFromCurve(curve1, 50), material_line );
scene.add(line1);
const line2 = new THREE.Line( geoFromCurve(curve2, 50), material_line );
scene.add(line2);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
