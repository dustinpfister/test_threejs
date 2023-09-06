// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.querySelector('#demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CURVE/V2ARRAY
// ---------- ----------
const v1 = new THREE.Vector2( 0, 0 );
const v2 = new THREE.Vector2( 0.5, 0 );
const v3 = new THREE.Vector2( 0.5, 0.5);
const v4 = new THREE.Vector2( 0.4, 0.5);
const v5 = new THREE.Vector2( 0.2, 0.1);
const v6 = new THREE.Vector2( 0, 0.1);
const vc1 = v2.clone().lerp(v3, 0.5).add( new THREE.Vector2(0.25,-0.1) );
const vc2 = v4.clone().lerp(v5, 0.5).add( new THREE.Vector2(0.25, 0) );
const curve = new THREE.CurvePath();
curve.add( new THREE.LineCurve( v1, v2 ) );
curve.add( new THREE.QuadraticBezierCurve(v2, vc1, v3) );
curve.add( new THREE.LineCurve( v3, v4 ) );
curve.add( new THREE.QuadraticBezierCurve( v4, vc2, v5 ) );
curve.add( new THREE.LineCurve( v5, v6 ) );
const v2array = curve.getPoints(20);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const segments_lathe = 80;
const phi_start = 0;
const phi_length = Math.PI * 2;
const geometry = new THREE.LatheGeometry( v2array, segments_lathe, phi_start, phi_length );
// ---------- ----------
// OBJECTS
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 0.95);
dl.position.set(1, 0, 3)
scene.add(dl);
scene.add( new THREE.AmbientLight(0xffffff, 0.01) );
const mesh1 = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xff0000, specular: 0x8a8a8a, side: THREE.FrontSide }) );
scene.add(mesh1);
mesh1.scale.set(2,2,2)
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 1);
camera.lookAt(0, 0.2, 0);
renderer.render(scene, camera);
