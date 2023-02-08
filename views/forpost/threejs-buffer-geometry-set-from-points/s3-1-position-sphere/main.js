// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(-0.5, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------

const myV3Array = (point_count, sec_count, rotation_count, y_mag, radius) => { 
    const v3array = [];
    for ( let i = 0; i < point_count; i ++ ) {
        const a1 = i / point_count;
        const a2 = a1 * sec_count % 1;
        const a3 = Math.floor(sec_count * a1) / sec_count;
        const a4 = 1 - Math.abs(0.5 - a1) / 0.5;
        const e = new THREE.Euler();
        e.y = Math.PI * 2 * rotation_count * a2;
        const v = new THREE.Vector3(1, 0, 0);
        v.applyEuler(e).multiplyScalar(radius * a4);
        v.y = y_mag * -1 + (y_mag * 2) * a3;
        v3array.push(v);
    }
    return v3array;
};

//-------- ----------
// OBJECTS
//-------- ----------
const v3array =  myV3Array(200, 2, 2, 1, 3);
const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(v3array);
const points1 = new THREE.Points(geometry, new THREE.PointsMaterial({ size: 0.2}));
scene.add(points1);

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
