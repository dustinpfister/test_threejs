//-------- ----------
// SCENE, CAMERA, RENDERER, GRID
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
scene.add( new THREE.GridHelper(10, 10));
//-------- ----------
// HELPERS
//-------- ----------
// update a curve by radian, radius, and a control vector
const updateCurve = (curve, degree = 0, radius = 3, v_control = new THREE.Vector3(0,2,0) ) => {
    const e = new THREE.Euler();
    const radian = Math.PI / 180 * degree;
    e.y = radian;
    curve.v0.set(1, 0, 0).applyEuler(e).multiplyScalar(radius);
    curve.v1.copy(v_control);
    e.y = radian + Math.PI;
    curve.v2.set(1, 0, 0).applyEuler(e).multiplyScalar(radius);
};
// create and return a curve ( HREE.QuadraticBezierCurve3 )
const createCurve = (degree = 45, radius = 3, y = 5) => {
    const curve = new THREE.QuadraticBezierCurve3();
    updateCurve(curve, Math.PI / 180 * degree, radius, new THREE.Vector3(0, y, 0) );
    return curve;
};
// create a curve geometry
const createCurveGeometry = ( curve = createCurve() ) => {
    const geometry = new THREE.BufferGeometry().setFromPoints( curve.getPoints(19) );
    geometry.userData.curve = curve;
    const len = geometry.getAttribute('position').count;
    const color_array = [];
    let i = 0;
    while(i < len){
        const a1 = i / len;
        const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
        color_array.push(a1, a2, 1 - a2);
        i += 1;
    }
    const color_attribute = new THREE.BufferAttribute(new Float32Array(color_array), 3);
    geometry.setAttribute('color', color_attribute);
    return geometry;
};
// update a curve geometry to the given curve, or userData.curve of there
const updateCurveGeometry = (geometry, curve) => {
    curve = curve || geometry.userData.curve || createCurve();
    const att_pos = geometry.getAttribute('position');
    let i = 0;
    while(i < att_pos.count){
       const v = curve.getPoint(i / ( att_pos.count - 1) );
       att_pos.setXYZ(i, v.x, v.y, v.z);
       i += 1;
    }
    att_pos.needsUpdate = true;
};
const getBiasAlpha = (a1, count) => {
    let a = 1 - Math.abs(0.5 - (a1 * count % 1) ) / 0.5;
    return a;
};
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = createCurveGeometry();
//-------- ----------
// POINTS
//-------- ----------
const points = new THREE.Points(geometry, new THREE.PointsMaterial({size: 0.5, vertexColors: true }));
scene.add(points);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 8);
camera.lookAt(points.position);
const sm = {
   FPS_UPDATE: 30,    // FPS RATE
   FRAME_MAX: 450,
   secs: 0,
   frame: 0,         // 30 / 450
   tick: 0,          //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date()
};
const update = function(sm){
    const a1 = sm.frame / sm.FRAME_MAX;
    const a2 = getBiasAlpha(a1, 3);
    const a3 = getBiasAlpha(a1, 12);
    const a4 = getBiasAlpha(a1, 5);
    const a5 = getBiasAlpha(a1, 1);
    const deg = 360 * a1;
    const radius = 7 - 3.5 * a5;
    const x = 5 - 10 * a2;
    const y = 8 - 16 * a3;
    const z = -5 + 10 * a4
    const v_control = new THREE.Vector3(x, y, z);
    updateCurve(geometry.userData.curve, deg, radius, v_control);
    updateCurveGeometry(geometry);

};
const loop = () => {
    sm.now = new Date();
    sm.secs = (sm.now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(sm.secs > 1 / sm.FPS_UPDATE){
        // update, render
        update(sm);
        renderer.render(scene, camera);
        // step frame
        sm.frame = ( sm.frame += 1 ) % sm.FRAME_MAX;
        sm.lt = sm.now;
    }
};
loop();
