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
    const v_c1 = v_start.clone().lerp(v_end, 0.5).add(v_d1);
    const v_c2 = v_start.clone().lerp(v_end, 0.5).add(v_d2);
    return new THREE.CubicBezierCurve3(v_start, v_c1, v_c2, v_end);
};
// ---------- ----------
// SOURCE OBJECTS
// ---------- ----------
const group_source = new THREE.Group();
scene.add(group_source)

const createSourceObject = (w, d, sx, sz, ex, ez, dx, dz) => {
    const obj1 = new THREE.Group();
    const gud = obj1.userData;
    const v_start = new THREE.Vector3(sx, 1.0, sz);
    const v_end =  new THREE.Vector3(ex, 1.0, ez);
    const v_d =  new THREE.Vector3(dx, 0.0, dz);
    gud.curve = createCurve(v_start, v_end, v_d, v_d);
    obj1.add( new THREE.Mesh( new THREE.BoxGeometry(w, 1, d), new THREE.MeshNormalMaterial()) )
    const geo_points = new THREE.BufferGeometry().setFromPoints( gud.curve.getPoints(19) );
    obj1.add( new THREE.Points( geo_points, new THREE.PointsMaterial({size: 0.25}) ) );
    return obj1;
};

const obj1 = createSourceObject(1,4,   0,-2,   0,2,   0,0);
obj1.position.set(4.5, 0.5, -1);
group_source.add(obj1);

const obj2 = createSourceObject(4,4,   1.5,-2,   -2,1.5,   1.5,1.5);
obj2.position.set(3.0, 0.5, 3);
group_source.add(obj2);


// ---------- ----------
// OBJECTS
// ---------- ----------
// grid helper
scene.add( new THREE.GridHelper(10, 10) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(-8,5,8);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
