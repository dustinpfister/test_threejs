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
const v_start = new THREE.Vector3(-5, 2, -5);
const v_end = new THREE.Vector3(5, 0, 0);
const curve = new THREE.LineCurve3(v_start, v_end);
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = new THREE.BufferGeometry().setFromPoints( curve.getPoints( 10 ) );
//-------- ----------
// POINTS
//-------- ----------
scene.add(  new THREE.Points(geometry, new THREE.PointsMaterial( { size: 1.25 } ) ) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 5, 8);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
