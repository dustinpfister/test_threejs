const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2f2f2f);
const camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.75, 10);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MATERIAL OVERRIDE
//-------- ----------
const material_override = new THREE.MeshBasicMaterial({
    color: new THREE.Color('lime'),
    wireframe: true
});
scene.overrideMaterial = material_override;
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshDepthMaterial());
scene.add(mesh);
const mesh2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshNormalMaterial());
mesh2.position.set(-1.5, 0, 0);
scene.add(mesh2);
//-------- ----------
// LIGHT
//-------- ----------
const pl = new THREE.PointLight(0xffffff, 1);
pl.position.set(1, 1, 0);
scene.add(pl);
//-------- ----------
// LOOP
//-------- ----------
camera.position.set(1.15, 0.85, 0.75);
camera.lookAt(0, 0, 0);

const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
const update = function(frame, frameMax){
    const a1 = frame / frameMax * 8 % 1;
    scene.overrideMaterial = material_override;
    if ( a1 < 0.5) {
        scene.overrideMaterial = null;
    }
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
