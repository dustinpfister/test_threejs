//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SETTINGS
// ---------- ----------
const CUBE_COUNT = 40;
const CUBE_SIZE = 0.5;
const CUBE_HSIZE = CUBE_SIZE / 2;
const CUBE_DROP_SPEED = 20;
const CUBE_MOVE_SPEED = [30, 100];
const CUBE_START_HEIGHT = [5, 15];
const CUBE_MIN_HEIGHT = -5;
const PLANE_SIZE = 5;
const PLANE_HSIZE = PLANE_SIZE / 2;
// ---------- ----------
// HELPER FUNCTIONS
// ---------- ----------
const createCubes = () => {
    let i = 0;
    const count = CUBE_COUNT;
    const group = new THREE.Group();
    while(i < count){
        const geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
        const material = new THREE.MeshNormalMaterial({ transparent: true, opacity: 0.5 });
        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.y = CUBE_MIN_HEIGHT - 10;
        // USER DATA FOR MESH OBJECTS
        const mud = mesh.userData;
        mud.radian = Math.PI * 2 * Math.random();
        const sr = CUBE_MOVE_SPEED;
        mud.ups = sr[0] + (sr[1] - sr[0]) * Math.random();
        group.add(mesh);
        i += 1;
    }
    return group;
};
// update the given group by a secs value
const updateCubes = (group, secs) => {
    let i = 0;
    const count = CUBE_COUNT;
    while(i < count){
        const mesh = group.children[i];
        const mud = mesh.userData;
        const v_pos = mesh.position;
        // reset to spawn location if y is too low
        if(v_pos.y < CUBE_MIN_HEIGHT){
            const sh = CUBE_START_HEIGHT;
            v_pos.set(0, sh[0] + (sh[1] - sh[0]) * Math.random(), 0);
            break;
        }
        // y adjust
        v_pos.y -= CUBE_DROP_SPEED * secs;
        // is mesh on the plane
        const n = PLANE_HSIZE + CUBE_HSIZE;
        if(v_pos.x <= n && v_pos.x >= n * -1 && v_pos.z <= n && v_pos.z >= n * -1){
            // y will get capped if it is on the plane
            v_pos.y = v_pos.y < CUBE_HSIZE ? CUBE_HSIZE : v_pos.y;
            if(v_pos.y === CUBE_HSIZE){
                const dx = Math.cos(mud.radian) * mud.ups * secs;
                const dz = Math.sin(mud.radian) * mud.ups * secs;
                v_pos.x += dx * secs;
                v_pos.z += dz * secs;
            }
        }
        i += 1;
    }
};
// ---------- ----------
// OBJECTS
// ---------- ----------
const group = createCubes();
scene.add(group);
scene.add( new THREE.GridHelper(PLANE_SIZE, PLANE_SIZE) );
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 30, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
camera.position.set(5,2,5);
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    updateCubes(group, 1 / 30);
    camera.lookAt(group.position);
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
