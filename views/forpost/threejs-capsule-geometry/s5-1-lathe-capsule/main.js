//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// curve
//-------- ----------
const v1 = new THREE.Vector2(  0.0, -1.0 );
const v2 = new THREE.Vector2(  1.0, -0.5 );
const v3 = new THREE.Vector2(  1.0,  0.5 );
const v4 = new THREE.Vector2(  0.0,  1.0 );
const c1 = v1.clone().lerp(v2, 0.5).add( new THREE.Vector2(  0.35, -0.35 ) );
const c2 = v3.clone().lerp(v4, 0.5).add( new THREE.Vector2(  0.35,  0.35 ) );
// curve path and child curves
const curve = new THREE.CurvePath();
curve.add( new THREE.QuadraticBezierCurve( v1, c1, v2 ) );
curve.add( new THREE.LineCurve( v2, v3 ) );
curve.add( new THREE.QuadraticBezierCurve( v3, c2, v4 ) );
//-------- ----------
// GEOMETRY
//-------- ----------
const lathe_segments = 50;
const v2_array = curve.getSpacedPoints(200);
const geometry = new THREE.LatheGeometry(v2_array, lathe_segments);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
//-------- ----------
// RENDER THE SCENE
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);

