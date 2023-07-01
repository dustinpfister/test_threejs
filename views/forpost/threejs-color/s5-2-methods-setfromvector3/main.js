//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
// pony fill as Color.setFromVector3 is not in any revision < 151
const setColorFromVector3 = (color, v3_source) => {
    const v3 = v3_source.clone().normalize();
    color.r = Math.abs(v3.x);
    color.g = Math.abs(v3.y);
    color.b = Math.abs(v3.z);
};
// ---------- ----------
// SCENE CHILD OBJECTS
// ---------- ----------
scene.add( new THREE.GridHelper(8,8) );
const mesh = new THREE.Mesh(
    new THREE.TorusGeometry( 0.5, 0.25,  30, 30),
    new THREE.MeshPhongMaterial({ color: new THREE.Color() })
);
scene.add(mesh);
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(3, 2, 1)
scene.add(dl);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 30,
FPS_MOVEMENT = 30;
FRAME_MAX = 900;
let secs = 0,
frame = 0,
lt = new Date();
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(a1 - 0.5) / 0.5;
    const e = new THREE.Euler();
    e.y = Math.PI * 2 * a1;
    e.z = Math.PI * 2 * 16 * a1;
    mesh.position.set(1, 0, 0).applyEuler(e);
    mesh.lookAt(0, 0, 0);
    setColorFromVector3( mesh.material.color, mesh.position);
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
