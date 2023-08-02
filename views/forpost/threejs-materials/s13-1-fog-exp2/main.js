//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 320 / 240, 0.025, 20);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// ADDING BACKGROUND AND FOG
//-------- ----------
const fog_color = new THREE.Color(0xffffff);
scene.background = fog_color;
scene.fog = new THREE.FogExp2(fog_color, 0.5);
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
);
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(1.5, 0.75, 1.5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 400;
let secs = 0,
frame = 0,
lt = new Date();
const update = function(frame, frameMax){
    const per = frame / frameMax,
    bias = 1 - Math.abs(0.5 - per) / 0.5;
    mesh.position.z = 1 + 4 * bias;
    mesh.rotation.x = Math.PI * 2 * 4 * per;
    mesh.rotation.y = Math.PI * 2 * 2 * per;
    camera.lookAt(mesh.position);
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
