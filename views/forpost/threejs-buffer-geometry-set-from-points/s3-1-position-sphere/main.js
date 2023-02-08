// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
// a function that creates and returns an array of vector3 objects
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
// create a geometry to begin with
const createGeometry = (point_count, sec_count, rotation_count, y_mag, radius) => {
    const v3array =  myV3Array(point_count, sec_count, rotation_count, y_mag, radius);
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(v3array);
    return geometry;
};
// update a geometry
const updateGeometry = (geometry, sec_count, rotation_count, y_mag, radius) => {
    const att_pos = geometry.getAttribute('position');
    const v3array =  myV3Array(att_pos.count, sec_count, rotation_count, y_mag, radius);
    let i = 0;
    const len = att_pos.count;
    while(i < len){
        const v = v3array[i];
        att_pos.setX(i, v.x);
        att_pos.setY(i, v.y);
        att_pos.setZ(i, v.z);
        i += 1;
    }
    att_pos.needsUpdate = true;
};
//-------- ----------
// OBJECTS
//-------- ----------
const geometry = createGeometry(400, 1, 2, 1, 3);
const points1 = new THREE.Points(geometry, new THREE.PointsMaterial({ size: 0.5}));
scene.add(points1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20,  // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = THREE.MathUtils.smoothstep(a1, 0, 1)
    const sec_count = 2 + 3 * a2;
    const rotation_count = 1 + 3 * a2;
    const y_mag = 0.5 + 1.5 * a2;
    const radius = 1 + 4 * a2;
    updateGeometry(geometry, sec_count, rotation_count, y_mag, radius);
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
