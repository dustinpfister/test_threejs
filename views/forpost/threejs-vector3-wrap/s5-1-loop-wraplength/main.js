// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// OBJECTS
// ---------- ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
let mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshNormalMaterial());
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(12, 12, 12);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;

    let unit_length = 200 * a1;
    unit_length = THREE.MathUtils.euclideanModulo(unit_length, 4);
    

    const e = new THREE.Euler();
    e.y = THREE.MathUtils.degToRad(720 * a1);
    e.x = THREE.MathUtils.degToRad(360 * a1);
    mesh.position.set(1, 0, 0).normalize().applyEuler(e).multiplyScalar(0.5 + unit_length);
    mesh.lookAt(0,0,0);


    //const degree = 360 * (frame / frameMax);
    //mesh.rotation.x = THREE.MathUtils.degToRad(degree);
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
