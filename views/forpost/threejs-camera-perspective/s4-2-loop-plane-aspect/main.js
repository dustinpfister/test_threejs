// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(40, 4 / 3, 0.05, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// MESH
// ---------- ----------
const material_plane = new THREE.MeshBasicMaterial();
const geometry_plane = new THREE.PlaneGeometry(1, 1, 1, 1);
const mesh_plane_1 = new THREE.Mesh(geometry_plane, material_plane);
mesh_plane_1.scale.set(
   camera.aspect,
   1,
   1
)
mesh_plane_1.position.z = 8.6;
scene.add(mesh_plane_1);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set( 0, 0, 10 );
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
// update method
const update = function (frame, frameMax) {
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
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
