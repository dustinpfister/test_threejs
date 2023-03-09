// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// CONST
// ---------- ---------- ----------
const TOTAL_LENGTH = 200;
const MAX_LENGTH = 10;
const COUNT = 400;
// ---------- ---------- ----------
// OBJECTS
// ---------- ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const group = new THREE.Group();
scene.add(group);

let i = 0;

while(i < COUNT){
    const color = new THREE.Color();

    if(i === 0){
        color.r = 0;
        color.g = 1;
        color.b = 0;
    }

    if(i === COUNT - 1){
        color.r = 1;
        color.g = 0;
        color.b = 0;
    }

    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.25, 0.25),
        new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: 0.5})
    );
    group.add(mesh);
    i += 1;
}
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(12, 12, 12);
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
        const sin_loops = 32;
        const a4 = Math.sin(Math.PI * sin_loops * (a2 * 1 % 1));

        let unit_length = TOTAL_LENGTH * a3;

        unit_length = THREE.MathUtils.euclideanModulo(unit_length, MAX_LENGTH);
    
        const e = new THREE.Euler();
        const degY = 720;
        const degX = -20 + 40 * a4;
        e.y = THREE.MathUtils.degToRad( ( -45 + 90 * a2) + degY * a1);
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
