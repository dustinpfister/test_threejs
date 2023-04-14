// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
scene.background = null;
renderer.setClearColor(0x000000, 0)
renderer.setSize(640, 480, false);
const canvas_2d = document.createElement('canvas');
const ctx = canvas_2d.getContext('2d');
canvas_2d.width = 640;
canvas_2d.height = 480;
const canvas_3d = renderer.domElement;
const container = document.getElementById('demo') || document.body;
container.appendChild(canvas_2d);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper( 10,10 ) );
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 20, 20),
    new THREE.MeshNormalMaterial({ wireframe: true}));
scene.add(mesh);
// ---------- ----------
// QUATERNION OBJECTS ARRAY
// ---------- ----------
const q_array = [
    [ [0,1,0], [0,1,0] ],
    [ [0,1,0], [1,0,0] ],
    [ [0,1,0], [0,0,1] ],
    [ [0,1,0], [0,1,0] ]
].map(( (data) => {
    const v1 = new THREE.Vector3().fromArray(data[0]).normalize();
    const v2 = new THREE.Vector3().fromArray(data[1]).normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(v1, v2);
    return q;
}));
// ---------- ----------
// UPDATE HELPER
// ---------- ----------
const rotateWithQarray = (obj3d, q_array, a1) => {
    const len = q_array.length;
    const i = Math.round( ( len - 1 ) * a1);
    const q1 = q_array[ i ];
    const q2 = q_array[ (i + 1) % len];
    let a2 = len * a1 % 1;
    obj3d.quaternion.copy(q1).slerp(q2, a2);
};

// ---------- ----------
// CONTROLS
// ---------- ----------
let controls = null;
if(THREE.OrbitControls){
    controls = new THREE.OrbitControls(camera, canvas_2d);
}
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0,0,0);
const sm = {
   FPS_UPDATE: 12,     // fps rate to update ( low fps for low CPU use, but choppy video )
   FPS_MOVEMENT: 30,  // fps rate to move object by that is independent of frame update rate
   FRAME_MAX: 100,
   secs: 0,
   frame_frac: 0,    // 30.888 / 450
   frame: 0,         // 30 / 450
   tick: 0,           //  1 / 450 ( about 1 FPS then )
   now: new Date(),
   lt: new Date()
};
const update = function(sm){
    const a1 = sm.frame / sm.FRAME_MAX;
    rotateWithQarray(mesh, q_array, a1);
};
const render2d = (sm) => {
    ctx.clearRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.drawImage(canvas_3d, 0, 0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(0,0, canvas_2d.width, canvas_2d.height);
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.font = '10px monospace';
    ctx.fillText('tick              : ' + sm.tick, 5, 5)
    ctx.fillText('frame_frac        : ' + sm.frame_frac.toFixed(3), 5, 20);
    ctx.fillText('frame / FRAME_MAX : ' + sm.frame + '/' + sm.FRAME_MAX, 5, 35);
};
const loop = () => {
    sm.now = new Date();
    sm.secs = (sm.now - sm.lt) / 1000;
    requestAnimationFrame(loop);
    if(sm.secs > 1 / sm.FPS_UPDATE){
        // update, render to 3d canvas, and then render to 2d canvas
        update(sm);
        renderer.render(scene, camera);
        render2d(sm);
        // step frame
        sm.frame_frac += sm.FPS_MOVEMENT * sm.secs;
        sm.frame_frac %= sm.FRAME_MAX;
        sm.frame = Math.floor(sm.frame_frac);
        sm.tick = (sm.tick += 1) % sm.FRAME_MAX;
        sm.lt = sm.now;
    }
};
loop();
