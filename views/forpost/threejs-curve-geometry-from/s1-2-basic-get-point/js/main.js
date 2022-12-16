//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(1, 1, 1);
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(7, 7, 7);
camera.lookAt(0, -3, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// CURVES
// ---------- ----------
const c1_start = new THREE.Vector3(-5,0,-5), 
c1_control = new THREE.Vector3(0, 0, 15), 
c1_end = new THREE.Vector3(5, 0, -5);
const curve1 = new THREE.QuadraticBezierCurve3(c1_start, c1_control, c1_end);
// ---------- ----------
// GEO
// ---------- ----------
const geo = new THREE.BufferGeometry();
const data_pos = [];
let i = 0, len = 100;
while(i < len){
    const a1 = i / (len - 1);
    const v = curve1.getPoint(a1);
    data_pos.push(v.x, v.y, v.z);
    i += 1;
}
geo.setAttribute('position', new THREE.Float32BufferAttribute( data_pos, 3) );
// ---------- ----------
// LINE
// ---------- ----------
const material_line = new THREE.LineBasicMaterial({ linewidth: 8, color: 0xff0000});
const line1 = new THREE.Line( geo, material_line );
scene.add(line1);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
