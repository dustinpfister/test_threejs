//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LINES
//-------- ----------
const opt = { maxRadius: 5, pointsPerCircle: 70, circleCount: 50 }
const g1 = LinesSphereCircles.create(opt);
scene.add(g1);
//-------- ----------
// RENDER
//-------- ----------
renderer.render(scene, camera);

