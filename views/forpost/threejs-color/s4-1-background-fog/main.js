//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
const fogColor = new THREE.Color(0, 1, 0);
scene.background = fogColor;
scene.fog = new THREE.FogExp2(fogColor, 0.4);
// ---------- ----------
// OBJECTS
// ---------- ----------r
const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
        color: fogColor,
        emissive: new THREE.Color(1, 0, 0),
        emissiveIntensity: 0.6,
    })
);
scene.add(mesh1);
// ---------- ----------
// LIGHT
// ---------- ----------
const pl = new THREE.PointLight(new THREE.Color(1, 1, 1));
pl.position.set(1, 3, 2);
scene.add(pl);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(0, 0, 1);
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
    mesh1.position.set(0, 0, -1 - 2.5 * a2);
    mesh1.rotation.set(0, Math.PI * 2 * a1, Math.PI * 4 * a1);
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
