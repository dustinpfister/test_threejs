//-------- ----------
// CREATE A SCENE
//-------- ----------
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(10, 10) );
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 2, 1);
scene.add(dl);
// mesh objects
const mesh1 = new THREE.Mesh( new THREE.BoxGeometry(2, 2, 2), new THREE.MeshPhongMaterial({
    color: 0xff0000
}));
mesh1.position.set(0, 1, 0)
scene.add(mesh1);
const mesh2 = new THREE.Mesh( new THREE.SphereGeometry(2, 20, 20), new THREE.MeshPhongMaterial({
    color: 0x00ff00
}));
mesh2.position.set(-4, 2.0, 4);
scene.add(mesh2);
const mesh3 = new THREE.Mesh( new THREE.ConeGeometry(2, 5, 20, 20), new THREE.MeshPhongMaterial({
    color: 0x0000ff
}));
mesh3.position.set(-4, 2.5, -4);
scene.add(mesh3);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(10, 5, 5);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - (a1 * 8 % 1) ) / 0.5;
    const sx = 1 - 0.5 * a2;
    const sy = 0.25 + 0.75 * a1;
    const sz = 1;
    scene.scale.set(sx,sy,sz);
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

