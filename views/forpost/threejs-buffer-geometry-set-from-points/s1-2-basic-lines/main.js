// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// POINTS - array of Vector3 Objects
// ---------- ----------
const points_array = [
    new THREE.Vector3( -1.0,  0.0,  1.0),
    new THREE.Vector3( -1.0,  0.0, -1.0),
    new THREE.Vector3( -1.0,  1.0, -1.0),
    new THREE.Vector3(  1.0,  1.0, -1.0),
    new THREE.Vector3(  1.0,  0.0, -1.0),
    new THREE.Vector3(  1.0,  0.0,  1.0),
    new THREE.Vector3(  1.0, -1.0,  1.0),
    new THREE.Vector3( -1.0, -1.0,  1.0),
    new THREE.Vector3( -1.0,  0.0,  1.0)
];
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(points_array);
// ---------- ----------
// Line
// ---------- ----------
const material = new THREE.LineBasicMaterial({ color: 0xffff00, linewidth: 3 });
scene.add( new THREE.Line(geometry, material) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
