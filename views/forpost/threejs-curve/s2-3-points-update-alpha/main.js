//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
// the get alpha method
const get_alpha = (n, d, a = 1) => {
   const a_lin = n / ( d - 1 );
   const a_smooth = THREE.MathUtils.smootherstep(a_lin, 0, 1);
   return THREE.MathUtils.lerp( a_lin, a_smooth, a);
};
// create a geometry
const createCurveGeometry = ( curve, count = 50 ) => {
    return new THREE.BufferGeometry().setFromPoints( curve.getPoints(count) );
};
// create a geometry
const updateCurveGeometry = ( curve, geometry, alpha = 1 ) => {
    const att_pos = geometry.getAttribute('position');
    let i = 0;
    const len = att_pos.count;
    while(i < len){
        const a = get_alpha(i, len, alpha);
        const v = curve.getPoint( a );
        att_pos.setXYZ(i, v.x, v.y, v.z);
        i += 1;
    }
    att_pos.needsUpdate = true;
};
//-------- ----------
// CURVE
//-------- ----------
const v_start = new THREE.Vector3(5, 0, 5);
const v_end = new THREE.Vector3(-5, 0, -5);
const v_control = v_start.clone().lerp(v_end, 0.5).add( new THREE.Vector3(-5,0,5) );
const curve = new THREE.QuadraticBezierCurve3( v_start, v_control, v_end);
//-------- ----------
// v3_array
//-------- ----------
/*
const v3array = [];
let i = 0;
const len = 50;
while(i < len){
   const a = get_alpha(i, len, 0);
   const v = curve.getPoint( a );
   v3array.push( v );
   i += 1;
};
*/
//-------- ----------
// GEOMETRY
//-------- ----------
const geometry = createCurveGeometry(curve, 25); //new THREE.BufferGeometry().setFromPoints(v3array);
//-------- ----------
// SCENE CHILD OBJECTS
//-------- ----------
scene.add( new THREE.GridHelper(10, 10, 0x00ff00, 0x4a4a4a) );
const material = new THREE.PointsMaterial({ size: 0.25, color: 0xffff00})
const points1 = new THREE.Points(geometry, material);
scene.add(points1);

// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 5, 7);
camera.lookAt(0, 0, 0);
const sm = {
   FPS_UPDATE: 20,     // fps rate to update ( low fps for low CPU use, but choppy video )
   FPS_MOVEMENT: 30,  // fps rate to move object by that is independent of frame update rate
   FRAME_MAX: 100,
   secs: 0,
   frame_frac: 0,
   frame: 0,
   tick: 0,
   now: new Date(),
   lt: new Date()
};
const update = function(sm){
    const a1 = sm.frame / sm.FRAME_MAX;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    updateCurveGeometry(curve, geometry, a2 );
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
        sm.frame_frac += sm.FPS_MOVEMENT * sm.secs;
        sm.frame_frac %= sm.FRAME_MAX;
        sm.frame = Math.floor(sm.frame_frac);
        sm.tick = (sm.tick += 1) % sm.FRAME_MAX;
        sm.lt = sm.now;
    }
};
loop();
