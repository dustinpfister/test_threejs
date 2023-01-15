//-------- ----------
// SCENE, CAMERA, and RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(20, 20));
camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshNormalMaterial());
scene.add(mesh);
//-------- ----------
// APP LOOP
//-------- ----------
let secs = 0,
lt = new Date(),
frame = 0;
const fps_update = 20,   // fps rate to update ( low fps for low CPU use, but choppy video )
fps_movement = 30,      // fps rate to move camera
frameMax = 300;
const loop = function () {
    const now = new Date(),
    secs = (now - lt) / 1000,
    per = frame / frameMax,
    bias = (1 - Math.abs(per - 0.5) / 0.5);
    requestAnimationFrame(loop);
    if(secs > 1 / fps_update){
        // MOVING THE CAMERA IN THE LOOP
        camera.position.set(3 * bias, 1 + 2 * bias, 10);
        renderer.render(scene, camera);
        frame += fps_movement * secs;
        frame %= frameMax;
        lt = now;
    }
};
loop();
