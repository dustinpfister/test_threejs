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
const v3array = [];
let i = 0;
const len = 50;
while(i < len){
   // use some kind of expression, method, or whatever means
   // to get an alpha value ( 0 - 1 ) that will be the point along
   // the curve
   const a_point = i / ( len - 1 );
   const a_smooth = THREE.MathUtils.smootherstep(a_point, 0, 1);
   v3array.push( curve.getPoint( a_smooth ) );
   i += 1;
};
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
