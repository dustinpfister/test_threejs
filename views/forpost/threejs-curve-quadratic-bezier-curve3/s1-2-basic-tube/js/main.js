//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(7, 5, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CURVE
//-------- ----------
const v1 = new THREE.Vector3(5, 0, 5);
const v2 = new THREE.Vector3(-5, 0, -5);
const vControl = new THREE.Vector3(5, 0, -5);
const curve = new THREE.QuadraticBezierCurve3( v1, vControl, v2);
//-------- ----------
// MESH WITH TUBE GEOMETRY
//-------- ----------
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) );
const tubeSegements = 25;
const radius = 0.75;
const radialSegements = 25;
const closeTube = false;
const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, tubeSegements, radius, radialSegements, closeTube),
    new THREE.MeshNormalMaterial({ side: THREE.DoubleSide}) );
scene.add(mesh);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);
