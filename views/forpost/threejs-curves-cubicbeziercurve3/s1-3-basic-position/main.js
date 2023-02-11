// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
// I like to think in terms of deltas from center of what would be a string line
const createCurve = (v_start, v_end, v_d1, v_d2) => {
    v_d1 = v_d1 || new THREE.Vector3();
    v_d2 = v_d2 || new THREE.Vector3();
    const v_c1 = v_start.clone().lerp(v_end, 0.25).add(v_d1);
    const v_c2 = v_start.clone().lerp(v_end, 0.75).add(v_d2);
    return new THREE.CubicBezierCurve3(v_start, v_c1, v_c2, v_end);
};
// ---------- ----------
// CURVE
// ---------- ----------
const v_start = new THREE.Vector3(4, 0, -5);
const v_end = new THREE.Vector3(-5, 0, 4);
const v_d1 = new THREE.Vector3(5,0,5)
const curve = createCurve(v_start, v_end, v_d1, v_d1.clone().add( new THREE.Vector3(-3,0,-8)) );
// ---------- ----------
// OBJECTS
// ---------- ----------
// grid helper
scene.add( new THREE.GridHelper(10, 10) );
// points
const material = new THREE.PointsMaterial({ size: 0.15, color: new THREE.Color(0,1,0) });
const geometry = new THREE.BufferGeometry().setFromPoints( curve.getPoints(100) );
const points = new THREE.Points(geometry, material);
scene.add(points);
// mesh objects I would like to posiiton to the curve
const material_mesh = new THREE.MeshNormalMaterial();
[
  [0.20, 1.00],
  [0.75, 0.50],
  [0.95, 0.20]
].forEach((data)=>{
    const mesh = new THREE.Mesh( new THREE.SphereGeometry(data[1], 20, 20), material_mesh );
    mesh.position.copy( curve.getPoint(data[0]) );
    scene.add(mesh);
});
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(-8,5,8);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
