//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 640 / 480, 0.1, 1000);
camera.position.set(8, 8, 8);
camera.lookAt(0, -1, 0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const getMeshGroundPosition = (mesh, x, z) => {
    const geo = mesh.geometry;
    // COMPUTE THE BOUNDING BOX AND GET bb REF TO IT
    geo.computeBoundingBox();
    const bb = geo.boundingBox;
    // GET SIZE, and return new Vector3
    const v_size = new THREE.Vector3();
    bb.getSize(v_size);
    return new THREE.Vector3(x, v_size.y / 2, z);
};
// Make Mesh

const makeMesh = (w, h, d, x, z, sh, p1, p2, m) => {
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d), m);
    mesh.userData.v_start = new THREE.Vector3(x, sh, z);
    mesh.userData.p1 = p1;
    mesh.userData.p2 = p2;
    return mesh
};
// set mesh animation state for the given alpha
const setMesh = (mesh, alpha) => {
    let mud = mesh.userData;
    let b = getAlpha(alpha, 1, mud.p1, mud.p2);
    let v_start = mud.v_start;
    let v_ground = getMeshGroundPosition(mesh, v_start.x, v_start.z);
    mesh.position.copy(v_start).lerp(v_ground, b);
};
// get alpha helper
const getAlpha = (n, d, p1, p2) => {
    let a = n / d;
    let b = 0;
    if(a < p1){ b = a * (1 / p1);}
    if(a >= p1 && a < p2){ b = 1;}
    if(a >= p2){
        b = (1 - a) / (1 - p2);
    }
    return b;
};
//-------- ----------
// GROUP, MESH, MATERIAL
//-------- ----------
const material = new THREE.MeshNormalMaterial();
let group = new THREE.Group();
[
    [1, 1, 1, 0.5, 0.5, 12, 0.65, 0.8, material],
    [1, 1, 1, -4.5, -4.5, 10, 0.75, 0.9, material],
    [1, 3.25, 3, -4.5, 0.5, 8, 0.25, 0.5, material]
].forEach((argu) => {
    let mesh = makeMesh.apply(null, argu);
    group.add(mesh);
});
scene.add(group);

// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = FPS_MOVEMENT * 5; // 5 sec animation
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    group.children.forEach((mesh)=>{
        setMesh(mesh, frame / frameMax);
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