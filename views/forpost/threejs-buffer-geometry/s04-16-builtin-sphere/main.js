//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// GEOMETRY
//-------- ----------
const radius = 2,
width_segments = 30,
height_segments = 30;
const geometry = new THREE.SphereGeometry(radius, width_segments, height_segments);
//-------- ----------
// POINTS, GRID HELPER
//-------- ----------
const material = new THREE.PointsMaterial({ size: 0.20, color: 0x00ffff });
const points = new THREE.Points(geometry, material);
scene.add(points);
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(4, 2, 3);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);