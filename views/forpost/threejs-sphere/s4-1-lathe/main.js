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
const curve = new THREE.ArcCurve(0, 0, 5.5, Math.PI * 1.5, Math.PI * 0.5, false);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const segments_curve = 40;
const v2array = curve.getPoints(segments_curve);
const segments_lathe = 40;
const phi_start = 0;
const phi_length = Math.PI * 2;
const geometry = new THREE.LatheGeometry( v2array, segments_lathe, phi_start, phi_length );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10, 10 ) );
const material = new THREE.MeshNormalMaterial();
const mesh1 = new THREE.Mesh(geometry, material);
scene.add(mesh1);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(9, 6, 9);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
