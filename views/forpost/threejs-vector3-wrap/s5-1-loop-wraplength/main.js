// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// LIGHT
// ---------- ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 2, 1);
scene.add(dl);
// ---------- ---------- ----------
// CONST
// ---------- ---------- ----------
const TOTAL_LENGTH = 100;
const MAX_LENGTH = 15;
const COUNT = 400;
const SIN_LOOP_RANGE = [32, 64];
const Y_ROTATION_COUNT = 1;
const Y_ROTATION_OFFSET = 40;
const X_DEG = 10;
// ---------- ---------- ----------
// OBJECTS
// ---------- ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const group = new THREE.Group();
scene.add(group);

let i = 0;

while(i < COUNT){
    const a_index = i / COUNT;
    const color = new THREE.Color();
    color.r = 0.1 + 0.9 * a_index;
    color.g = 1 - a_index;
    color.b = Math.random();
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshPhongMaterial({color: color, transparent: true, opacity: 0.5})
    );
    group.add(mesh);
    i += 1;
}
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(12, 6, 12);
camera.lookAt(0,0,0);
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
 
    group.children.forEach( (mesh, i, arr) => {
        const a2 = i / arr.length;
        const a3 = a1 + 1 / (TOTAL_LENGTH * 2.5) * i;
        const sin_loops = SIN_LOOP_RANGE[0] + (SIN_LOOP_RANGE[1] - SIN_LOOP_RANGE[0]) * a1;
        const a4 = Math.sin(Math.PI * sin_loops * (a2 * 1 % 1));

        let unit_length = TOTAL_LENGTH * a3;

        unit_length = THREE.MathUtils.euclideanModulo(unit_length, MAX_LENGTH);
    
        const e = new THREE.Euler();
        const yfc = Y_ROTATION_OFFSET;
        const degY = ( yfc * -1 + yfc * 2 * a2) + (360 * Y_ROTATION_COUNT ) * a1;
        const xd = X_DEG;
        const degX = xd * -1 + xd * 2 * a4;
        e.y = THREE.MathUtils.degToRad( degY);
        e.x = THREE.MathUtils.degToRad(degX);

        mesh.position.set(1, 0, 0).normalize().applyEuler(e).multiplyScalar(0.5 + unit_length);
        mesh.lookAt(0,0,0);
    });
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
