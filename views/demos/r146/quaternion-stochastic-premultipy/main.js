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
const makeMesh = (name, q) => {
    const material = new THREE.MeshNormalMaterial({wireframe: true, wireframeLinewidth: 2 });
    const mesh_parent = new THREE.Mesh(
        new THREE.SphereGeometry(1, 12, 12),
        material);
    const mesh_child = new THREE.Mesh(
        new THREE.CylinderGeometry(0, 0.25, 0.5, 8, 8),
        material);
    mesh_child.position.y = 1.25;
    mesh_parent.add(mesh_child);
    mesh_parent.name = name;
    const mud = mesh_parent.userData;
    mud.q = q || mesh_parent.quaternion;
    mud.axis = new THREE.Vector3(0, 1, 0);
    mud.deg = 0;
    mud.e = new THREE.Euler();
    return mesh_parent;
};
// ---------- ----------
// SETTING ROTATION WITH QUATERNION
// ---------- ----------
const q = new THREE.Quaternion();
const q1 = q.clone();
const q2 = q.clone();
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh1 = makeMesh('mesh1', q1);
mesh1.position.set(0, 0, -2.5);
scene.add(mesh1);
const mesh2 = makeMesh('mesh2', q2);
mesh2.position.set(0, 0, 2.5);
scene.add(mesh2);
const mesh3 = makeMesh('mesh3');
mesh3.position.set(0, 0, 0);
scene.add(mesh3);
// ---------- ----------
// CONTROLS
// ---------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enabled = true;
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt( 0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
const update = function(frame, frameMax){
    mesh1.quaternion.copy(q1);
    mesh2.quaternion.copy(q2);
    mesh3.quaternion.copy(q1).premultiply(q2);
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
// ---------- ----------
// EVENTS
// ---------- ----------
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let pointer_down = false;
let mesh_current = null;
renderer.domElement.addEventListener('pointerdown', (evnt) => {
    const canvas = evnt.target,
    box = canvas.getBoundingClientRect(),
    x = evnt.clientX - box.left,
    y = evnt.clientY - box.top;
    pointer.x = ( x / canvas.width ) * 2 - 1;
    pointer.y = - ( y / canvas.height ) * 2 + 1;
    raycaster.setFromCamera( pointer, camera );
    const intersects = raycaster.intersectObjects( [mesh1, mesh2] );
    controls.enabled = true;
    pointer_down = true;
    mesh_current = null;
    if(intersects.length > 0){
         controls.enabled = false;
         mesh_current = intersects[0].object;
    }
});
renderer.domElement.addEventListener('pointermove', (evnt) => {
    const canvas = evnt.target,
    box = canvas.getBoundingClientRect(),
    x = evnt.clientX - box.left,
    y = evnt.clientY - box.top;
    const pointer_move = new THREE.Vector2();
    pointer_move.x = ( x / canvas.width ) * 2 - 1;
    pointer_move.y = - ( y / canvas.height ) * 2 + 1;
   if(mesh_current && pointer_down){
        const dx = pointer.x - pointer_move.x;
        const dy = pointer.y - pointer_move.y;
        const mud = mesh_current.userData;
        // angle
        mud.deg = THREE.MathUtils.euclideanModulo(mud.deg += dx, 360);
        mud.deg = parseFloat(mud.deg.toFixed(3));
        // axis
        mud.e.z += Math.PI / 180 * (dy / 100);
        mud.axis.applyEuler(mud.e);
        mud.q.setFromAxisAngle( mud.axis.normalize(), THREE.MathUtils.degToRad(mud.deg) );
   }
});
renderer.domElement.addEventListener('pointerup', () => {
    controls.enabled = true;
    pointer_down = false;
});
