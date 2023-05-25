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
const v_start = new THREE.Vector2(0, -3);
const v_end = new THREE.Vector2(0, 3);
const v_control = v_start.clone().lerp(v_end, 0.5).add( new THREE.Vector2(5, 3) );
const curve = new THREE.QuadraticBezierCurve(v_start, v_control, v_end);
// ---------- ----------
// SHAPE/GEOMETRY
// ---------- ----------
const v2array = curve.getPoints(50);
const shape = new THREE.Shape( v2array  );
const geometry = new THREE.ShapeGeometry(shape);
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({  side: THREE.DoubleSide }));
scene.add(mesh1);
scene.add( new THREE.GridHelper(10, 10) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
