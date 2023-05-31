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
const radian_start = Math.PI * 1.8;
const curve = new THREE.ArcCurve(0, 0, 5, radian_start, Math.PI * 0.2, false );
// ---------- ----------
// SHAPE/GEOMETRY
// ---------- ----------
const geometry = new THREE.LatheGeometry( curve.getPoints(64), 40 );
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({  side: THREE.DoubleSide }));
scene.add(mesh1);
scene.add( new THREE.GridHelper(10, 10) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(8, 12, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
