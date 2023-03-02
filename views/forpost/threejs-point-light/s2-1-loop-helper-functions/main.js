// ---------- ----------
// SCENE, CAMERA, AND RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1f1f1f);
const camera = new THREE.PerspectiveCamera(40, 4 / 3, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// HELPER FUNCTIONS
// ---------- ----------
const addPointLight = function (scene, color, x, y, z) {
    const pointLight = new THREE.PointLight(color);
    pointLight.position.set(x, y, z);
    pointLight.add(new THREE.Mesh(
            new THREE.SphereGeometry(1, 10, 10),
            new THREE.MeshBasicMaterial({
                color: color
            })));
    scene.add(pointLight);
    return pointLight;
};
// create some cubes
const addCube = function (scene, size, x, y, z) {
    const geometry = new THREE.BoxGeometry(size, size, size),
    material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0x0f0f0f
        });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);
};
// ---------- ----------
// GRID
// ---------- ----------
const gridHelper = new THREE.GridHelper(40, 10);
scene.add(gridHelper);
// ---------- ----------
// LIGHTS
// ---------- ----------
// create some point lights and add it to the scene
const whitePointLight = addPointLight(scene, 0xffffff, 0, 0, 0),
redPointLight = addPointLight(scene, 0xff0000, 30, 0, 0),
greenPointLight = addPointLight(scene, 0x00ff00, 0, 30, 0),
bluePointLight = addPointLight(scene, 0x0000ff, 0, 0, 30);
// ---------- ----------
// MESH
// ---------- ----------
addCube(scene, 10, 15, 0, 0);
addCube(scene, 10, -15, 0, 0);
addCube(scene, 10, 0, 0, 15);
addCube(scene, 10, 0, 0, -15);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(37, 37, 37);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 16, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = Math.sin( Math.PI * 0.5 * a1 );
    const r = Math.PI * 2 * a1;
    const sin = Math.sin(r) * 30;
    const cos = Math.cos(r) * 30;
            // update point lights
            whitePointLight.position.y = 20 * a2;
            redPointLight.position.set(cos, sin, 0);
            greenPointLight.position.set(cos, 0, sin);
            bluePointLight.position.set(0, cos, sin);
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
