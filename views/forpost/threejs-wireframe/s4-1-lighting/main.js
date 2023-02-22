//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');
const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// OBJECTS
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshStandardMaterial({
        color: 0xffffff, // color is white
        emissive: 0x0000ff, // emissive color is the same as the background color
        wireframe: true
    })
);
scene.add(mesh);
const mesh2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshStandardMaterial({
        color: 0xffffff, // color is white
        emissive: 0x000000, // emissive color is Black
        wireframe: true
    })
);
mesh2.position.set(-1.5, 0, 0);
scene.add(mesh2);
//-------- ----------
// LIGHTS
//-------- ----------
const pl = new THREE.PointLight(0xffffff, 1);
pl.position.set(1, 1, 0);
scene.add(pl);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(a1 - 0.5) / 0.5;
    const radian = Math.PI * 2 * a1;
    pl.position.set(Math.cos(radian) * 2, Math.sin(radian) * 2, 0);
    pl.intensity = 1 * a2;
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

