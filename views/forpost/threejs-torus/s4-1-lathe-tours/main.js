// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CURVE
// ---------- ----------
const radius_origin = 4;
const radius_tube = 1.00;
const curve = new THREE.ArcCurve(radius_origin, 0, radius_tube, 0, Math.PI * 2, false);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const segments_curve = 50;
const v2array = curve.getPoints(segments_curve);
const segments_lathe = 50;
const phi_start = 0;
const phi_length = Math.PI * 2;
const geometry = new THREE.LatheGeometry( v2array, segments_lathe, phi_start, phi_length );
// ---------- ----------
// OBJECTS
// ---------- ----------
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
