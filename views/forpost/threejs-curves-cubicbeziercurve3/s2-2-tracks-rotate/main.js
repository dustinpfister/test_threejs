// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CURVE
// ---------- ----------
const v_start = new THREE.Vector3(4,0,5);
const v_end = new THREE.Vector3(-5,0,-4);
const v_c1 = new THREE.Vector3(4, 0,-1);
const v_c2 = new THREE.Vector3(1, 0,-4);
const curve = new THREE.CubicBezierCurve3(v_start, v_c1, v_c2, v_end);
let vi = 0;
while(vi < 4){
    const v = curve['v' + vi];
    const e = new THREE.Euler();
    e.y = Math.PI * 1.5; // can adjust this to set rotation
    v.applyEuler(e);
    vi += 1;
};
const geo_points = new THREE.BufferGeometry().setFromPoints( curve.getPoints(29) );
scene.add( new THREE.Points( geo_points, new THREE.PointsMaterial({size: 0.25}) ) );
// ---------- ----------
// OBJECTS
// ---------- ----------
// grid helper
scene.add( new THREE.GridHelper(10, 10) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial() )
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(-8,5,8);
camera.lookAt(0,0,0);
mesh.position.copy( curve.getPoint(0.5) );
mesh.lookAt( curve.getPoint( 0.6 ) );
renderer.render(scene, camera);
