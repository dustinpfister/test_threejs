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
const radius1 = 1.5;
const radius2 = 1.0;
const segments = 80;
const geometry = new THREE.RingGeometry(radius1, radius2, segments);
//-------- ----------
// LINE, GRID HELPER
//-------- ----------
const material = new THREE.LineBasicMaterial({ linewidth: 3, color: 0x00ffff });
const line = new THREE.LineSegments(geometry, material);
scene.add( line );
scene.add( new THREE.GridHelper(10, 10) );
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(3, 2, 3);
camera.lookAt( 0, 0, 0 );
renderer.render(scene, camera);