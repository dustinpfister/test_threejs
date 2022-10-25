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
// HELPERS
//-------- ----------
// get control point
//const getControlPoint = (vStart, vEnd, vDelta) => {
//    return vStart.clone().lerp(vEnd, 0.5).add( vDelta );
//};
// create curve helper
const createCurve = (vStart, vEnd, vDelta) => {
    vDelta = vDelta || new THREE.Vector3();
    return new THREE.QuadraticBezierCurve3(vStart, vControl, vEnd);
};
// create points helper
const createPoints = (curve) => {
    return new THREE.Points(
         (new THREE.BufferGeometry).setFromPoints( curve.getPoints(50) ),
         new THREE.PointsMaterial({ size: 0.4, color: new THREE.Color(0,1,0) })
    );
};
const updatePoints = (points, curve) => {
    curve.getPoints(50).forEach((v)=>{


    });
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
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enabled = true;
// ---------- ----------
// EVENTS
// ---------- ----------
const uiState = {
    down: false,
    raycaster : new THREE.Raycaster(),
    mouse_down: new THREE.Vector2(-5, -5),
    mouse_current: new THREE.Vector2(-5, -5),
    d: 0, // distance and angle
    a: 0,
    mesh: null,
    v_start: new THREE.Vector3(),
    v_end: new THREE.Vector3()
};
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
    uiState.down = true;
    updateMouse(event, uiState.mouse_down);
    updateMouse(event, uiState.mouse_current);
    uiState.raycaster.setFromCamera( uiState.mouse_current, camera );
    const intersects = uiState.raycaster.intersectObjects([mesh_control, mesh_start, mesh_end], true );
    uiState.mesh = null;
    if(intersects[0]){
        controls.enabled = false;
        uiState.mesh = intersects[0].object;
        uiState.v_start = uiState.mesh.position.clone();
    }
});
renderer.domElement.addEventListener('pointerup', (event) => {
    uiState.down = false;
    controls.enabled = true;
    resetMouse(event, uiState.mouse_current);
    console.log(uiState.d, uiState.a);

const vStart = mesh_start.position;
const vEnd = mesh_end.position;
const vControl = mesh_control.position;
const curve = new THREE.CurvePath();
curve.add( createCurve( vStart, vEnd, vControl) );

console.log(curve)


});
renderer.domElement.addEventListener('pointermove', (event) => {
    updateMouse(event, uiState.mouse_current);
    if(uiState.down && uiState.mesh){
         const m1 = uiState.mouse_down;
         const m2 = uiState.mouse_current;
         uiState.d = parseFloat( m1.distanceTo(m2).toFixed(4) );
         uiState.a = Math.PI + parseFloat( ( Math.atan2( m1.y - m2.y, m1.x - m2.x) ).toFixed(4) );
         // moveing control mesh
         const x = Math.cos(uiState.a) * 5 * uiState.d;
         uiState.v_end = uiState.v_start.clone().add( new THREE.Vector3(x, 0 ,0) )
         uiState.mesh.position.copy(uiState.v_end)
    }
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

