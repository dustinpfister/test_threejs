//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPER FUNCTIONS
//-------- ----------
const randomColor = function () {
    const r = Math.random(),
    g = Math.random(),
    b = Math.random();
    return new THREE.Color(r, g, b);
};
const randomPosition = function () {
    const x = -3 + 4 * Math.random(),
    y = -1 + 2 * Math.random(),
    z = 2 + Math.random() * 5 * -1;
    return new THREE.Vector3(x, y, z);
};
//-------- ----------
// OBJECTS
//-------- ----------
const group = new THREE.Group(), len = 15;
let i = 0;
while (i < len) {
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshStandardMaterial({
            color: randomColor(),
            emissiveIntensity: 0.8,
            emissive: randomColor()
        })
    );
    mesh.position.copy(randomPosition());
    group.add(mesh);
    i += 1;
}
scene.add(group);
// ---------- ----------
// LIGHT
// ---------- ----------
const pl = new THREE.PointLight(new THREE.Color(1, 1, 1));
pl.position.set(1, 3, 2);
scene.add(pl);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(3, 3, 3);
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
        group.children.forEach(function (box) {
            box.rotation.set(0, Math.PI * 2 * a1, Math.PI * 4 * a1);
        });
        group.rotation.y = Math.PI * 2 * a1;
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