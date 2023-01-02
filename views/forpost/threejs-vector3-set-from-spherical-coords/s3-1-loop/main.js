// ---------- ---------- ----------
// SCENE, CAMERA, and RENDERER
// ---------- ---------- ----------
const scene = new THREE.Scene();
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 1, 1000);
camera.position.set(4, 4, 4);
camera.lookAt(0,0,0);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ---------- ----------
// HELPER FUNCTIONS
// ---------- ---------- ----------
// USING setFromSphericalCoords to set position of the Mesh
const setMeshPos = function(mesh, p, t, r){
    const radius = r === undefined ? 3 : r,
    phi = THREE.MathUtils.degToRad(p === undefined ? 0 : p),
    theta = THREE.MathUtils.degToRad(t === undefined ? 0 : t);
    mesh.position.setFromSphericalCoords(radius, phi, theta);
    mesh.lookAt(0, 0, 0);
};
// ---------- ---------- ----------
// ADD A MESH
// ---------- ---------- ----------
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(2.5, 20, 20),
    new THREE.MeshBasicMaterial({
        color: new THREE.Color('lime'),
        wireframe: true,
        transparent: true,
        opacity: 0.4
    })
);
scene.add(sphere);
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial({
    })
);
scene.add(cube);
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
    //const degree = 360 * (frame / frameMax);
    //mesh.rotation.x = THREE.MathUtils.degToRad(degree);
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    setMeshPos(cube, 90, 90 + 90 * a2, 3);
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
