// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// POINTS
// ---------- ----------
const points = [
    new THREE.Vector3( 0.0, 0.0, 0.0),
    new THREE.Vector3(-1.0, 0.3,-3.5),
    new THREE.Vector3( 1.0, 0.3,-3.5)
];
// ---------- ----------
// GEOMETRY - using the setFromPoints method
// ---------- ----------
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(points);
geometry.setIndex( [0,1,2,0] );
// ---------- ----------
// Line, LineBasicMaterial
// ---------- ----------
const material = new THREE.LineBasicMaterial({ linewidth: 6, color: 0xffff00 });
const line = new THREE.Line(geometry, material);
scene.add(line);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);

