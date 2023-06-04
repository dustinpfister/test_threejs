//-------- ----------
// SCENE, CAMERA, RENDERER, GRID
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add( new THREE.GridHelper(10, 10));
//-------- ----------
// CURVE/DATA
//-------- ----------
const v_start = new THREE.Vector3(-5, 0, 0);
const v_end = new THREE.Vector3(5, 0, 0);
const v_controlA = v_start.clone().lerp(v_end, 0.25).add( new THREE.Vector3(0,8,0) );
const v_controlB = v_start.clone().lerp(v_end, 0.75).add( new THREE.Vector3(0,-8,0) );
const curve = new THREE.CubicBezierCurve3(v_start, v_controlA, v_controlB, v_end);
const data = [];
let i = 0, count = 100;
while(i < count){
    const a = i / ( count - 1 );
    const v = curve.getPoint(a);
    data.push(v.x, v.y, v.z)
    i += 1;
}
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute( new Float32Array( data ), 3 ));
geometry.center();
//-------- ----------
// POINTS
//-------- ----------
const points = new THREE.Points(geometry, new THREE.PointsMaterial({size: 0.25}));
scene.add(points);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 8);
camera.lookAt(points.position);
renderer.render(scene, camera);
