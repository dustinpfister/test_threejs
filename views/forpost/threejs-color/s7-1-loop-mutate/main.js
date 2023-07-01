//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight(new THREE.Color(1, 1, 1));
pl.position.set(1, 3, 2);
scene.add(pl);
//-------- ----------
// OBJECTS
//-------- ----------
scene.add(new THREE.GridHelper(8,8))
const color = new THREE.Color(1, 0, 0);
const material = new THREE.MeshStandardMaterial({
    color: color
})
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30),
    material
);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(a1 - 0.5) / 0.5;
    material.color.setRGB(a2, 1 - a2, 0);
};
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
