// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
const geo = new THREE.BoxGeometry(2, 2, 2);
const points = new THREE.Points(geo);
scene.add(points);
scene.add( new THREE.GridHelper( 10,10 ) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 4);
camera.lookAt(0,0,0);
renderer.render(scene, camera);

