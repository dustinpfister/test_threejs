//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(-10, 10, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// STATE OBJECT
//-------- ----------
const state = {
    controls: new THREE.OrbitControls(camera, renderer.domElement),
    down: false,
    raycaster : new THREE.Raycaster(),
    mouse_down: new THREE.Vector2(-5, -5),
    mouse_current: new THREE.Vector2(-5, -5),
    axis: 'x', //the current axis to control
    snapMode: true,
    d: 0, // distance and angle
    a: 0,
    mesh: null,
    v_start: new THREE.Vector3(),
    v_end: new THREE.Vector3()
};


//-------- ----------
// HELPERS
//-------- ----------
// create curve helper
const createCurve = (vStart, vEnd, vControl) => {
    return new THREE.QuadraticBezierCurve3(vStart, vControl, vEnd);
};
// create points helper
const createPoints = (curve) => {
    return new THREE.Points(
         (new THREE.BufferGeometry).setFromPoints( curve.getPoints(50) ),
         new THREE.PointsMaterial({ size: 0.4, color: new THREE.Color(0,1,0) })
    );
};
// update points
const updatePoints = (points, curve) => {
    const geo = points.geometry;
    const pos = geo.getAttribute('position');
    const v3Array = curve.getPoints(50);
    const len = v3Array.length;
    let i = 0;
    while(i < len){
        const v = v3Array[i];
        pos.array[i * 3] = v.x;
        pos.array[i * 3 + 1] = v.y;
        pos.array[i * 3 + 2] = v.z;
        i += 1;
    }
    pos.needsUpdate = true;
};
// create mesh helper
const createMesh = () => {
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 20, 20),
        new THREE.MeshNormalMaterial()
    );
    return mesh;
};
//-------- ----------
// MESH OBJECTS
//-------- ----------
const mesh_start = createMesh();
const mesh_end = createMesh();
const mesh_control = createMesh();
scene.add(mesh_start);
scene.add(mesh_end);
scene.add(mesh_control);
//-------- ----------
// CURVE POINTS
//-------- ----------
const vStart = new THREE.Vector3(0, 0, 5);
const vEnd = new THREE.Vector3(0, 0, -5);
const vControl = new THREE.Vector3(0, 0, 0);
const curve = new THREE.CurvePath();
curve.add( createCurve( vStart, vEnd, vControl) );
const points = createPoints(curve);
scene.add(points);
mesh_start.position.copy(vStart);
mesh_end.position.copy(vEnd);
mesh_control.position.copy(vControl);
// ---------- ----------
// ORBIT CONTROLS
// ---------- ----------
const updateMouse = ( event, mouse ) => {
    const canvas = event.target,
    box = canvas.getBoundingClientRect(),
    x = event.clientX - box.left,
    y = event.clientY - box.top;
    mouse.x = ( x / canvas.scrollWidth ) * 2 - 1;
    mouse.y = - ( y / canvas.scrollHeight ) * 2 + 1;
};
const resetMouse = ( event, mouse ) => {
    mouse.x = -5;
    mouse.y = -5;
};
renderer.domElement.addEventListener('pointerdown', (event) => {
    state.down = true;
    updateMouse(event, state.mouse_down);
    updateMouse(event, state.mouse_current);
    state.raycaster.setFromCamera( state.mouse_current, camera );
    const intersects = state.raycaster.intersectObjects([mesh_control, mesh_start, mesh_end], true );
    state.mesh = null;
    if(intersects[0]){
        state.controls.enabled = false;
        state.mesh = intersects[0].object;
        state.v_start = state.mesh.position.clone();
    }
});
renderer.domElement.addEventListener('pointerup', (event) => {
    state.down = false;
    state.controls.enabled = true;
    resetMouse(event, state.mouse_current);
    const vStart = mesh_start.position;
    const vEnd = mesh_end.position;
    const vControl = mesh_control.position;
    const curve = new THREE.CurvePath();
    curve.add( createCurve( vStart, vEnd, vControl) );
    // calling update points method
    updatePoints(points, curve)
});
renderer.domElement.addEventListener('pointermove', (event) => {
    updateMouse(event, state.mouse_current);
    if(state.down && state.mesh){
         const m1 = state.mouse_down;
         const m2 = state.mouse_current;
         state.d = parseFloat( m1.distanceTo(m2).toFixed(4) );
         state.a = Math.PI + parseFloat( ( Math.atan2( m1.y - m2.y, m1.x - m2.x) ).toFixed(4) );
         // moving control mesh
         const x = Math.cos(state.a) * 5 * state.d;
         const v = new THREE.Vector3();
         v[state.axis] = x;
         state.v_end = state.v_start.clone().add( v );
         if(state.snapMode){
             state.v_end.x = Math.round( state.v_end.x );
             state.v_end.y = Math.round( state.v_end.y );
             state.v_end.z = Math.round( state.v_end.z );
         }
         state.mesh.position.copy(state.v_end)
    }
});
// ---------- ----------
// KETBOARD EVENTS
// ---------- ----------
window.addEventListener('keydown', (e) => {
    ['x', 'y', 'z'].forEach( (key) => {
         if(e.key.toLowerCase() === key){
             state.axis = key;
         }
    });
});

// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();

