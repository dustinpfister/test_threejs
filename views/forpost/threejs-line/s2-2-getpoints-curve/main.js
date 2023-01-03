//-------- ----------
// SCENE, CAMERA
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// CURVE
//-------- ---------- 
const v_start = new THREE.Vector3(0,0,5);
const v_end = new THREE.Vector3(-5,0,-5);
const v_control = v_start.clone().lerp(v_end, 0.5).add( new THREE.Vector3( 14.7, 0, -5) );
const curve = new THREE.QuadraticBezierCurve3(v_start, v_control, v_end);
//-------- ----------
// POINTS, GEOMETRY, LINE
//-------- ----------
const geometry = new THREE.BufferGeometry().setFromPoints( curve.getPoints( 100 ) )
const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 3}));
line.position.y = 0.1;
scene.add(line);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
