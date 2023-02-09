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
// helper that is just an abstraction for THREE.CubicBezierCurve3
const createCurve = (sx,sy,sz, ex,ey,ez, c1x, c1y, c1z, c2x, c2y, c2z ) => {
    const v_start = new THREE.Vector3(sx, sy, sz);
    const v_end = new THREE.Vector3(ex, ey, ez);
    const c1 = new THREE.Vector3(c1x, c1y, c1z);
    const c2 = new THREE.Vector3(c2x, c2y, c2z);
    return new THREE.CubicBezierCurve3(v_start, c1, c2, v_end);
};
// can still have a single control kind of effect by just using the same
// control point for both
const createCurveSC = (sx,sy,sz, ex,ey,ez, c1x, c1y, c1z) => {
    return createCurve(sx,sy,sz, ex,ey,ez, c1x,c1y,c1z, c1x,c1y,c1z );
};
// ---------- ----------
// CURVE PATH
// ---------- ----------
const curve = new THREE.CurvePath();
curve.add( createCurveSC(-4, 0,-5,   0, 0, 3,  -4, 0, 3 ) );
curve.add( createCurve(   0, 0, 3,   5, 0, 3,   5, 0, 6,   3, 0, -6 ) );
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const material = new THREE.PointsMaterial({ size: 0.15, color: new THREE.Color(0,1,0) });
const geometry = new THREE.BufferGeometry().setFromPoints( curve.getPoints(100) );
const points = new THREE.Points(geometry, material);
scene.add(points);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(-8,5,8);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
