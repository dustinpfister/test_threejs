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
// create a source object
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
// create a curve to be used as a track curve from a tack object
const createTrackPart = (obj_track) => {
    const c1 = obj_track.userData.curve;
    const v_objpos = new THREE.Vector3();
    obj_track.getWorldPosition(v_objpos);
    const v_start = v_objpos.clone().add(c1.v0);
    const v_c1 = v_objpos.clone().add(c1.v1);
    const v_c2 = v_objpos.clone().add(c1.v2);
    const v_end = v_objpos.clone().add(c1.v3);
    return new THREE.CubicBezierCurve3(v_start, v_c1, v_c2, v_end);
};
// ---------- ----------
// SOURCE OBJECTS
// ---------- ----------
const group_source = new THREE.Group();
group_source.add( createSourceObject(1.0, 4.0,   0.0,-2.0,    0.0, 2.0,   0.0, 0.0) );
group_source.add( createSourceObject(4.0, 4.0,   1.5,-2.0,   -2.0, 1.5,   1.5, 1.5) );
group_source.add( createSourceObject(4.0, 1.0,   2.0, 0.0,   -2.0, 0.0,   0.0, 0.0) );

// ---------- ----------
// TRACK OBJECTS
// ---------- ----------
const track1 = group_source.children[0].clone();
track1.userData.curve = group_source.children[0].userData.curve;
track1.position.set(4.5, 0.5, -1);
scene.add(track1);

const track2 = group_source.children[1].clone();
track2.userData.curve = group_source.children[1].userData.curve;
track2.position.set(3.0, 0.5, 3);
scene.add(track2);

const track3 = group_source.children[2].clone();
track3.userData.curve = group_source.children[2].userData.curve;
track3.position.set(-1, 0.5, 4.5);
scene.add(track3)

//-------- ----------
// CURVE PATH - a curve path that will funciton as a track created from the Track Object Curves and Mesh Positions
//-------- ----------
const curve = new THREE.CurvePath();
curve.add( createTrackPart(track1) );
curve.add( createTrackPart(track2) );
curve.add( createTrackPart(track3) );
const geo_points = new THREE.BufferGeometry().setFromPoints( curve.getPoints(19) );
scene.add( new THREE.Points( geo_points, new THREE.PointsMaterial({size: 0.25}) ) );
// ---------- ----------
// OBJECTS
// ---------- ----------
// grid helper
scene.add( new THREE.GridHelper(10, 10) );
const mesh = new THREE.Mesh( new THREE.BoxGeometry(1,1,1), new THREE.MeshNormalMaterial() )
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(-8,5,8);
camera.lookAt(0,0,0);
const a1 = 0.75;
const a2 = ( a1 * 0.98 + 0.01 ) % 1;
mesh.position.copy( curve.getPoint(a1) );
mesh.lookAt( curve.getPoint( a2 ) );
renderer.render(scene, camera);
